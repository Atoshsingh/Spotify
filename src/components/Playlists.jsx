import React from 'react'
import { useEffect } from 'react';
import { useStateProvider } from '../utils/StateProvider';
import reducer from '../utils/reducer';
import { reducerCases } from '../utils/Constants';
import axios from 'axios';
export default function Playlist() {

    const [{token,playlists,seletedPlaylistId},dispatch] = useStateProvider();
  useEffect(()=>{
    //either use async await or promises
    const getPlayListData = async ()=>{
      const response = await axios.get("https://api.spotify.com/v1/me/playlists",{
        headers:{
          Authorization:`Bearer ${token}`,
          "Content-Type":"application/json",
        },
      })
      // console.log(response);
      const { items } = response.data;

      const playlists = items.map(({name , id})=>{
        return{
          name , id 
        }
      });
      dispatch({ type : reducerCases.SET_PLAYLISTS , playlists})
    }
    getPlayListData();
  },[token,dispatch])

  const changeCurrentPlaylist = (id) =>{
    dispatch({type:reducerCases.SET_PLAYLIST_ID,id})
    console.log(seletedPlaylistId)
  }
return (
    <div>
      <h3>PlayLists</h3>
      <ul>
      {playlists.map(({name , id})=>{
        return <li onClick={()=>changeCurrentPlaylist(id)} key={id}>{name}</li>
      })}
      </ul>
      {/* <button onClick={get}>get Playlist</button> */}
    </div>
  )
}
