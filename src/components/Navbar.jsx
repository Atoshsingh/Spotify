import React from 'react'
import {FaSearch} from 'react-icons/fa';
import {CgProfile} from 'react-icons/cg';
import { useStateProvider } from '../utils/StateProvider';
import './Navbar.css'
export default function Navbar() {
  const[{userInfo}] = useStateProvider();
  return (
    <div className='navbarMainDiv' >
      
      <div className='search__bar'>
        <FaSearch/>
        <input type="text" placeholder='Artists, song or podcasts'/>
      </div>
      <div className='avatar'>
        <a href="#">
          <CgProfile/>
          <span>
            {userInfo&&userInfo.userName}
            </span>
        </a>
      </div>
    </div>
  )
}
