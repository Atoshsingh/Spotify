import React, { useEffect,useRef, useState } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Body from './Body'
import Footer from './Footer'
import './Spotify.css'
import axios from 'axios'
import { useStateProvider } from '../utils/StateProvider'
import { reducerCases } from '../utils/Constants'
export default function Spotify() {
  const [{ token, userInfo }, dispatch] = useStateProvider();
  const bodyRef = useRef();
  const[navBackground,setNavBackground] =useState(false);
  const[headerBackground,setHeaderBackground] =useState(false);
  const bodyScrolled =()=>{
    bodyRef.current.scrollTop>=30?setNavBackground(true):setNavBackground(false);
    bodyRef.current.scrollTop>=268?setHeaderBackground(true):setHeaderBackground(false);
  }
  useEffect(() => {
    const getUserInfo = async () => {
      // console.log("fun")
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      // console.log("hello")
      // console.log({data});

    const userInfo = {
      userId: data.id,
      userName: data.display_name,
    }
    dispatch({ type: reducerCases.SET_USER, userInfo })

  }
    getUserInfo();
  // console.log(userInfo)

  }, [dispatch, token])
  return (
    <div className='spotifyMainDiv'>
      <div className='spotify__body'>
        <Sidebar />
        <div className='body'>
        {/* <div className='body' ref={bodyRef} onScroll={bodyScrolled}> */}
          {/* <Navbar  navBackground={navBackground}/> */}
          <Navbar />
          <div className='body__contents'>
            {/* <Body headerBackground={headerBackground}/> */}
            <Body />
          </div>
        </div>
      </div>
      <div className='spotify__footer'>
        <Footer />
      </div>
    </div>
  )
}
