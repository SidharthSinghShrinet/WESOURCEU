```markdown
# WESOURCEU — PDF Rule-Based Data Extraction (LLaMA + Node.js)

A lightweight service to upload PDFs and extract structured information using rule-based validation powered by a local LLM (LLaMA). This project converts PDF text to JSON outputs according to user-supplied rules, with reasoning and confidence scores to aid automation and verification.

Highlights
- Upload any PDF and extract plain text (pdf-parse).
- Apply dynamic, rule-based validation over extracted text.
- Use a local LLaMA model (via Ollama) or any compatible LLM API.
- Return machine-friendly JSON with results, reasoning, and confidence.
- Designed for resume parsing, certificate validation, compliance checks, and automated document verification.

Table of contents
- Features
- Tech stack
- Installation
- LLaMA / Ollama setup
- Running the server
- API
- Prompt & response format
- Project structure
- Development notes & future improvements
- Contributing
- License

## Features
- File upload endpoint for PDFs
- PDF text extraction using pdf-parse
- Rule-driven extraction: supply rules as plain text and get structured outputs
- LLM-driven reasoning to justify extracted values and provide confidence
- JSON output suitable for downstream automation

## Tech stack
- Backend: Node.js + Express
- File handling: Multer (memory storage)
- PDF parsing: pdf-parse
- LLM: LLaMA (recommended via Ollama) or any compatible LLM API
- API format: JSON

## Installation

1. Clone the repository
```bash
git clone https://github.com/SidharthSinghShrinet/WESOURCEU.git
cd WESOURCEU
```

2. Install dependencies
```bash
npm install
```

3. Configure environment (optional)
- If your server reads env vars, create a `.env` file. Example variables you may need:
  - PORT (defaults to 5000)
  - LLM_BACKEND (e.g. `ollama` or `api`)
  - LLM_MODEL (e.g. `llama3` or another model name)
  - API keys if using a remote LLM provider

## LLaMA (Ollama) setup (recommended for local LLM)
Install Ollama:
- macOS / Linux: https://ollama.com/download
- Windows (PowerShell admin):
```powershell
winget install Ollama.Ollama
```

Pull a LLaMA model (example):
```bash
ollama pull llama3
```

Confirm Ollama is running and the model is available:
```bash
ollama list
ollama run llama3 --help
```

If you prefer a hosted LLM, set LLM_BACKEND appropriately and add your provider credentials to the environment.

## Running the server

Start the server:
```bash
npm start
```

Default address:
http://localhost:5000

(If you use a process manager or Docker, adapt accordingly.)

## API

POST /upload
- Description: Upload a PDF and a list of extraction/validation rules. Returns JSON with extracted results, reasoning, and confidence scores.
- Content-Type: multipart/form-data

Form fields:
- pdf — File (PDF) — required
- rules — JSON string: Array of textual rules — required

Example body in a browser/JS frontend:
```js
const formData = new FormData();
formData.append("pdf", file); // file is a File object
formData.append("rules", JSON.stringify(["Extract Name", "Extract DOB", "Extract ID Number"]));

fetch("http://localhost:5000/upload", {
  method: "POST",
  body: formData
}).then(res => res.json()).then(console.log);
```

Example cURL:
```bash
curl -X POST "http://localhost:5000/upload" \
  -F "pdf=@/path/to/document.pdf" \
  -F 'rules=["Extract Name","Extract DOB"]'
```

Response format (example)
```json
{
  "extracted": [
    {
      "rule": "Extract Name",
      "result": "Rohan Singh",
      "reasoning": "Matched text: 'Name: Rohan Singh' on page 1 line 3",
      "confidence": 95
    },
    {
      "rule": "Extract DOB",
      "result": "12/03/2002",
      "reasoning": "Found pattern DD/MM/YYYY near 'DOB'",
      "confidence": 92
    }
  ],
  "meta": {
    "pages": 2,
    "text_length": 4823
  }
}
```

## Prompting / LLM guidance
The core pattern used for prompts:
- Provide the extracted PDF plain text to the model.
- Provide the list of rules, each with a concise instruction.
- Ask the model to output JSON only, with fields: rule, result, reasoning, confidence (0-100).
- Encourage the model to return an empty string or explicit null when a result is not found, and to provide short reasoning that references matching text or patterns.

Prompt skeleton (simplified):
- "Here is the document text: ... Apply the following rules: 1) Extract Name — return exact match if found. 2) Extract DOB — find date in DD/MM/YYYY or similar. Output JSON only with fields: rule, result, reasoning, confidence."

Note: keep the prompt deterministic and include examples if you want more consistent outputs.

## Project structure
project-root
┣ uploads/            # (optional) storage for uploaded files (if persisted)
┣ models/             # model artifacts (if storing local models or related files)
┣ routes/             # express routes (upload endpoint)
┣ server.js           # express server entrypoint
┣ package.json
┗ README.md

## Development notes
- The service currently extracts plain text from PDFs. For scanned PDFs, adding OCR (Tesseract.js or an external OCR service) is recommended.
- Confidence values are generated by the LLM prompt logic; consider adding heuristics (pattern matches, exact matches) to compute deterministic confidence scores.
- For production use, avoid storing sensitive PDFs on local disk in plain form. Use secure storage (S3) and ensure access controls.
- Rate limit and authentication: add API keys, JWTs, or other controls before exposing LLM-backed endpoints.
- Consider adding a rule management dashboard to create, test, and version extraction rules.

## Future improvements
- OCR pipeline for scanned documents (Tesseract.js or commercial OCR)
- Rule management UI for non-technical users
- Database storage (MongoDB / PostgreSQL) for results, logs, and audit trails
- Role-based authentication and rate limiting
- Dockerfile and docker-compose to simplify deployment
- Unit/integration tests for parsing, prompt generation, and API behavior

## Contributing
Contributions are welcome!
1. Fork the repository
2. Create a branch (feature/your-feature)
3. Commit changes with clear messages
4. Open a pull request describing your change

Please include tests and update the README if you change behavior.

## Troubleshooting
- "ollama: command not found" — ensure Ollama is installed and in your PATH.
- Slow LLM responses — try a lighter model or increase server resources.
- Unexpected JSON from LLM — refine the prompt to enforce "Output JSON only", and sanitize/validate the LLM output on the server.

## License
MIT License — free to use and modify. See LICENSE for details.

---
