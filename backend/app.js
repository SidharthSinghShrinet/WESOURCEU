import express from "express";
import cors from "cors";
import multer from "multer";
import pdfParse from "pdf-parse/lib/pdf-parse.js";
import { Ollama } from "ollama";
const app = express();
const upload = multer({ storage: multer.memoryStorage() });
const client = new Ollama();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.post("/upload", upload.single("pdf"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No PDF uploaded" });
        }

        const extractedText = await pdfParse(req.file.buffer);
        let rules = JSON.parse(req.body.rules);
        let rulesArray = Object.values(rules);
        const rulesFormatted = rulesArray.map((rule, idx) => `${idx + 1}. ${rule}`).join("\n");
        // console.log(rulesFormatted);
        const prompt = `
You are an AI system designed to extract structured information from text based on specific validation rules.

--------------------
📄 PDF CONTENT:
${extractedText.text}
--------------------

🧠 TASK:
Using the rules below, analyze the provided PDF content and extract the required information.

Each rule must produce a JSON object with:
- "rule": the text of the rule
- "status": pass or fail
- "result": extracted value from PDF OR null if not found
- "reasoning": short explanation how result was determined
- "confidence": a number between 0-100 based on how certain the extraction is

If a rule is impossible to satisfy, return:
{
 "rule": "...",
 "status":"fail"
 "result": null,
 "reasoning": "Not found in PDF or unclear",
 "confidence": 0
}

--------------------
🔍 VALIDATION RULES:
${rulesFormatted}
--------------------

🎯 OUTPUT FORMAT (STRICT JSON — NO TEXT OUTSIDE JSON):

{
  "extracted": [
    {
      "rule": "Rule text here",
      "status":"pass",
      "result": "Extracted value",
      "reasoning": "Why this value matches",
      "confidence": 92
    }
  ]
}

ONLY return valid JSON.
`;
        const response = await client.generate({
            model: "llama3.2",
            prompt: prompt,
            format: "json"
        })
        res.status(200).json({
            success: true,
            rulesResult: JSON.parse(response.response),
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
})

let PORT = 5000;
app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log(`Server running at port ${PORT}`);
})
