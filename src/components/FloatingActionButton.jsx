"use client";
import { useState } from "react";
import QuoteModal from "./QuoteModal";

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        className="fixed bottom-6 text-lg rounded-xl bg-blue-500 text-white flex items-center justify-center right-6 py-2 px-5  shadow-md"
        onClick={toggleModal}
      >
        Add
      </button>
      {isOpen && <QuoteModal onClose={toggleModal} />}
    </>
  );
};

export default FloatingActionButton;
