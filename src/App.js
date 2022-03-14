import React, { useState } from 'react'
import { Navigate, Route, Routes, Link} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import AddReview from './components/add-review';
import MoviesList from './components/movies-list';
import Movie from './components/movie';
import Login from './components/login';
import logo from './Logo/icon3.gif'

import Nav from 'react-bootstrap/Nav'
import NavLink from 'react-bootstrap/esm/NavLink';
import NavBar from 'react-bootstrap/Navbar'
import NavbarBrand from 'react-bootstrap/esm/NavbarBrand';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import { Image } from 'react-bootstrap';
import Home from './components/home';

function App() {
  const [user, setUser] = useState(null)

  const login= async (user)=>{
    setUser(user)
  }

  const logout= async ()=>{
  setUser(null)
  }
  return (
  <>
    <div className="App">
      <NavBar bg='light' expand= 'lg'>
        <NavbarBrand >{" "}<Link to={user?'/movies':'/'} className='text-decoration-none text-secondary' ><Image src={logo} width='20px' className='mb-2 ms-1' height="20px"/>Flick-Review</Link></NavbarBrand>
        <NavbarToggle aria-controls='basic-navbar-nav'/>
        <NavbarCollapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <LinkContainer to={"/movies"}>
              <NavLink>
              Movies
              </NavLink>
            </LinkContainer>
              {user?(<LinkContainer onClick={logout} to='/login'><NavLink>Logout User</NavLink></LinkContainer>)
              :(<LinkContainer to={'/login'}><NavLink>Login</NavLink></LinkContainer>)
              }
          </Nav>
        </NavbarCollapse>
      </NavBar>
      <Routes>
        <Route path='/' element={user? <Navigate to={"/movies"}/>: <Home/>}/>
        <Route exact path="/movies" element={<MoviesList/>}/>
        <Route path='/movies/:id/review' element={<AddReview user={user}/>}/>
        <Route path="/movies/:id/" element={<Movie user={user}/>}/>
        <Route path='/login' element={<Login login={(user)=>login(user)}/>}/>
      </Routes>
    </div>
    </>
  );
}

export default App;
