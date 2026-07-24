#  Logibot — Logic-based Chatbot

A lightweight chatbot with "pure logic" (no API keys, no LLM).
Recognises greetings, jokes, quotes, date/time, math, and programming & AI concepts.

## Features
-  Modern chat UI 
-  Remembers your name (`my name is Ezat`)
-  Emoji-friendly replies
-  Help menu (`help`)
-  predefined responses
-  In-session chat history
-  Stats: questions asked + session duration
-  Date & time responses
-  Motivational quotes (`quote`)
-  Jokes (`joke`)
-  Programming/AI Q&A (python, react, git, docker, oop, jwt, …)
-  Smart keyword matching (regex + fallback)

## Files
| File | Purpose |
|---|---|
| `index.html` | Frontend markup |
| `styles.css` | Styling + dark-mode variables |
| `app.js` | UI logic (send, render, theme, stats) |
| `chatbot-engine.js` | Core logic engine (shared browser + Node) |
| `server.js` | Optional Node.js backend + static server |
| `README.md` | This file |

## Run — Frontend only
Just open `index.html` in a browser. Done.

open index.html      # macOS
start index.html     # Windows
xdg-open index.html  # Linux

## 🖥️ Run — With Node.js backend
Uses the same engine on the server via `POST /api/chat`.

node server.js
# → http://localhost:3000


### API

POST /api/chat
Content-Type: application/json

{ "message": "tell me a joke", "name": "Alex" }

Response:

{ "reply": { "text": "...", "category": "joke-request" } }


To make the frontend call the backend instead of the local engine, replace
the `LogibotEngine.generateReply(...)` block in `app.js` with a `fetch("/api/chat", ...)` call.

##  Try these
- `hi` · `how are you` · `bye`
- `joke` · `quote`
- `time` · `date`
- `12 * 7` · `100 / 4`
- `python` · `what is recursion` · `explain docker`
- `my name is Alex`
- `help`

## 📄 License
MIT — do whatever you want. 
