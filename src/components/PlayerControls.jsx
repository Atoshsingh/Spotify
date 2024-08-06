import React from 'react'
import axios from 'axios'
import {
    BsFillPlayCircleFill,
    BsFillPauseCircleFill,
    BsShuffle
} from 'react-icons/bs';
import {
    CgPlayTrackNext,
    CgPlayTrackPrev
} from 'react-icons/cg';
import './PlayerControls.css'
import {FiRepeat} from 'react-icons/fi'
import { useStateProvider } from '../utils/StateProvider'
import { reducerCases } from '../utils/Constants';

const PlayerControls = () => {
    const [{token,playlists,playerState},dispatch] = useStateProvider();
    
    const changeTrack = async(type)=>{
            await axios.post(`https://api.spotify.com/v1/me/player/${type}`, {},{
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
                const response = await axios.get("https://api.spotify.com/v1/me/player/currently-playing", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                })
                if (response.data) {
                    const { item } = response.data;
                    const currentlyPlaying = {
                        id: item.id,
                        name: item.name,
                        artists: item.artists.map((artist) => artist.name),
                        image: item.album.images[2].url,
                    };
    
                    // console.log(currentlyPlaying);
                    console.log(currentlyPlaying.name);
                    dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying})
                }
                else{
                    dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying:null })
                }
    };

    const changeState = async () =>{
        const state = playerState ? "pause" : "play";
        const response  = await axios.put(
            `https://api.spotify.com/v1/me/player/${state}`,{},{
                headers:{
                    Authorization: `Bearer ${token}`,
                    "Content-Type":'application/json',
                }
            }
        )
        dispatch({type:reducerCases.SET_PLAYER_STATE,playerState:!playerState});
    }
    return (
        <div className='playercontrolsMainDiv'>
            <div className="shuffle">
                <BsShuffle/>
            </div>
            <div className="previous">
                <CgPlayTrackPrev onClick={()=>changeTrack("previous")}/>
            </div>
            <div className="state">
                {playerState ? <BsFillPauseCircleFill onClick={changeState}/> :<BsFillPlayCircleFill  onClick={changeState}/> }
            </div>
            <div className="next">
                <CgPlayTrackNext onClick={()=>changeTrack("next")}/>
            </div>
            <div className="repeast">
                <FiRepeat/>
            </div>
        </div>
    )
}

export default PlayerControls

                /*  const changeTrack = async (type) => {
                     try {
                         // Attempt to change the track
                         await axios.post(`https://api.spotify.com/v1/me/player/${type}`, {}, {
                             headers: {
                                 Authorization: `Bearer ${token}`,
                                 "Content-Type": "application/json",
                             },
                         });
                 
                         // Get the currently playing track
                         const response = await axios.get("https://api.spotify.com/v1/me/player/currently-playing", {
                             headers: {
                                 Authorization: `Bearer ${token}`,
                                 "Content-Type": "application/json",
                             },
                         });
                 
                         if (response.data && response.data.item) {
                             const { item } = response.data;
                             const currentlyPlaying = {
                                 id: item.id,
                                 name: item.name,
                                 artists: item.artists.map((artist) => artist.name),
                                 image: item.album.images[2]?.url, // Use optional chaining to avoid errors
                             };
                 
                             console.log(currentlyPlaying.name); // Log the currently playing track name
                             dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
                         } else {
                             dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying: null });
                         }
                     } catch (error) {
                         console.error("Error changing track or fetching current track:", error);
                 
                         if (error.response && error.response.status === 403) {
                             console.error("Forbidden: Check if the token has the necessary scopes and is valid.");
                         } else {
                             console.error("An unexpected error occurred:", error);
                         }
                     }
                 }; */
                 