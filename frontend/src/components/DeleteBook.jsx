import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const DeleteBook = () => {
  const [name, setName] = useState('');
  const history = useHistory();

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await axios.delete('https://librarynew.onrender.com/deleteBook', { data: { name } });
      history.push('/');
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl mb-5">Delete a Book</h1>
      <form onSubmit={handleDelete} className="flex flex-col gap-4">
        <input
          className="p-2 rounded-md text-black"
          type="text"
          placeholder="Book Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit" className="bg-violet-500 px-4 py-2 rounded-md">Delete Book</button>
      </form>
    </div>
  );
};

export default DeleteBook;
