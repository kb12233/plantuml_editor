const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Mapping of languages to file extensions
const languageExtensions = {
    java: "java",
    csharp: "cs",
    ecmascript5: "js",
    ecmascript6: "js",
    coffeescript: "coffee",
    php: "php",
    python: "py",
    ruby: "rb",
    typescript: "ts",
    swift: "swift",
    kotlin: "kt"
};

app.post("/convert", (req, res) => {
    const { plantUML, language } = req.body;

    if (!plantUML || !language) {
        return res.status(400).json({ error: "Missing PlantUML text or language" });
    }

    // Validate the selected language
    if (!languageExtensions[language]) {
        return res.status(400).json({ error: "Unsupported language selected" });
    }

    // Define paths for input and output files
    const tempFilePath = path.join(__dirname, "diagram.puml");
    const outputFileName = `diagram.${languageExtensions[language]}`;
    const outputFilePath = path.join(__dirname, "output", outputFileName);

    // Ensure the output directory exists
    if (!fs.existsSync(path.join(__dirname, "output"))) {
        fs.mkdirSync(path.join(__dirname, "output"));
    }

    // Write the PlantUML syntax to a temporary file
    fs.writeFileSync(tempFilePath, plantUML);

    // Run PlantCode CLI command with the correct output file extension
    exec(`npx plantcode -l ${language} -o ${outputFilePath} ${tempFilePath}`, (error, stdout, stderr) => {
        if (error) {
            console.error("Error:", stderr);
            return res.status(500).json({ error: stderr || "Conversion failed" });
        }

        // Read the generated code from the correctly named output file
        if (fs.existsSync(outputFilePath)) {
            const generatedCode = fs.readFileSync(outputFilePath, "utf-8");
            fs.unlinkSync(tempFilePath); // Clean up the temporary input file
            return res.json({ code: generatedCode });
        } else {
            return res.status(500).json({ error: "Output file not found" });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
