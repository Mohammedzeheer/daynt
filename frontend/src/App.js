import React from 'react';
import { BrowserRouter, Routes,Route} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/home';
import TiniWiki from './components/TiniWiki';

const App = () => {
  return (
 
    <BrowserRouter>
      <Routes>      
        <Route path='/admin' element={<Login/>}> </Route>
        <Route path='/signup' element={<Register/>}> </Route>
        <Route path='/admin/home' element={<Home/>}> </Route>
        <Route path='/' element={<TiniWiki/>}> </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

