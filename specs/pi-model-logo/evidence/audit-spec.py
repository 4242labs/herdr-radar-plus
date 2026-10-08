"""Read-only structural/provenance audit of the specification artifact.
This does not claim future feature tests or live deployment have passed.
"""
import hashlib
import json
import re
import subprocess
from pathlib import Path

here = Path(__file__).resolve().parent
specdir = here.parent
repo = specdir.parent.parent
spec = (specdir / "SPEC.md").read_text()
graph = json.loads((specdir / "traceability.json").read_text())
requirements = {item["id"]: item for item in graph["requirements"]}
tasks = {item["id"]: item for item in graph["tasks"]}
obligations = {item["id"]: item for item in graph["obligations"]}
assert len(requirements) == len(graph["requirements"])
assert len(tasks) == len(graph["tasks"])
assert len(obligations) == len(graph["obligations"])
for obligation in obligations.values():
    assert obligation["status"] == "resolved"
    assert obligation["requirement"] in requirements
    assert obligation["source"] and obligation["outcome"]
for requirement in requirements.values():
    assert requirement["task"] in tasks
    assert requirement["id"] in tasks[requirement["task"]]["requirements"]
    assert re.fullmatch(r"(?:test|cmd|screenshot|manual_by):[a-z0-9-]+", requirement["verification"])
    assert f"### {requirement['id']} — {requirement['name']}" in spec
    assert " ".join(requirement["outcome"].split()) in " ".join(spec.split())
    assert requirement["verification"] in spec
    for ref in requirement["authority"].split(","):
        assert ref in spec
    assert any(o["requirement"] == requirement["id"] for o in obligations.values())
for task in tasks.values():
    assert task["requirements"]
    assert all(r in requirements for r in task["requirements"])
    assert all(d in tasks for d in task["depends_on"])
    assert task["id"] not in task["depends_on"]
visited = set()
active = set()

def visit(key):
    assert key not in active, "cyclic delivery dependencies"
    if key in visited:
        return
    active.add(key)
    for dep in tasks[key]["depends_on"]:
        visit(dep)
    active.remove(key)
    visited.add(key)

for key in tasks:
    visit(key)
counts = {
    "obligations": len(obligations),
    "requirements": len(requirements),
    "verification_methods": len({r["verification"] for r in requirements.values()}),
    "delivery_tasks": len(tasks),
}
assert counts == graph["counts"]
assert "**Verdict: READY.**" in spec
assert not re.search(r"\b(?:TBD|TODO|FIXME|PLACEHOLDER)\b", spec)
assert not re.search(r"\*\*Acceptance:\*\*\s*(?:works|correct|handled)[.!]?\s*$", spec, re.M | re.I)
# All direct evidence/document references in the specification resolve locally.
refs = sorted(set(re.findall(r"`(evidence/[a-zA-Z0-9_.-]+)`", spec)))
for ref in refs:
    assert (specdir / ref).is_file(), ref
for name in ["traceability.json", "rule-compliance.md"]:
    assert (specdir / name).is_file()
manifest = json.loads((here / "source-manifest.json").read_text())
for name, item in manifest.items():
    source = Path(item["path"])
    assert source.is_file(), name
    blob = source.read_bytes()
    assert hashlib.sha256(blob).hexdigest() == item["sha256"], name
    assert len(blob.splitlines()) == item["lines"], name
assert hashlib.sha256((here / "spec.txt").read_bytes()).hexdigest() == manifest["spec.txt"]["sha256"]
assert hashlib.sha256((here / "formal-review.raw.txt").read_bytes()).hexdigest() == manifest["formal-review.json"]["sha256"]
review = json.loads((here / "formal-review.json").read_text())
adjudication = json.loads((here / "review-adjudication.json").read_text())
for field in ["findings", "unknowns", "taste"]:
    assert set(adjudication[field]) == {item["id"] for item in review[field]}
coverage = {sub["id"] for section in review["coverage"] for sub in section["subcriteria"]}
assert coverage == {item["id"] for item in adjudication["coverage"]}
assert all(set(item["requirements"]) <= requirements.keys() for item in adjudication["coverage"])
assert len(coverage) == adjudication["counts"]["coverage_subcriteria"]
compliance = json.loads((here / "rule-compliance.json").read_text())
assert compliance["count"] == len(compliance["checks"])
assert all(item["status"] == "attended" for item in compliance["checks"])
assert len({item["id"] for item in compliance["checks"]}) == compliance["count"]
probe = json.loads((here / "probe-title-order-output.json").read_text())
assert probe["exit_code"] == 0
assert json.loads(probe["output"])["passed"] is True
remote = json.loads((here / "alghul-read-only.json").read_text())
assert remote["exit_code"] == 0
assert json.loads(remote["output"])["title_source_sha256"] == manifest["pi-title"]["sha256"]
assert json.loads(remote["output"])["pi_version"] == "1.0.4"
local = json.loads((here / "darkseid-read-only.json").read_text())
assert local["pi_version"] == "1.0.4"
assert local["os"] == "Darwin"
# Read-only main and worktree scope verification.
git = "/opt/homebrew/bin/git"
main = Path("/Users/42piratas/42labs/herdr-radar-plus")
main_branch = subprocess.check_output([git, "-C", str(main), "branch", "--show-current"], text=True).strip()
assert main_branch == "main"
main_status = subprocess.check_output([git, "-C", str(main), "status", "--porcelain"], text=True)
assert not main_status.strip(), main_status
changed = subprocess.check_output([git, "-C", str(repo), "diff", "--name-only", "e258108012cc45ac18c8b3e7bb6b5e1dab1b3b2d"], text=True).splitlines()
assert all(p.startswith("specs/pi-model-logo/") for p in changed), changed
print(json.dumps({
    "verdict": "READY", "counts": counts, "rule_receipts": compliance["count"],
    "review_counts": adjudication["counts"], "source_hashes_checked": len(manifest),
    "resolved_local_cross_references": len(refs), "dependency_cycle": False,
    "orphan_requirements": 0, "orphan_tasks": 0, "unresolved_obligations": 0,
    "main_branch": main_branch, "main_clean": True,
    "implementation_tests_executed": False, "live_acceptance_executed": False,
    "audit_scope": "structural graph, source hashes, exact original bytes, existing probe receipts, document paths and WIP preservation; whole-document semantic sweep is author judgment recorded separately",
}, indent=2))
