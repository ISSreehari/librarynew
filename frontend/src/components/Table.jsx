import React, { useState, useCallback } from "react";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import Pagination from "./Pagination";
import AddBook from "./AddBook";
import DeleteBook from "./DeleteBook";

const Table = () => {
  const [searchName, setSearchName] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(5);

  const queryClient = useQueryClient();

  const filterData = useCallback(
    (books) => {
      const result = books.filter((book) => {
        const nameMatch = searchName
          ? book.name.toLowerCase().startsWith(searchName.toLowerCase())
          : true;
        const authorMatch = searchAuthor
          ? book.author.toLowerCase().startsWith(searchAuthor.toLowerCase())
          : true;
        return nameMatch && authorMatch;
      });
      return result;
    },
    [searchName, searchAuthor]
  );

  const URL = "https://librarynew.onrender.com";
  // const URL = "http://localhost:8000/";

  const { data: books } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await axios.get(URL + "/getBooks");
      return res.data;
    },
    retry: 2,
    select: filterData,
  });

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentBooks = books?.slice(firstPostIndex, lastPostIndex);

  const handleAdd = () => {
    queryClient.invalidateQueries("books");
  };

  const handleDelete = () => {
    queryClient.invalidateQueries("books");
  };

  return (
    <main className="flex flex-col bg-black text-white p-4 sm:p-10 justify-center items-center w-full min-h-screen overflow-y-scroll">


      <div className="w-full flex flex-col sm:flex-row justify-between mb-5 max-w-[900px]">
        <div className="flex flex-col mb-5 sm:mb-0">
          <input
            className="p-2 rounded-md text-black mb-2"
            type="text"
            placeholder="Search Name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <AddBook onAdd={handleAdd} />
        </div>
        <h1 className="text-xl text-center mb-2 sm:mb-0">LIBRARY MANAGEMENT</h1>
        <div className="flex flex-col">
          <input
            className="p-2 rounded-md text-black mb-2"
            type="text"
            placeholder="Search Author"
            value={searchAuthor}
            onChange={(e) => setSearchAuthor(e.target.value)}
          />
          <DeleteBook onDelete={handleDelete} />
        </div>
      </div>
      {books && (
        <table className="table-auto h-auto border-collapse w-full text-center p-2 max-w-[900px]">
          <thead className="bg-slate-800 w-full h-auto">
            <tr className="rounded-md">
              <th className="p-6">Name</th>
              <th>Description</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
            {currentBooks &&
              currentBooks.map((d) => {
                return (
                  <tr
                    key={d.id}
                    className={d.id % 2 === 0 ? "border-2 bg-slate-800" : "border-2 bg-slate-900"}
                  >
                    <td className="p-6 border-2 border-slate-100">{d.name}</td>
                    <td className="p-6 border-2 border-slate-100">{d.description}</td>
                    <td className="border-2 border-slate-100 p-6">{d.author}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
      <Pagination
        totalPost={books?.length}
        postPerPage={postPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </main>
  );
};

export default Table;
