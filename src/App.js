import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import FakeApi from './FakeAPI';
import FakeApiCrud from './FakeAPI_CRUD';
import FakeApiTable from './FakeAPI_Table';
import Home from './Home';

export default class App extends React.Component{
  render(){
    return(
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/fake-api' element={<FakeApi/>} />
          <Route exact path='/fake-api-table' element={<FakeApiTable/>} />
          <Route exact path='/fake-api-crud' element={<FakeApiCrud/>} />
        </Routes>
      </Router>
    )
  }
}