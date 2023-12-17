const SortBy = ({ searchParams, setSearchParams, sortByQuery }) => {

  const setSortByQuery = (sortBy) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort_by", sortBy);
    setSearchParams(newParams);
  };

  const handleSortByChange = (event) => {
    setSortByQuery(event.target.value);
  };

  return (
    <label id="sort-by-label" htmlFor="sort-by-dropdown">
      Sort by
      <select
        name="sort-by"
        id="sort-by-dropdown"
        defaultValue={sortByQuery || "created_at"}
        onChange={handleSortByChange}>
        <option value="author">Author</option>
        <option value="comment_count">Comment count</option>
        <option value="created_at">Date created</option>
        <option value="title">Title</option>
        <option value="votes">Votes</option>
      </select>
    </label>
  );
};

export default SortBy;
