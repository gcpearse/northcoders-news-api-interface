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

export { getArticles };
