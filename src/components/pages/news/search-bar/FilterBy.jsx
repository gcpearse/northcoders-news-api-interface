const FilterBy = ({ topics, searchParams, setSearchParams, topicQuery }) => {

  const setTopicQuery = (topic) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("topic", topic);
    setSearchParams(newParams);
  };

  const handleTopicChange = (event) => {
    if (searchParams.has("p")) {
      const page = searchParams.get("p");
      if (page) {
        searchParams.delete("p");
        setSearchParams(searchParams);
      }
    }
    setTopicQuery(event.target.value);
  };

  return (
    <label id="topic-label" htmlFor="topic-dropdown">
      Search
      <select
        name="topic"
        id="topic-dropdown"
        defaultValue={topicQuery}
        onChange={handleTopicChange}>
        <option value="">All topics</option>
        {topics.map((topic) => {
          return <option key={topic.slug} value={topic.slug}>
            {topic.slug[0].toUpperCase() + topic.slug.slice(1).toLowerCase()}
          </option>;
        })}
      </select>
    </label>
  );
};

export default FilterBy;
