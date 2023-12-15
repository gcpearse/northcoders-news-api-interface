const CreateTopic = ({ setShowCreateTopic }) => {

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('clicked!');
  };

  return (
    <div id="new-topic-form-container">
      <h2>Create a topic</h2>
      <form id="new-topic-form" onSubmit={handleSubmit}>
        <label
          htmlFor="topic-slug"
          className="new-topic-label">
          Topic (8-20 characters)
        </label>
        <input
          type="text"
          name="slug"
          className="new-topic-input"
          id="topic-slug"
          maxLength={20}
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
          required />
        <button
          className="grey-btn new-topic-btn">
          Create
        </button>
      </form>
      <button
        className="site-nav-btn"
        onClick={() => setShowCreateTopic(false)}>
        Cancel
      </button>
    </div>
  );
};

export default CreateTopic;
