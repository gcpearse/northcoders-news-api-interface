import axios from "axios";

const api = axios.create({ baseURL: "https://northcoders-news-api-twr1.onrender.com/api" });

const getArticles = async (topic, sortBy, order) => {
  try {
    const res = await api.get("/articles", {
      params: {
        topic: topic,
        sort_by: sortBy,
        order: order
      }
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const getArticleById = async (article_id) => {
  try {
    const res = await api.get(`/articles/${article_id}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const getCommentsByArticleId = async (article_id) => {
  try {
    const res = await api.get(`/articles/${article_id}/comments`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const getTopics = async () => {
  try {
    const res = await api.get("/topics");
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const getUsers = async () => {
  try {
    const res = await api.get("/users");
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const postComment = async (article_id, body) => {
  const res = await api.post(`/articles/${article_id}/comments`, body);
  return res.data;
};

const patchArticleById = async (article_id, body) => {
  const res = await api.patch(`/articles/${article_id}`, body);
  return res.data;
};

const deleteComment = async (comment_id) => {
  const res = await api.delete(`/comments/${comment_id}`);
  return res.data;
};

export {
  getArticles,
  getArticleById,
  getCommentsByArticleId,
  getTopics,
  getUsers,
  postComment,
  patchArticleById,
  deleteComment
};
