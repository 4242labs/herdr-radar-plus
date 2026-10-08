# Write Specifications: Examples

## Contents

- Happy path: bounded internal change
- Robust variant: security-sensitive behavior
- Anti-pattern and correction

## Happy path: bounded internal change

**Request:** Add machine-readable output to an existing audit command.

**Evidence gathered:** The command, output formatter, callers, tests, and CLI conventions were read.
The repository already has one JSON serializer used by a sibling command.

**Decision handling:** Output filename and schema are discoverable conventions, so the Architect
does not ask. Whether text output remains the default changes user behavior, so the Architect asks
the operator once and recommends preserving the current default.

**Ready requirement:** `REQ-1`: when invoked with the approved flag, the command emits the existing
result through the shared serializer without changing default text output.

**Acceptance:** `test:audit-json-output` verifies valid JSON, schema keys, exit code, and unchanged
default text output.

**Trace:** `REQ-1` → serializer evidence → formatter task → `test:audit-json-output` → READY.

## Robust variant: security-sensitive behavior

**Request:** Add an endpoint that exports account data.

Before scoping, inspect existing authentication, authorization, audit logging, rate limiting, data
classification, retention, and export conventions. Do not let "export account data" silently decide
who may export, which records are included, whether secrets are excluded, or how the file expires.

Ask the operator only about unresolved product policy, one decision at a time. Derive implementation
facts from the system. Mark the draft BLOCKED until policy decisions are resolved.

A READY specification includes actor and authorization rules, included and excluded data classes,
failure behavior, audit evidence, abuse limits, deletion/expiry behavior, rollback, and security
review. Each requirement maps to a security test, command, or named manual verification.

## Anti-pattern and correction

### Anti-pattern

**Requirement:** Improve onboarding. Add a flexible workflow and handle edge cases.

**Acceptance:** The flow works correctly and the code is reviewed.

Why it fails: the actor, current problem, target behavior, authority, boundaries, edge cases, and
observable verification are absent. "Flexible" invites speculative architecture; "works correctly"
cannot fail deterministically.

### Corrected pattern

First recover the operator's exact onboarding objective. Inspect the current flow and analytics.
Ask only the unresolved product decision, one at a time. Then write separate requirement IDs for
each approved behavior, name excluded behaviors, define each failure path, and attach a fixed test or
screenshot trigger to every acceptance criterion. If the product decision remains unanswered, issue
BLOCKED rather than manufacturing a complete-looking specification.
