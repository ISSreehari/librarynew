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
    <div className="flex flex-row flex-wrap gap-3 mt-4 justify-center">
      {pages.map((page, i) => {
        return (
          <button
            key={i}
            onClick={() => setCurrentPage(page)}
            className={
              page === currentPage
                ? "bg-violet-500 px-2 py-2 rounded-md"
                : "bg-purple-300 px-2 py-2 rounded-md"
            }
            style={{ minWidth: '60px', minHeight: '40px' }}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
}

export default Pagination;
