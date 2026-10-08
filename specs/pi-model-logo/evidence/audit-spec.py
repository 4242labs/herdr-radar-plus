"""Compatibility entry point for the current read-only amendment audit.
Historical title-draft audit is retained in amendment/before-audit-spec.py.
"""
import runpy
from pathlib import Path

if __name__ == "__main__":
    runpy.run_path(
        str(Path(__file__).resolve().parent / "amendment" / "audit-amendment.py"),
        run_name="__main__",
    )
