import React, { useState } from "react";
import axios from "axios";

const AddBook = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const URL = "https://librarynew.onrender.com";
      await axios.post(URL + "/postBooks", { name, author, description });
      onAdd();
      setName("");
      setAuthor("");
      setDescription("");
    } catch (error) {
      console.error("Failed to add book:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
      <input
        className="p-2 rounded-md text-black"
        type="text"
        placeholder="Book Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className="p-2 rounded-md text-black"
        type="text"
        placeholder="Author Name"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />
      <input
        className="p-2 rounded-md text-black"
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit" className="bg-green-500 p-2 rounded-md text-white">
        Add Book
      </button>
    </form>
  );
};

export default AddBook;
