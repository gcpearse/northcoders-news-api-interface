import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Nav from './components/Nav';
import Home from './components/pages/home/Home';
import News from './components/pages/news/News';
import Topics from './components/pages/topics/Topics';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Nav />
      <Login />
      <main>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/news" element={<News />}></Route>
          <Route path="/topics" element={<Topics />}></Route>
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
