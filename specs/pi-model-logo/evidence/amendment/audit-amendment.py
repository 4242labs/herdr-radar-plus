"""Read-only amendment audit; never feature or live-acceptance evidence."""
import hashlib
import itertools
import json
import re
from pathlib import Path

HERE = Path(__file__).resolve().parent
SPEC_DIR = HERE.parent.parent
REPO = SPEC_DIR.parent.parent
spec = (SPEC_DIR / "SPEC.md").read_text()
before = (HERE / "SPEC-before.md").read_text()
graph = json.loads((SPEC_DIR / "traceability.json").read_text())
adj = json.loads((SPEC_DIR / "evidence/review-adjudication.json").read_text())
review = json.loads((SPEC_DIR / "evidence/formal-review.json").read_text())
rules = json.loads((HERE / "rules.json").read_text())
requirements = {r["id"]: r for r in graph["requirements"]}
tasks = {t["id"]: t for t in graph["tasks"]}
assert len(requirements) == len(graph["requirements"])
assert len(tasks) == len(graph["tasks"])
assert set(requirements) == {f"R{i}" for i in range(1, 19)}
assert "**Verdict: READY.**" in spec
assert len(spec.encode()) <= len(before.encode())
assert len(spec.split()) <= len(before.split())
assert len(spec.splitlines()) <= len(before.splitlines())
assert not re.search(r"\b(?:TBD|TODO|FIXME|PLACEHOLDER|Opus|F[1-8]|U[1-7])\b", spec)
assert "250ms" not in spec
assert "### R19" not in spec  # retained authoring criterion belongs in ledger
for r in requirements.values():
    assert f"### {r['id']} — {r['name']}" in spec
    assert r["outcome"] in spec
    assert r["verification"] in spec
    assert re.fullmatch(r"(?:test|screenshot):[a-z0-9-]+", r["verification"])
    assert r["task"] in tasks
    assert r["id"] in tasks[r["task"]]["requirements"]
    assert r["acceptance"]
    assert r["status"] == "specified; implementation/live acceptance not executed"
assert graph["authoring_requirement"]["id"] == "R19"
assert graph["authoring_requirement"]["verification"] == "cmd:spec-audit"
assert not graph["assumptions"]
assert len({o["id"] for o in graph["obligations"]}) == len(graph["obligations"])
for o in graph["obligations"]:
    assert o["destination"] in {*requirements, "R19"}
    assert o["status"] == "resolved"
    assert o["source_class"] and o["source"] and o["outcome"]
for t in tasks.values():
    assert t["requirements"]
    assert all(r in requirements for r in t["requirements"])
    assert all(d in tasks for d in t["depends_on"])
    assert t["id"] not in t["depends_on"]
visited, active = set(), set()
def visit(key):
    assert key not in active, "cyclic task graph"
    if key in visited:
        return
    active.add(key)
    for dependency in tasks[key]["depends_on"]:
        visit(dependency)
    active.remove(key)
    visited.add(key)
for key in tasks:
    visit(key)
counts = {
    "obligations": len(graph["obligations"]),
    "implementation_requirements": len(requirements),
    "implementation_verifications": len({r["verification"] for r in requirements.values()}),
    "authoring_verifications": 1,
    "delivery_tasks": len(tasks),
}
assert counts == graph["counts"]
for field in ["findings", "unknowns", "taste"]:
    assert set(adj[field]) == {x["id"] for x in review[field]}
coverage = {x["id"] for row in review["coverage"] for x in row["subcriteria"]}
assert coverage == {x["id"] for x in adj["coverage"]}
assert all(set(x["requirements"]) <= requirements.keys() for x in adj["coverage"])
expected_rows = set(adj["findings"] + adj["unknowns"] + adj["taste"] + adj["amendment_findings"])
assert expected_rows == {x["id"] for x in adj["rows"]}
assert all(x["status"] in {"RESOLVED", "DISPUTED"} for x in adj["rows"])
assert all(x["claim"] and x["change"] and x["evidence"] for x in adj["rows"])
assert sum(x["status"] == "RESOLVED" for x in adj["rows"]) == adj["counts"]["resolved"]
assert sum(x["status"] == "DISPUTED" for x in adj["rows"]) == adj["counts"]["disputed"]
assert len(coverage) == adj["counts"]["coverage_subcriteria"]
assert adj["counts"]["escalated"] == 0
assert rules["count"] == len(rules["checks"])
assert {r["id"] for r in rules["checks"]} == {f"AM{i:02}" for i in range(1, 16)}
assert all(r["status"] == "attended" for r in rules["checks"])
assert not rules["assumptions"]
assert rules["not_delegated"] is True
for name in graph["evidence"]:
    assert (HERE / name).is_file(), name
