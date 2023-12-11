import axios from "axios";

const api = axios.create({ baseURL: "https://northcoders-news-api-twr1.onrender.com/api" });

const getArticles = async () => {
  try {
    const res = await api.get("/articles");
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

export { getArticles, getArticleById };
