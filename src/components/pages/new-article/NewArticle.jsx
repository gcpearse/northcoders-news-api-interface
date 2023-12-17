import { useContext, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import Error from "../../Error";

const NewArticle = () => {

  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('submit')
  };

  if (user) {
    return (
      <section id="new-article">
        <h2 id="new-article-header">Post a new article</h2>
        <form
          id="new-article-form"
          onSubmit={handleSubmit}>
          <label htmlFor="new-article-title">
            Title (300 characters max)
          </label>
          <input
            type="text"
            name="new-article-title"
            className="new-article-input"
            id="new-article-title"
            value={title}
            onChange={handleTitleChange}
            required />
          <button
            type="button"
            className="grey-btn clear-btn"
            onClick={() => setTitle("")}>
            Clear
          </button>
          <label htmlFor="new-article-img">
            Image URL (optional)
          </label>
          <input
            type="url"
            name="new-article-img"
            className="new-article-input"
            id="new-article-img"
            value={image}
            onChange={handleImageChange} />
          <button
            type="button"
            className="grey-btn clear-btn"
            onClick={() => setImage("")}>
            Clear
          </button>
          <label htmlFor="new-article-body">
            Content
          </label>
          <textarea
            name="new-article-body"
            className="new-article-input"
            id="new-article-body"
            value={content}
            onChange={handleContentChange}
            required></textarea>
          <div id="new-article-btns">
            <button
              type="submit"
              className="grey-btn">
              Submit
            </button>
            <button
              type="button"
              className="grey-btn clear-btn"
              onClick={() => setContent("")}>
              Clear
            </button>
          </div>
        </form>
        <button className="site-nav-btn" onClick={() => navigate(-1)}>
          Cancel
        </button>
      </section>
    );
  } else {
    return <Error message={"You must be logged in to use this feature."} nav={-1} />;
  }
};

export default NewArticle;
