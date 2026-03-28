# Lamp — Claude Rules
@CONTEXT.md
@STATUS.md

## Session Start
Read CONTEXT.md + STATUS.md above, state what's in progress, resume immediately. No questions.

## Tools
- Gemini: `~/.claude/bin/gmn "..."` — research, content, Bible questions
- Codex: `~/.claude/bin/cdx "..."` — all code writing and fixes
- Groq: `~/.claude/bin/grq "..."` — fast tasks, short generation
- Mistral: Python SDK — marketing copy
- Claude: planning, judgment, orchestration only — never writes code or content directly

## JS Validation (run after every index.html edit)
```bash
python3 -c "
import re
html = open('index.html').read()
scripts = re.findall(r'<script(?![^>]*(?:src|application/ld\+json))[^>]*>(.*?)</script>', html, re.DOTALL)
open('/tmp/game_script.js','w').write('\n'.join(scripts))
" && node --check /tmp/game_script.js && echo "JS OK"
```

## Auto-Maintenance (no user prompting needed)
- Update STATUS.md after every deploy, new feature, or fix — immediately, not at session end
- Update memory files the moment new project info or user feedback is learned
- Stop hook syncs STATUS.md → CONTEXT.md automatically
- ~30 messages: update STATUS.md, suggest fresh session
