import React from 'react'
import "./Sidebar.css";
import axios from 'axios'
import { IoLibrary } from 'react-icons/io5';
import { MdHomeFilled, MdSearch } from 'react-icons/md';
import Playlist from './Playlists';
import { useEffect } from 'react';
import { useStateProvider } from '../utils/StateProvider';
import reducer from '../utils/reducer';
import { reducerCases } from '../utils/Constants';
export default function Sidebar() {

  // const [{token},dispatch] = useStateProvider()
  // useEffect(()=>{
  //   //either use async await or promises
  //   const getPlayListData = async ()=>{
  //     const response = await axios.get("https://api.spotify.com/v1/me", {
  //       headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //       },
  //   });
  //     console.log(response);
  
  //     // const { items } = response.data;

  //     // const playlists= items.map(({name , id})=>{
  //     //   return{
  //     //     name , id 
  //     //   }
  //     // })
  //     // dispatch({type:reducerCases.SET_PLAYLISTS.playlists,playlists})
  //     // console.log(playlists);
  //   }
  //   getPlayListData();
  // },[token , dispatch])

  return (
    <div className='sidebarMainDiv'>
      <div className='top_links'>
        <div className='logo'>
          <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Full_Logo_RGB_White.png" alt='spotify' />
        </div>
        <ul>
          <li><MdHomeFilled /><span>Home</span></li>
          <li><MdSearch /><span>Search</span></li>
          <li><IoLibrary /><span>Your Library</span></li>
        </ul>
      </div>
      <Playlist />
    </div>
  )
}

// import React, { useEffect } from 'react';
// import axios from 'axios';
// import { IoLibrary } from 'react-icons/io5';
// import { MdHomeFilled, MdSearch } from 'react-icons/md';
// import { useStateProvider } from '../utils/StateProvider';
// import { reducerCases } from '../utils/Constants';
// import './Sidebar.css'
// export default function Sidebar() {
//   // const [{ token }, dispatch] = useStateProvider();

//   // useEffect(() => {
//   //   const getPlayListData = async () => {
//   //     try {
//   //       const response = await axios.get("https://api.spotify.com/v1/me", {
//   //         headers: {
//   //           Authorization: `Bearer ${token}`,
//   //           "Content-Type": "application/json",
//   //         },
//   //       });
//   //       console.log(response.data); // Check response structure
//   //       // Handle response data and dispatch actions as needed
//   //     } catch (error) {
//   //       console.error('Error fetching playlists:', error);
//   //       // Handle error state or display an error message
//   //     }
//   //   };

//   //   if (token) {
//   //     getPlayListData();
//   //   }
//   // }, [token, dispatch]);

//   return (
//     <div className='sidebarMainDiv'>
//       <div className='top_links'>
//         <div className='logo'>
//           <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Full_Logo_RGB_White.png" alt='spotify' />
//         </div>
//         <ul>
//           <li><MdHomeFilled /><span>Home</span></li>
//           <li><MdSearch /><span>Search</span></li>
//           <li><IoLibrary /><span>Your Library</span></li>
//         </ul>
//       </div>
//       <Playlist />
//     </div>
//   );
// }

