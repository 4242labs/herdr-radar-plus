---
name: skill-write-specs
description: Evidence-first checklist for execution-ready contracts. Use when asked to write specs, scopes, plans, ADRs, or block contracts.
source: canon
canon_version: HEAD
---

# Skill: Write Specifications

Use this skill before writing any new document that directs execution. This includes scopes, block
specs, plans, ADRs, handovers, and source-of-truth requirements. Use
`skill-amend-specs.md` instead when changing an existing contract in response to findings.

A specification is ready only when an engineer can execute it without inventing product behavior,
guessing facts, choosing omitted requirements, or weakening verification.

## Non-negotiable rules

1. **Recover the whole mandate.** Preserve every obligation in the operator's request. Do not scope
   from a summary when the original wording is available.
2. **Discover facts; ask for decisions.** Read code, docs, APIs, and current system state yourself.
   Ask the operator only for genuine choices that evidence cannot settle.
3. **Ask one decision at a time.** Lead with the question, recommend one answer, and explain only
   the material trade-off.
4. **Never invent authority.** User-facing behavior, workflow, cost, destructive action, and scope
   changes require an operator decision unless already stated in the mandate.
5. **No hidden uncertainty.** A READY specification has no unanswered requirement question,
   unsupported factual claim, placeholder, or implied acceptance criterion.
6. **Verification is part of the requirement.** Every acceptance criterion names one observable
   method: `test:`, `cmd:`, `screenshot:`, or `manual_by:`.
7. **Prefer the smallest sufficient design.** Reuse existing components, conventions, and skills.
   Do not add future-proofing without a present requirement.

## Workflow

### 1. Build the obligation ledger

Read the operator request and every inherited contract in full. Create one row per obligation:

| ID | Source wording or reference | Required outcome | Destination | Status |
|:--|:--|:--|:--|:--|

Use `captured`, `resolved`, or `blocked` for Status. Never drop an obligation because an existing
acceptance row looks similar. A final sweep must account for every row.

### 2. Establish ground truth

Inspect the current implementation and the documents that own the affected behavior. Search for
existing patterns before proposing a new one. For external APIs or libraries, read current official
documentation and record the version or retrieval date.

Maintain an evidence ledger while researching:

| Claim | Source | Observed evidence | Status |
|:--|:--|:--|:--|

Use `verified`, `contradicted`, or `unknown`. Do not write an `unknown` claim as fact. Do not ask the
operator to confirm a fact that can be discovered.

### 3. Resolve decisions before drafting

Separate unresolved items into:

- **Facts:** investigate them.
- **Operator decisions:** ask one at a time with a recommendation.
- **Implementation details inside approved scope:** choose the simplest evidence-backed option.
- **Blocked unknowns:** define a spike or stop; do not disguise them as assumptions.

Do not mark the specification READY while any operator decision or execution-critical fact remains
open. A blocked draft may list the unresolved item and what clears it; it is not an execution handoff.

### 4. Bound the work

State all applicable items explicitly:

- problem, goal, actors, and current behavior
- target behavior and end-to-end happy path
- in-scope outcomes and named out-of-scope exclusions
- authority already granted and decisions still reserved to the operator
- prerequisites, dependencies, constraints, and compatibility requirements
- assumptions, each with evidence or a validation step
- affected repositories, modules, interfaces, data, and documents
- security, privacy, cost, deployment, and operational impact
- failure behavior, degraded behavior, recovery, rollback, and observability
- ordering constraints and independently verifiable delivery slices

Write `none` where a required field genuinely has no entries. A blank section is an unanswered
question.

### 5. Define requirements and verification

Give every requirement a stable ID. For each requirement, write:

- one observable outcome, not an implementation activity
- relevant actor, trigger, precondition, and expected result
- edge and failure behavior where applicable
- one acceptance criterion with its fixed verification method
- the evidence or operator decision that authorized it

Use `manual_by:` only for irreducibly human judgment. Never replace a runnable check with manual
review because the check is inconvenient. Commands must name their working directory and must be
valid for the repository that will run them.

### 6. Trace delivery

Create a traceability table before handoff:

| Requirement | Evidence / decision | Delivery task | Verification | Status |
|:--|:--|:--|:--|:--|

Every requirement maps to at least one delivery task and one verification method. Every task maps
back to a requirement. Remove orphan tasks; add missing tasks.

### 7. Run the adversarial sweep

Re-read the whole specification, not only the latest diff. Check:

- every obligation-ledger row is resolved
- every number, version, path, command, and cross-reference was verified at its source
- terminology is consistent and every actor is named
- scope does not widen or narrow the mandate
- no acceptance criterion says only "works", "correct", "handled", or equivalent
- happy path, failure path, recovery, and rollback do not contradict each other
- dependencies and ordering form an executable sequence
- the work fits the project's sizing limits; oversized work is split by deployable outcome
- no existing capability is being rebuilt without evidence that reuse fails
- no operator decision is hidden as an implementation detail or assumption

Fix the class of defect, not only the first instance found.

### 8. Issue the readiness verdict

Use exactly one verdict:

- **READY:** all obligations, facts, decisions, requirements, tasks, and checks are traceable and
  execution can begin without invention.
- **BLOCKED:** name the single next unresolved decision or evidence gap and what clears it. Do not
  dispatch execution.

## Required handoff

Return the specification path, verdict, obligation count, requirement count, and verification count.
For READY, all three counts must reconcile through the traceability table. For BLOCKED, ask only the
single next decision.

## Reference examples

Read `write-specs/examples.md` when drafting or reviewing the first specification in a session.
It contains a happy path, a safety-critical variant, and an anti-pattern with its correction.

## Failure handling

- Conflicting sources: cite both, mark BLOCKED, and ask which authority wins.
- Missing access or unavailable dependency: mark BLOCKED and name what access or evidence is needed.
- Multiple valid product interpretations: recommend one and ask the operator to choose.
- Review findings on an existing contract: stop this workflow and use `skill-amend-specs.md`.
- New issue found outside scope: report it separately; do not insert it into the current contract.
