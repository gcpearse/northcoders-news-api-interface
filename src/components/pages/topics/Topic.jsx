const Topic = ({ topic }) => {
  return (
    <li className="topic">
      <h2 id="topic-header">{topic.slug[0].toUpperCase() + topic.slug.slice(1).toLowerCase()}</h2>
      <p id="topic-body">{topic.description}</p>
    </li>
  );
};

export default Topic;
