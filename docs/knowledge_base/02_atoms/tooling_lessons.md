# Tooling Lessons

## Atom: Presentation Runtime Needs HOME On Windows

Tags: #tooling #presentations #windows #debug  
Source: Wellnista presentation export run, 2026-06-10  
Status: active

The bundled presentation helper may resolve the Codex runtime from the wrong `.cache` directory on Windows if `HOME` is not set. Set `HOME=C:\Users\LENOVO` before running the artifact-tool presentation build helper.

## Atom: Presentation Layout Checker Uses Layout Flag

Tags: #tooling #presentations #qa #debug  
Source: Wellnista presentation layout QA run, 2026-06-10  
Status: active

The presentation layout checker expects `--layout <layout.json|dir>`, not `--layout-dir`. If the checker prints usage only, verify the CLI flags before treating it as a deck issue.

