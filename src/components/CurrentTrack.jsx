import React from 'react'
import './CurrentTrack.css';
import { useEffect } from 'react';
import axios from 'axios'
import { useStateProvider } from '../utils/StateProvider';
import { reducerCases } from '../utils/Constants';

export default function CurrentTrack() {

    const [{ token, currentlyPlaying }, dispatch] = useStateProvider();

    useEffect(() => {
        //either use async await or promises
        const getCurrentTrack = async () => {
            const response = await axios.get("https://api.spotify.com/v1/me/player/currently-playing", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
            //   console.log(response)
            if (response.data) {
                const { item } = response.data;
                // console.log(item,'item')
                const currentlyPlaying = {
                    id: item.id,
                    name: item.name,
                    artists: item.artists.map((artist) => artist.name),
                    image: item.album.images[2].url,
                };
                // console.log(currentlyPlaying);
                dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying })
            }
        }
        getCurrentTrack()
        // console.log(currentlyPlaying, 'coming');// very imp // currTrack
    }, [token, dispatch, currentlyPlaying])


    return (
        <div className='currenttrackMainDiv'>
            {currentlyPlaying &&
                (<div className='Ctrack'>
                    <div className="Ctrack__imagee">
                        <img className='Cimage' src={currentlyPlaying.image} alt="currentlyplaying" />
                    </div>
                    <div className="Ctrack__info">
                        <span className='head1'>{currentlyPlaying.name}</span>
                        <span className='head2' > {currentlyPlaying.artists.join(", ")}</span>
                    </div>
                </div>)
            }
        </div>
    )
}
