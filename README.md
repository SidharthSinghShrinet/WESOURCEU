📄 PDF Rule-Based Data Extraction using LLaMA & Node.js

This project allows users to upload a PDF and automatically extract structured information based on predefined validation rules using LLaMA and Natural Language Processing.

It is useful for:

Automated document verification

Resume/CV parsing

Certificate validation

Compliance rule checks

AI-Driven PDF Information Extraction

🚀 Features

✔ Upload any PDF file
✔ Extract plain text using pdf-parse
✔ Apply rule-based validation dynamically
✔ Use LLaMA (local LLM) to generate structured output
✔ JSON-formatted response for automation
✔ Confidence scoring + reasoning for transparency

🛠️ Tech Stack
Component	Technology
Backend	Node.js + Express
File Handling	Multer (memory storage)
PDF Parsing	pdf-parse
LLM	LLaMA (via Ollama or API)
API Format	JSON
📦 Installation
1️⃣ Clone the Repository
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>

2️⃣ Install Dependencies
npm install

3️⃣ Install & Setup LLaMA (Ollama Required)

Download and install Ollama:

Mac/Linux: https://ollama.com/download

Windows (Admin PowerShell):

winget install Ollama.Ollama


Then pull the LLaMA model:

ollama pull llama3

▶️ Run the Server
npm start


Server will run at:

http://localhost:5000

🔧 API Endpoints
POST /upload
Key	Type	Required
pdf	File (PDF)	Yes
rules	Array of text rules	Yes
Example Frontend Request (FormData)
const formData = new FormData();
formData.append("pdf", file);
formData.append("rules", JSON.stringify(["Extract Name", "Extract DOB"]));

fetch("http://localhost:5000/upload", {
  method: "POST",
  body: formData
});

🧠 Prompt Format Used for LLaMA

The system prompts LLaMA using:

PDF Content → Apply Rules → Output JSON Only


Example generated output:

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

📁 Project Structure
📦 project-root
 ┣ 📂 uploads
 ┣ 📂 models
 ┣ 📂 routes
 ┣ server.js
 ┣ package.json
 ┗ README.md

🧪 Future Improvements

🔹 OCR support for scanned PDFs (via Tesseract.js)

🔹 Rule management dashboard

🔹 Database storage (MongoDB / PostgreSQL)

🔹 Role-based authentication

🔹 Frontend UI for drag-and-drop PDF upload

🧑‍💻 Contributing

Pull requests are welcome!

Fork the repo

Create a new branch

Commit changes

Open a PR

📄 License

MIT License — free to use and modify.

⭐ If you found this useful, give the project a star!
