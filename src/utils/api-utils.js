import axios from "axios";

const api = axios.create({ baseURL: "https://northcoders-news-api-twr1.onrender.com/api" });

const getArticles = async (topic, sortBy, order, page) => {
  try {
    const res = await api.get("/articles", {
      params: {
        topic: topic,
        sort_by: sortBy,
        order: order,
        p: page
      }
    });
    return res.data;
  } catch (err) {
    console.log(err);
    if (err.response.status === 404) {
      return Promise.reject({ message: "That page does not exist!" });
    }
    if (err.response.status === 400) {
      return Promise.reject({ message: "Bad request!" });
    }
    return Promise.reject(err.message);
  }
};

const getArticleById = async (article_id) => {
  try {
    const res = await api.get(`/articles/${article_id}`);
    return res.data;
  } catch (err) {
    console.log(err);
    if (err.response.status === 404) {
      return Promise.reject({ message: "That article does not exist!" });
    }
    if (err.response.status === 400) {
      return Promise.reject({ message: "Bad request!" });
    }
    return Promise.reject(err.message);
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

const getUserByUsername = async (username) => {
  try {
    const res = await api.get(`/users/${username}`);
    return res.data;
  } catch (err) {
    console.log(err);
    if (err.response.status === 404) {
      return Promise.reject({ message: "That user does not exist!" });
    }
    if (err.response.status === 400) {
      return Promise.reject({ message: "Bad request!" });
    }
    return Promise.reject(err.message);
  }
};

const postArticle = async (body) => {
  try {
    const res = await api.post("/articles", body);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const postComment = async (article_id, body) => {
  try {
    const res = await api.post(`/articles/${article_id}/comments`, body);
    return res.data;
  } catch (err) {
    console.log(err);
  };
};

const postTopic = async (body) => {
  try {
    const res = await (api.post("/topics", body));
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const patchArticleById = async (article_id, body) => {
  const res = await api.patch(`/articles/${article_id}`, body);
  return res.data;
};

const patchCommentById = async (comment_id, body) => {
  const res = await api.patch(`/comments/${comment_id}`, body);
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
  getUserByUsername,
  postArticle,
  postComment,
  postTopic,
  patchArticleById,
  patchCommentById,
  deleteComment
};
