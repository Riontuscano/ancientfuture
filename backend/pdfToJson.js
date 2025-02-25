import fs from "fs";
import pdfParse from "pdf-parse";

const pdfFolder = "pdfs"; 
const outputFile = "pdf_data.json"; 

let pdfData = [];

// Process each PDF and extract text
async function processPDFs() {
  const files = fs.readdirSync(pdfFolder);
  for (const file of files) {
    const data = fs.readFileSync(`${pdfFolder}/${file}`);
    const parsed = await pdfParse(data);
    
    // Store text with file reference
    pdfData.push({ fileName: file, text: parsed.text });
  }

  // Save extracted text to JSON
  fs.writeFileSync(outputFile, JSON.stringify(pdfData, null, 2));
  console.log(`Processed and saved ${files.length} PDFs`);
}

processPDFs();
