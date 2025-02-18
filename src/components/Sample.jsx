import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { CiChat2 } from "react-icons/ci";
//import GeneratedPlantUML from "./PlantUMLEditor";
import GeneratedPlantUML from "./GeneratedPlantUML";

const UMLPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Icon Button to open modal */}
      <button
        className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
        onClick={() => setIsOpen(true)}
      >
        {/* <MdEdit size={24} className="text-gray-700" /> */}
        <CiChat2 size={24} className="text-gray-700" />
      </button>

      {/* Modal */}
      <Transition show={isOpen} as="div">
        <Dialog onClose={() => setIsOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-50"></div>
          <div className="relative bg-white p-6 rounded-lg shadow-xl w-full max-w-3xl">
            {/* Close Button */}
            <button 
              onClick={() => setIsOpen(false)} 
              className="absolute top-2 right-2 p-2 text-gray-600 hover:text-gray-900"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            {/* Title */}
            <h2 className="text-xl font-bold mb-4">Edit UML Diagram</h2>

            {/* PlantUMLEditor Component */}
            <GeneratedPlantUML />

          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default UMLPopup;
