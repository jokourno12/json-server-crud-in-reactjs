import React from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends React.Component{
    render(){
        return(
            <nav className="nav bg-dark">
                <Link to='/' className="nav-link active">Home</Link>
                <Link to='/fake-api' className="nav-link active">FakeAPI</Link>
                <Link to='/fake-api-table' className="nav-link active">FakeAPI Table</Link>
                <Link to='/fake-api-crud' className="nav-link active">FakeAPI CRUD</Link>
            </nav>
        )
    }
}