import React, { useState } from "react";
import axios from "axios";

const DeleteBook = ({ onDelete }) => {
  const [name, setName] = useState("");

  const handleDelete = async () => {
    try {
      const URL = "https://librarynew.onrender.com";
      await axios.delete(URL + "/deleteBook", { data: { name } });
      onDelete();
      setName("");
    } catch (error) {
      console.error("Failed to delete book:", error);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <input
        className="p-2 rounded-md text-black"
        type="text"
        placeholder="Book Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleDelete} className="bg-red-500 p-2 rounded-md text-white">
        Delete Book
      </button>
    </div>
  );
};

export default DeleteBook;
