import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import FirstPage from './Container/FirstPage/FirstPage';
import 'bootstrap/dist/css/bootstrap.css';
import Home from './Container/Home/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FirstPage/>} />
          <Route path="/Home" element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
