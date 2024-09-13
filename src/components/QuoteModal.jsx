"use client";
import { useState } from "react";
import axios from "axios";

const QuoteModal = ({ onClose }) => {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const validateFile = (file) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    return allowedTypes.includes(file.type);
  };

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setError("Quote text is required");
      return;
    }
    if (!file) {
      setError("Image file is required");
      return;
    }
    if (!validateFile(file)) {
      setError("Invalid file type. Only JPG and PNG are allowed.");
      return;
    }

    const token = localStorage.getItem("authToken");
    try {
      const formData = new FormData();
      formData.append("file", file);

      const uploadResponse = await axios.post(
        "https://crafto.app/crafto/v1.0/media/assignment/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      const mediaUrl = uploadResponse?.data[0]?.url;

      await axios.post(
        "https://assignment.stage.crafto.app/postQuote",
        { text, mediaUrl },
        { headers: { Authorization: token } }
      );

      onClose();
    } catch (error) {
      setError("Failed to create quote. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Create a Quote</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleQuoteSubmit}>
          <textarea
            placeholder="Enter your quote"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            rows={3}
          />
          <input
            accept="image/*"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full mb-4"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white w-full p-2 rounded-md"
          >
            Submit
          </button>
        </form>
        <button onClick={onClose} className="text-gray-600 w-full p-2 mt-4">
          Close
        </button>
      </div>
    </div>
  );
};

export default QuoteModal;
