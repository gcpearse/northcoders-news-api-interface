import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Contents from './components/Contents';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Nav />
      <Login />
      <Contents />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
