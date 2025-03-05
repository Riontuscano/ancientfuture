import fs from "fs/promises";
import path from "path";
import pdfParse from "pdf-parse";

const pdfFolder = path.resolve("pdfs"); // Absolute path for reliability
const outputFile = path.resolve("pdf_data.json"); 
let pdfData = [];

async function processPDFs() {
  try {
    console.log(`Checking if folder exists: ${pdfFolder}`);
    
    // Ensure the directory exists
    try {
      await fs.access(pdfFolder);
    } catch {
      console.error(`Error: Folder '${pdfFolder}' does not exist.`);
      return;
    }

    const files = await fs.readdir(pdfFolder);
    console.log("Found files:", files);

    // Filter only PDF files
    const pdfFiles = files.filter(file => file.toLowerCase().endsWith(".pdf"));

    if (pdfFiles.length === 0) {
      console.warn("No PDF files found in the folder.");
      return;
    }

    for (const file of pdfFiles) {
      const filePath = path.join(pdfFolder, file);
      console.log(`Processing file: ${filePath}`);
      
      try {
        const data = await fs.readFile(filePath);
        const parsed = await pdfParse(data);
        pdfData.push({ fileName: file, text: parsed.text });
      } catch (err) {
        console.error(`Error processing ${file}:`, err.message);
      }
    }

    await fs.writeFile(outputFile, JSON.stringify(pdfData, null, 2));
    console.log(`Successfully processed and saved ${pdfFiles.length} PDFs`);
  } catch (error) {
    console.error("Unexpected error:", error);
  }
}

processPDFs();
