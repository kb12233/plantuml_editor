import { useState, useRef, useEffect } from "react";
import MDEditor, { commands } from "@uiw/react-md-editor";
import plantumlEncoder from "plantuml-encoder";
import UploadImageSection from "./upload_image_section"; // Import the UploadImageSection component

const PlantUMLEditor = () => {
  const [markdown, setMarkdown] = useState(`@startuml\nAlice -> Bob: Hello\n@enduml`);
  const [umlImage, setUmlImage] = useState("");
  const [generatedCode, setGeneratedCode] = useState(""); // Stores the generated code
  const [language, setLanguage] = useState("java"); // Default language
  const outputRef = useRef(null);

  // List of supported languages by PlantCode
  const supportedLanguages = [
    "coffeescript", "csharp", "ecmascript5", "ecmascript6", 
    "java", "php", "python", "ruby", "typescript",
    "swift", "kotlin"
  ];

  // Handle PlantUML generated from the uploaded image
  const handlePlantUMLGenerated = (plantUML) => {
    setMarkdown(plantUML);
    generatePlantUML(plantUML);
  };

  // Function to generate the PlantUML diagram preview
  const generatePlantUML = (umlText) => {
    try {
      const encodedDiagram = plantumlEncoder.encode(umlText || markdown);
      setUmlImage(`http://www.plantuml.com/plantuml/svg/${encodedDiagram}`);
    } catch (error) {
      console.error("Error generating PlantUML diagram", error);
    }
  };

  // Function to send the PlantUML text and selected language to the backend
  const convertToCode = async () => {
    try {
      const response = await fetch("http://localhost:5000/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plantUML: markdown, language }), // Send UML + language
      });

      const data = await response.json();
      if (data.code) {
        setGeneratedCode(`\`\`\`${language}\n${data.code}\n\`\`\``); // Wrap in a code block
      } else {
        console.error("Conversion failed:", data.error);
      }
    } catch (error) {
      console.error("Error converting PlantUML to code:", error);
    }
  };

  // Auto-scroll to generated code when it updates
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [generatedCode]);

  return (
    <div className="flex flex-col space-y-4 p-4">
      {/* Markdown Editor */}
      <div><UploadImageSection onPlantUMLGenerated={handlePlantUMLGenerated} /></div>
      <div>
        <h2 className="text-lg font-semibold">PlantUML Editor</h2>
        <MDEditor
          value={markdown}
          preview="edit"
          commands={[]}
          extraCommands={[commands.fullscreen]}
          onChange={(value) => {
            setMarkdown(value || "");
            generatePlantUML(value); // Live preview
          }}
        />
      </div>

      {/* Language Selection & Convert Button */}
      <div className="flex space-x-4 items-center">
        <label className="font-semibold">Select Language:</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="p-2 border rounded"
        >
          {supportedLanguages.map((lang) => (
            <option key={lang} value={lang}>
              {lang.charAt(0).toUpperCase() + lang.slice(1)} {/* Capitalize first letter */}
            </option>
          ))}
        </select>
        <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-400 cursor-pointer" onClick={convertToCode}>
          Convert to Code
        </button>
      </div>

      {/* PlantUML Preview */}
      <div className="border p-2">
        <h2 className="text-lg font-semibold">UML Diagram Preview</h2>
        {umlImage ? <img src={umlImage} alt="PlantUML Diagram" /> : <p>Enter PlantUML code...</p>}
      </div>

      {/* Generated Code Display in Markdown Editor */}
      <div className="p-4 border bg-gray-100" ref={outputRef}>
        <h2 className="text-lg font-semibold">Generated Code ({language}):</h2>
        <MDEditor value={generatedCode} commands={[]} preview="preview" extraCommands={[commands.fullscreen]} />
      </div>
    </div>
  );
};

export default PlantUMLEditor;