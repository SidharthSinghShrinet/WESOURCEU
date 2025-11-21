<img width="1920" height="1080" alt="Screenshot (320)" src="https://github.com/user-attachments/assets/daab09f6-8769-4e0b-8d9d-8f37c333c0ca" />
<img width="1920" height="1080" alt="Screenshot (321)" src="https://github.com/user-attachments/assets/233edb66-a998-4615-9bd4-85f39baf8fbd" />
<img width="1920" height="1080" alt="Screenshot (322)" src="https://github.com/user-attachments/assets/b9948454-658e-4e13-984e-2767626cd52a" />
# WESOURCEU — PDF Rule-Based Data Extraction with LLaMA & Node.js

A small Node.js service that accepts a PDF, extracts text, applies rule-based validations, and returns structured JSON produced by a local LLM (LLaMA via Ollama or an API). Useful for resume parsing, certificate checks, compliance rules, and other document verification tasks.

---

## Table of contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [API](#api)
- [Prompt & Output Format](#prompt--output-format)
- [Project Structure](#project-structure)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)

---

## Features
- ✅ Upload any PDF file (memory storage with Multer)
- ✅ Extract plain text using `pdf-parse`
- ✅ Apply dynamic rule-based validation
- ✅ Use LLaMA (local LLM via Ollama) to generate structured output
- ✅ JSON-formatted response for automation
- ✅ Confidence scoring and reasoning for transparency

---

## Tech Stack
| Component     | Technology                         |
|---------------|------------------------------------|
| Backend       | Node.js + Express                  |
| File Handling | Multer (memory storage)            |
| PDF Parsing   | pdf-parse                          |
| LLM           | LLaMA (via Ollama or API)          |
| API Format    | JSON                               |

---

## Quick Start

1. Clone the repository
```bash
git clone https://github.com/SidharthSinghShrinet/WESOURCEU.git
cd WESOURCEU
```

2. Install dependencies
```bash
npm install
```

3. Install & setup Ollama (optional — only if using local LLaMA)
- macOS / Linux: https://ollama.com/download
- Windows (PowerShell as admin):
```powershell
winget install Ollama.Ollama
```
Pull the model:
```bash
ollama pull llama3
```

4. Start the server
```bash
npm start
```

Default server URL:
http://localhost:5000

> Note: If using a hosted LLM API instead of Ollama, set your environment variables or change the LLM client configuration in the code.

---

## API

### POST /upload
Upload a PDF and a list of text rules. The endpoint returns JSON with extracted values, reasoning, and confidence.

Request
- Content-Type: multipart/form-data
- Fields:
  - `pdf` — File (required) — PDF file to process
  - `rules` — Array of text rules (required). Send as JSON string.

Example (frontend / Fetch)
```javascript
const formData = new FormData();
formData.append("pdf", fileInput.files[0]); // File
formData.append("rules", JSON.stringify(["Extract Name", "Extract DOB", "Validate Certificate ID"]));

fetch("http://localhost:5000/upload", {
  method: "POST",
  body: formData
})
.then(res => res.json())
.then(console.log)
.catch(console.error);
```

Example (curl)
```bash
curl -X POST "http://localhost:5000/upload" \
  -F "pdf=@/path/to/document.pdf" \
  -F 'rules=["Extract Name","Extract DOB"]'
```

Response (example)
```json
{
  "extracted": [
    {
      "rule": "Extract Name",
      "result": "Rohan Singh",
      "reasoning": "Matched text: 'Name: Rohan Singh'",
      "confidence": 95
    },
    {
      "rule": "Extract DOB",
      "result": "12/03/2002",
      "reasoning": "Found pattern DD/MM/YYYY near 'DOB'",
      "confidence": 92
    }
  ]
}
```

---

## Prompt & Output Format

We pass the PDF-extracted text and the user-supplied rules to the LLM with a concise prompt: apply the rules and return JSON only. Keep the LLM instruction strict to avoid free-text replies.

Suggested prompt pattern:
1. System: You are an extractor. Input: raw PDF text + rules.
2. Instruction: Apply the rules in order and return a JSON object with fields: rule, result, reasoning, confidence.
3. Output: JSON only (no extra commentary).

---

## Project Structure
```
project-root
├── uploads/          # temporary uploaded files (if used)
├── models/           # local LLM model configs or helpers
├── routes/           # express routes (upload handler)
├── server.js         # app entrypoint
├── package.json
└── README.md
```

---

## Future Improvements
- 🔹 Add OCR support (Tesseract.js) for scanned PDFs
- 🔹 Interactive rule-management dashboard
- 🔹 Persist results to a database (MongoDB / PostgreSQL)
- 🔹 Role-based authentication & access control
- 🔹 Frontend UI for drag-and-drop uploads and rule editing

---

## Contributing
Contributions are welcome — please:
1. Fork the repo
2. Create a branch (feature/your-feature)
3. Commit your changes
4. Open a pull request with a clear description

Include tests and update README where applicable.

---

## License
MIT — free to use and modify.

---

If you'd like, I can:
- Add badges (build/lint/license) to the header,
- Generate a clearer code sample for the server route (Express),
- Or create a small frontend example (HTML + JS) for uploads. Which would you prefer next?