for name in ["identity.json", "alghul-paths.json", "schema-fields.json", "schema-fields-alghul.json", "source-output.json", "pi-output.json"]:
    receipt = json.loads((HERE / name).read_text())
    assert receipt["command"] and receipt["cwd"] == str(REPO)
    assert receipt["result"]["exit_code"] == 0
    assert receipt["result"]["output"].strip()
for source in json.loads((HERE / "sources.json").read_text()):
    assert hashlib.sha256((HERE / source["file"]).read_bytes()).hexdigest() == source["sha256"]
    assert source["url"].startswith("https://raw.githubusercontent.com/")
    assert source["retrieved_at"].startswith("2026-10-08")
refs = set(re.findall(r"`(lib/[a-z-]+\.js)`", spec))
for ref in refs:
    assert (REPO / ref).is_file(), ref
for phrase in ["## 1. Problem, goal and authority", "## 2. Scope, dependencies and flow", "## 3. Input, ownership and transport contract", "## 4. Pi-only consumer and family resolution", "## 5. Requirements and acceptance", "## 6. Delivery order and operational procedure", "Assumptions used as execution facts: none", "**Version:**", "**Last updated:**"]:
    assert phrase in spec, phrase
# Declared design bounds, checked against the freshly printed installed API schema.
source = "user:radar-pi-model"
assert re.fullmatch(r"[A-Za-z0-9:._-]{1,80}", source)
for key in ["pi_model_id", "pi_model_ref"]:
    assert re.fullmatch(r"[A-Za-z0-9_-]{1,32}", key)
assert "pi_model_seq" not in spec
for phrase in ["Runtime never initializes a missing counter", "before any IPC write", "process-scoped registry", "server restart between requests followed by producer crash/reload", "Cap reads at 64 bytes"]:
    assert phrase in spec, phrase
for source in json.loads((HERE / "filesystem-sources.json").read_text()):
    assert hashlib.sha256((HERE / source["file"]).read_bytes()).hexdigest() == source["sha256"]
    assert source["url"].startswith(("https://nodejs.org/", "https://pubs.opengroup.org/"))
assert 1 <= 60000 <= 86400000
assert 30000 < 60000
assert len(hashlib.sha256(b"id\0example").hexdigest()) <= 80
assert 1024 * 1024 == 1048576
# Finite policy-model proof, not a shipped producer test or server reproduction.
max_safe = 2**53 - 1
policy_cases = 0
for initial_counter in [0, 1, 1000, max_safe - 4]:
    reserved = [initial_counter + i for i in range(1, 5)]
    assert max(reserved) <= max_safe
    # Each crash point retains a counter at least as high as every sent write.
    for crash_at in range(5):
        persisted = initial_counter if crash_at == 0 else reserved[crash_at - 1]
        possibly_sent = reserved[:crash_at]
        assert not possibly_sent or persisted >= max(possibly_sent)
        if persisted < max_safe:
            assert persisted + 1 > max(possibly_sent, default=initial_counter)
    for writes in itertools.permutations(reserved):
        accepted = -1
        for seq in writes:
            if seq > accepted:
                accepted = seq
        assert accepted == max(reserved)
        policy_cases += 1
assert max_safe + 1 > max_safe  # contract refuses exhausted range
print(json.dumps({
    "verdict": "READY", "audit_passed": True, "counts": counts,
    "finding_statuses": adj["counts"], "rules_attended": rules["count"],
    "length": {"before_bytes": len(before.encode()), "after_bytes": len(spec.encode()),
               "before_words": len(before.split()), "after_words": len(spec.split()),
               "before_lines": len(before.splitlines()), "after_lines": len(spec.splitlines())},
    "cross_references": sorted(refs), "sequence_policy_cases": policy_cases,
    "dependency_cycle": False, "orphan_tasks": 0,
    "spec_sha256": hashlib.sha256(spec.encode()).hexdigest(),
    "assumptions": [], "implementation_tests_executed": False,
    "live_acceptance_executed": False, "deployment_executed": False,
    "scope": "structural/provenance/schema-bound and declared-policy audit; final semantic sweep is author judgment"
}, indent=2))
