import { useContext, useState } from "react";
import CreateTopic from "./CreateTopic";
import Topic from "./Topic";
import { UserContext } from "../../../contexts/UserContext";
import CreateTopicViewer from "./CreateTopicViewer";

const Topics = ({ topics, setTopics, isLoading, isError }) => {

  const { user } = useContext(UserContext);

  const [showCreateTopic, setShowCreateTopic] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = () => {
    if (user) {
      setShowCreateTopic(true);
    } else {
      setError("You must be logged in to create a topic.");
    }
  };

  if (isLoading) return <p>Loading content...</p>;
  if (isError) return <p>Oops! Something went wrong...</p>;

  return (
    <section>
      <h2 id="topics-header">Explore your favourite topics</h2>
      <p id="topics-intro">Want to create an article but don't see your topic?</p>
      {!showCreateTopic ? <button
        id="new-topic-btn"
        onClick={handleClick}
        onBlur={() => setError(null)}>
        Create a new topic
      </button> : null}
      {successMsg ? <div id="success-container">
        <p id="success-msg">Thanks! Your new topic has been added.</p>
        <button
        className="grey-btn"
        id="ok-btn"
        onClick={() => setSuccessMsg(false)}>
          Ok
        </button>
      </div> : null}
      {error ? <p className="error" id="new-topic-error">{error}</p> : null}
      <CreateTopicViewer showCreateTopic={showCreateTopic}>
        <CreateTopic
          setShowCreateTopic={setShowCreateTopic}
          topics={topics}
          setTopics={setTopics}
          setSuccessMsg={setSuccessMsg} />
      </CreateTopicViewer>
      <ul id="topics-list">
        {topics.map((topic) => {
          return <Topic key={topic.slug} topic={topic} />;
        })}
      </ul>
    </section>
  );
};

export default Topics;
