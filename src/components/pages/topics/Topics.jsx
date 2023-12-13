import { useEffect } from "react";
import { useState } from "react";
import { getTopics } from "../../../utils/api-utils";
import Topic from "./Topic";

const Topics = () => {

  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getTopics()
      .then(({ topics }) => {
        setTopics(topics);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

  if (isLoading) return <p>Loading content...</p>;
  if (isError) return <p>Oops! Something went wrong...</p>;

  return (
    <section>
      <p id="topics-intro">Click on any topic to view associated articles</p>
      <ul>
        {topics.sort((a, b) => {
          if (a.slug > b.slug) return 1;
          if (a.slug < b.slug) return -1;
          return 0;
        }).map((topic) => {
          return <Topic key={topic.slug} topic={topic} />;
        })}
      </ul>
    </section>
  );
};

export default Topics;
