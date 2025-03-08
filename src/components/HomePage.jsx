import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";
import UploadImageSection from "./UploadImageSection";
import CodeGeneratedSection from "./CodeGeneratedSection";
import GenerateCode from "./GenerateButton";
import { Typography } from "@mui/material";
import MenuAppBar from "./AppBar";
import SelectLanguage from "./SelectLanguage";
import UMLPopup from "./UmlPreview";
import { useAtom } from "jotai";
import { plantUmlCodeAtom } from "../atoms";

export default function Homepage() {
  const [plantUMLCode, setPlantUMLCode] = useAtom(plantUmlCodeAtom); // Store UML Code
  const [language, setLanguage] = React.useState("java"); // Default language
  const [generatedCode, setGeneratedCode] = React.useState(""); // Store generated code

  // Function to send the PlantUML text and selected language to the backend
  const handleGenerateCode = async () => {
    try {
      const response = await fetch("http://localhost:5000/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plantUML: plantUMLCode, language }),
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

  return (
    <React.Fragment>
      <CssBaseline />
      <MenuAppBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-start",
          height: "calc(100vh - 64px)",
          gap: 4,
          paddingTop: "1%",
          width: "100vw",
          overflow: "hidden",
          backgroundColor: "#121212",
        }}
      >
        {/* Left Section: Upload Image + Button */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            gap: 2,
            height: "100%",
          }}
        >
          <Box>
            <Typography
              sx={{
                color: "white",
                fontFamily: "JetBrains Mono",
                fontSize: 20,
                marginLeft: "3%",
              }}
            >
              Class Diagram
            </Typography>
          </Box>

          <UploadImageSection setPlantUMLCode={setPlantUMLCode} />

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
              width: "100%",
            }}
          >
            <GenerateCode onClick={handleGenerateCode} />
            <SelectLanguage language={language} setLanguage={setLanguage} />
            {plantUMLCode && <UMLPopup plantUMLCode={plantUMLCode} />}
          </Box>
        </Box>

        {/* Right Section: Code Output */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            gap: 2,
            height: "99%",
            paddingRight: "1%",
            paddingBottom: "0.8%",
          }}
        >
          <Box>
            <Typography
              sx={{
                color: "white",
                fontFamily: "JetBrains Mono",
                fontSize: 20,
                marginLeft: "0.3%",
              }}
            >
              Code Generation
            </Typography>
          </Box>

          <CodeGeneratedSection language={language} generatedCode={generatedCode} />
        </Box>
      </Box>
    </React.Fragment>
  );
}
