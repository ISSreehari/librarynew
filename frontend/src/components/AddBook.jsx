import React, { useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';

const AddBook = () => {
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://librarynew.onrender.com/postBooks', { name, author, description });
      history.push('/');
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl mb-5">Add a New Book</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <textarea
          className="p-2 rounded-md text-black"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit" className="bg-violet-500 px-4 py-2 rounded-md">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
