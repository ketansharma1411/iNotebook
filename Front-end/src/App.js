import About from './Components/About';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Notestate from './context/Notestate';
import { useContext } from 'react';
import notecontext from './context/notes/notecontext';






function App() {
  const a=useContext(notecontext)
  console.log(a)
  if(a.mode==='dark'){
    document.body.style.backgroundColor = "rgb(33 37 41 / 99%)";
    document.body.style.color = "white";
  }
  else{
    document.body.style.backgroundColor = "white";
    document.body.style.color = "rgb(33 37 41 / 99%)";
  }

  return (
    <>
    
   
    
    <Router>
    <Navbar/>
    <Routes>
      <Route exact path='/' element={<Home/>}></Route>
      <Route exact path='/about' element={<About/>}></Route>

    </Routes>
    </Router>
   

    </>
  );
}

export default App;
