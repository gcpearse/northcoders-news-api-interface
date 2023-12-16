import { useContext, useState } from "react";
import { postTopic } from "../../../utils/api-utils";
import { UserContext } from "../../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const CreateTopic = ({ setShowCreateTopic, topics, setTopics, setSuccessMsg }) => {

  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const [slug, setSlug] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState(null);

  const handleSlugChange = (event) => {
    setSlug(event.target.value);
  };

  const handleDescChange = (event) => {
    setDesc(event.target.value);
  };

  const handleClear = () => {
    setSlug("");
    setDesc("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);
    const topic = {
      slug: slug.toLowerCase(),
      description: desc
    };
    const currentSlugs = topics.map((topic) => {
      return topic.slug.toLowerCase();
    });
    if (currentSlugs.indexOf(topic.slug) === -1) {
      postTopic(topic)
        .then(() => {
          setTopics((currentTopics) => {
            return [...currentTopics, topic].sort((a, b) => {
              if (a.slug > b.slug) return 1;
              if (a.slug < b.slug) return -1;
              return 0;
            });
          });
          setShowCreateTopic(false);
          setSuccessMsg(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setError("Sorry, that topic already exists!");
    }
  };

  if (user) {
    return (
      <div id="new-topic-form-container">
        <h2 id="new-topic-form-header">Create a topic</h2>
        <form
          id="new-topic-form"
          onSubmit={handleSubmit}
          onBlur={() => setError(null)}>
          <label
            htmlFor="topic-slug"
            className="new-topic-label">
            Topic (20 characters max)
          </label>
          <input
            type="text"
            name="slug"
            className="new-topic-input"
            id="topic-slug"
            maxLength={20}
            value={slug}
            onChange={handleSlugChange}
            required />
          <label
            htmlFor="topic-desc"
            className="new-topic-label">
            Description (50 characters max)
          </label>
          <input
            type="text"
            name="description"
            className="new-topic-input"
            id="topic-desc"
            maxLength={50}
            value={desc}
            onChange={handleDescChange}
            required />
          {error ? <p className="error" id="topic-error">{error}</p> : null}
          <div className="section-btns">
            <button
              type="submit"
              className="grey-btn new-topic-btn">
              Create
            </button>
            <button
              type="button"
              className="grey-btn new-topic-btn"
              onClick={handleClear}>
              Reset
            </button>
          </div>
        </form>
        <button
          className="site-nav-btn"
          onClick={() => setShowCreateTopic(false)}>
          Cancel
        </button>
      </div>
    );
  } else {
    return (
      <section className="error-section">
        <h2 className="error-header">Error</h2>
        <p>You must be logged in to use this feature.</p>
        <button
          className="site-nav-btn"
          onClick={() => navigate(0)}>
          Close
        </button>
      </section>
    );
  }
};

export default CreateTopic;
