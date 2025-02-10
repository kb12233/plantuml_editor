require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const multer = require('multer');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = 5000;

// Initialize the Gemini API client
const gemini = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY);

app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

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

// Endpoint to handle image upload and processing
app.post('/upload', upload.single('image'), async (req, res) => {
  const model = gemini.getGenerativeModel({ model: "gemini-1.5-pro" });
  const imagePath = req.file.path;
  console.log('Processing image:', imagePath);
  try {
    // Read the image file
    const imageBuffer = fs.readFileSync(imagePath);

    // Convert image to base64
    const imageBase64 = imageBuffer.toString('base64');

    // Prepare the image object for the Gemini API
    const image = {
      inlineData: {
        data: imageBase64,
        mimeType: req.file.mimetype,
      },
    };

    // Send the image to the Gemini API with a prompt
    const prompt = 
    `Given the image of a UML class diagram provided, can you faithfully translate it into PlantUML notation, 
    preserving all class relationships, including associations, aggregations, and generalizations? 
    Ensure that attributes, methods, and their respective access modifiers are accurately represented. 
    Don't assign values to attributes or methods. Also, don't surround class names in quotes.
    If class names are compound words, use camelCase.
    Additionally, please accurately replicate the existing cardinalities and multiplicities without altering them. 
    Please provide a clear and coherent conversion, maintaining the integrity of the original diagram. 
    Only provide the PlantUML notation (it should not be surrounded in a markdown code block). 
    Also, for declaring attributes and methods, please use the following format:

    class Car {
      + String modelName
      + String modelYear
      + int modelPrice
      + void setModel(String model)
      + void setMake(String make)
      + void setYear(Number)
      + String getModel()
      + String getMake()
      + Number getYear()
    }


    And not something like the following:

    class Student {
      - FacultyNumber : String
      - Grades : Integer[]
      - / AvarageGrade : Double
      - hasFine : Bool
      - lastLog : DateTime
      - books : Book[]
    }`;
    const response = await model.generateContent([prompt, image]);

    // Assuming the API returns the PlantUML syntax in the response
    const plantUML = response.response.text();

    // Delete the uploaded image after processing
    fs.unlinkSync(imagePath);

    res.json({ plantUML });
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({ error: 'Failed to process image' });
  }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
