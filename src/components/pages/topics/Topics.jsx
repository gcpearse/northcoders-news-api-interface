import { useState } from "react";
import Topic from "./Topic";

const Topics = ({ topics, isLoading, isError }) => {

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
