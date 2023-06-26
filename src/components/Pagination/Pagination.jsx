// eslint-disable-next-line react/prop-types, react-refresh/only-export-components, no-unused-vars
const Pagination = ({ currentPage, totalPages, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className="page-item"
          >
            <button
              onClick={() => paginate(number)}
              className={`page-link${currentPage === number ? " active" : ""}`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
