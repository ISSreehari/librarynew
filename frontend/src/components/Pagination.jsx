import React from "react";

const Pagination = ({
  totalPost,
  postPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    pages.push(i);
  }




  
  return (
    <div className="flex flex-row gap-3 mt-4">
      {pages.map((page, i) => {
        return (
          <button
            key={i}
            onClick={() => setCurrentPage(page)}
            className={
              page === currentPage
                ? "bg-violet-500 px-2 py-2 rounded-md"
                : "bg-purple-300 px-2 py-2 rounded-md" // Apply same padding to all buttons
            }
            style={{ minWidth: '100px', minHeight: '40px' }} // Define a specific width and height for all buttons
          >
            {page}
          </button>
          
        );
      })}
    </div>
  );
}

export default Pagination;
