const Pagination = ({ searchParams, setSearchParams, pageQuery, pageLimit }) => {

  const setPageQuery = (page) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("p", page);
    setSearchParams(newParams);
  };

  const handleLeftClick = () => {
    const currentPage = +pageQuery || 1;
    if (currentPage > 1) {
      setPageQuery(currentPage - 1);
    }
  };

  const handleRightClick = () => {
    const currentPage = +pageQuery || 1;
    if (currentPage < pageLimit) {
      setPageQuery(currentPage + 1);
    }
  };

  return (
    <div className="pagination-section">
      <button
        className="pagination-btn"
        onClick={handleLeftClick}
        disabled={!pageQuery || +pageQuery === 1}>
        &#10094;
      </button>
      <p className="pagination-body">
        Page {pageQuery || 1} of {pageLimit}
      </p>
      <button
        className="pagination-btn"
        onClick={handleRightClick}
        disabled={+pageQuery === pageLimit}>
        &#10095;
      </button>
    </div>
  );
};

export default Pagination;
