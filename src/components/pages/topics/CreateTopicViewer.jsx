const CreateTopicViewer = ({ children, showCreateTopic }) => {
  return (
    <article>
      {showCreateTopic ? children : null}
    </article>
  );
};

export default CreateTopicViewer;
