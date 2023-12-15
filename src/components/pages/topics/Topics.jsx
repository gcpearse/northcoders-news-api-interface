import { useContext, useState } from "react";
import CreateTopic from "./CreateTopic";
import Topic from "./Topic";
import { UserContext } from "../../../contexts/UserContext";
import CreateTopicViewer from "./CreateTopicViewer";

const Topics = ({ topics, setTopics, isLoading, isError }) => {

  const { user } = useContext(UserContext);

  const [showCreateTopic, setShowCreateTopic] = useState(false);
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
      <p id="topics-intro">Click on any topic to view associated articles.</p>
      {!showCreateTopic ? <button
        id="new-topic-btn"
        onClick={handleClick}
        onBlur={() => setError(null)}>
        Create a new topic
      </button> : null}
      {error ? <p className="error" id="new-topic-error">{error}</p> : null}
      <CreateTopicViewer showCreateTopic={showCreateTopic}>
        <CreateTopic
          setShowCreateTopic={setShowCreateTopic}
          topics={topics}
          setTopics={setTopics} />
      </CreateTopicViewer>
      <ul>
        {topics.map((topic) => {
          return <Topic key={topic.slug} topic={topic} />;
        })}
      </ul>
    </section>
  );
};

export default Topics;
