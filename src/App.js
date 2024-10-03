import logo from './logo.svg';
import './App.css';
import Navbar from './componnets/Navbar';
import Footer from './componnets/Footer';
import Editor from './componnets/Editor';

function App() {
  return (
    <div className="">
      <Navbar/>
      <Editor/>
      <Footer/>
    </div>
  );
}

export default App;
