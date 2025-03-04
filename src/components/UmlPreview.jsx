import { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { CiChat2 } from "react-icons/ci";
import MDEditor, { commands } from "@uiw/react-md-editor";
import plantumlEncoder from "plantuml-encoder";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const UMLPopup = ({ plantUMLCode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [markdown, setMarkdown] = useState(plantUMLCode || "");
  const [umlImage, setUmlImage] = useState("");

  // Generate UML Diagram
  const generatePlantUML = (umlText) => {
    if (!umlText) return;
    try {
      const encodedDiagram = plantumlEncoder.encode(umlText);
      setUmlImage(`http://www.plantuml.com/plantuml/svg/${encodedDiagram}`);
    } catch (error) {
      console.error("Error generating PlantUML diagram", error);
    }
  };

  // Update UML whenever plantUMLCode or markdown changes
  useEffect(() => {
    if (plantUMLCode) {
      setMarkdown(plantUMLCode);
      generatePlantUML(plantUMLCode);
    }
  }, [plantUMLCode]);

  return (
    <div>
      {/* Open modal button */}
      <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 mb-4" onClick={() => setIsOpen(true)}>
        <CiChat2 size={32} className="text-gray-700" />
      </button>

      {/* UML Popup */}
      <Transition show={isOpen} as="div">
        <Dialog onClose={() => setIsOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0" style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}></div>

          {/* Click outside closes the pop-up */}
          <Dialog.Panel className="relative bg-white p-6 rounded-lg shadow-xl w-full max-w-3xl h-[80vh] flex flex-col">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 p-2 text-gray-600 hover:text-gray-900"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            <h2 className="text-lg font-semibold mb-4">UML Diagram Editor</h2>

            {/* Markdown Editor */}
            <div className="flex-1 overflow-auto">
              <MDEditor
                value={markdown}
                preview="edit"
                commands={[]}
                extraCommands={[commands.fullscreen]}
                onChange={(value) => {
                  setMarkdown(value || "");
                  generatePlantUML(value);
                }}
              />
            </div>
            
            <h2 className="text-lg font-semibold mb-4">Class Diagram Preview</h2>
            
            {/* UML Preview */}
            <div className="border p-2 mt-4 bg-gray-50 rounded-md max-h-[50vh] overflow-hidden flex justify-center items-center">
              {umlImage ? (
                <TransformWrapper
                  initialScale={1}
                  minScale={0.5}
                  maxScale={3}
                  wheel={{ step: 0.2 }}
                  pinch={{ step: 0.2 }}
                  doubleClick={{ step: 1 }}
                >
                  <TransformComponent>
                    <img src={umlImage} alt="PlantUML Diagram" className="w-full h-full object-contain" />
                  </TransformComponent>
                </TransformWrapper>
              ) : (
                <p>Generating UML diagram...</p>
              )}
            </div>
          </Dialog.Panel>
        </Dialog>
      </Transition>
    </div>
  );
};

export default UMLPopup;
