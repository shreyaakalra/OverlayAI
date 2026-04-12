🚀 OverlayAI — Your Always-On Desktop Intelligence

AI that sees your screen, understands your work, and acts instantly — without breaking your flow.

🧠 Problem

Traditional AI tools are disconnected from your workflow:

AI lives in a browser tab
You constantly copy-paste context
You re-explain problems again and again
Context switching kills productivity

“Current LLMs are blind to your environment.”

💡 Solution

OverlayAI brings AI directly onto your screen.

No tab switching
No copy-pasting
No context explaining

Just press a hotkey → AI reads your screen → gives instant help.

⚡ Core Idea

Your screen already has the context — AI should use it.

🧩 Architecture Overview

OverlayAI is built using a vision-first + agentic pipeline.

🖥️ 1. Electron Layer (Desktop Engine)

Electron is the backbone of the system.

It enables:

Global hotkey detection (Ctrl + Shift + Space)
Screen capture (active window)
System-level access (apps, notifications, OS APIs)

🔁 2. Pipeline Flow

As shown in the system flow (page 6):

Step 1 — Trigger

User presses global hotkey from any app

Step 2 — Screen Capture

Electron captures pixel data of the active window

Step 3 — Vision Processing
Sent to LLaMA Vision (via Groq)
Extracts:
text
UI context
intent

Step 4 — Context-Aware Prompt
Screen data + user intent → combined into structured prompt

Step 5 — Language Model
Processed by LLaMA 3
Generates response

Step 6 — Streaming Response
Sent to UI using SSE (Server-Sent Events)
Appears instantly

Step 7 — Action Layer (Agentic AI)
If needed, system executes actions:
open apps
schedule events
create reminders

Step 8 — Exit

Overlay disappears → user continues working

⚡ Why It’s Fast
Powered by Groq LPU inference
Response starts in milliseconds
Full output in ~1–2 seconds
🎯 Features
🧠 Screen-Aware Code Intelligence

Instantly explains, summarizes, or refactors code on your screen — no copy-paste required.

📄 Smart Resume Tailoring

Automatically rewrites your resume based on a job description visible on your screen.

📧 Intelligent Communication

Reads emails, Slack, or chats and generates context-aware replies instantly.

📊 Document & PPT Generation

Transforms PDFs, notes, or research into structured summaries and presentation-ready content.

📱 WhatsApp & Chat Summaries

Summarizes long conversations and suggests quick replies.

⚙️ Agentic System Actions

Turns information into actions:

schedule meetings
open apps
set reminders

🧱 Tech Stack

🎨 Frontend
React.js
TypeScript
Tailwind CSS
Framer Motion

🖥️ Desktop
Electron.js
Node.js

🤖 AI Layer
Groq API
LLaMA 3 (LLM)
LLaMA Vision (OCR + context understanding)

🌐 Backend (optional routes)
Next.js APIs
SSE streaming

🔐 Privacy
Screen data is processed in memory
No permanent storage
Buffers are cleared immediately after inference
🧪 How to Run
# install dependencies
npm install

# run frontend + electron
npm run dev

🎮 Usage
Open any app (VS Code, browser, etc.)
Press:
Ctrl + Shift + Space
Overlay appears
AI reads your screen and responds instantly

🌍 Use Cases
Debugging code
Writing emails
Resume optimization
Research summarization
Productivity automation

🚀 Future Scope
Offline mode (Ollama / local models)
Plugin ecosystem
OS-level AI integration
Enterprise privacy mode

💼 Business Potential:

High retention (daily-use tool)
Large market (students, devs, professionals)
Freemium + subscription model
Can evolve into OS-level AI layer

👥 Team
Team S.Y.S.D

Shreya Kalra
Yamini Lotla
Siddhi Sharma
Dishti Kaushik