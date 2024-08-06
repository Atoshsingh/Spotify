import React, { useEffect } from 'react'
import { useStateProvider } from '../utils/StateProvider'
import { AiFillClockCircle } from 'react-icons/ai'
import axios from 'axios';
import reducer from '../utils/reducer';
import './Body.css';
import { reducerCases } from '../utils/Constants';
export default function Body() {
    const [{ token, selectedPlaylistId, selectedPlaylist,playerState}, dispatch] = useStateProvider();
    useEffect(() => {

        const getInitialPlayList = async () => {
            const response = await axios.get(`https://api.spotify.com/v1/playlists/${selectedPlaylistId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const selectedPlaylist = {
                id: response.data.id,
                name: response.data.name,
                description: response.data.description.startsWith("<a") ? "" : response.data.decription,
                image: response.data.images[0].url,
                tracks: response.data.tracks.items.map(({ track }) => ({
                    id: track.id,
                    name: track.name,
                    artists: track.artists.map((artist) => artist.name),
                    image: track.album.images[2].url,
                    duration: track.duration_ms,
                    album: track.album.name,
                    context_uri: track.album.uri,
                    track_number: track.track_number,
                })),
            }
            dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist });
            // console.log(selectedPlaylist);
            // console.log(response,"body");
        }
        getInitialPlayList();
        // console.log(selectedPlaylist);
    }, [token, dispatch, selectedPlaylistId])

    const msToMinutesAndSecons = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }


    const playTrack = async (id, name, artists, image, context_uri, track_number) => {
        const response = await axios.put(`https://api.spotify.com/v1/me/player/play`, {
            context_uri,
            offset: {
                positioin: track_number - 1,
            },
            position_ms: 0,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
        if (response.status === 204) {
            const currentlyPlaying = {
                id,
                name,
                artist,
                image
            };
            dispatch({type:reducerCases.SET_PLAYING,currentlyPlaying})
            dispatch({type:reducerCases.SET_PLAYER_STATE,playerState:true})
        }
        else{
            dispatch({type:reducerCases.SET_PLAYER_STATE,playerState:true})
        }
    }
    return (
        <div className='bodyMainDiv'>
            {selectedPlaylist.length != 0 &&
                (<>
                    <div className='playlist'>
                        <div className='image'>
                            <img src={selectedPlaylist.image} alt="selectedplaylist" />
                        </div>
                        <div className='details'>
                            <span className='type'>PLAYLIST</span>
                            <h1 className='title'>{selectedPlaylist.name}</h1>
                            <p className='description'>{selectedPlaylist.description}</p>
                        </div>
                    </div>
                    <div className='list'>
                        <div className="header__row">
                            <div className='col'>
                                <span>#</span>
                            </div>
                            <div className='col'>
                                <span>TITLE</span>
                            </div>
                            <div className='col'>
                                <span>ALBUM</span>
                            </div>
                            <div className='col'>
                                <span>
                                    <AiFillClockCircle />
                                </span>
                            </div>
                        </div>
                        <div className='tracks'>
                            {
                                selectedPlaylist.tracks.map( // line no 74 
                                    (
                                        {
                                            id,
                                            name,
                                            artists,
                                            image,
                                            duration,
                                            album,
                                            context_uri,
                                            track_number
                                        }, index) => {
                                        return (
                                            <div className='row' key={id} onClick={() => playTrack(id, name, artists, image, context_uri, track_number)}>
                                                <div className='col'>
                                                    <span>{index + 1}</span>
                                                </div>
                                                <div className='col__detail'>
                                                    <div className="image">
                                                        <img src={image}
                                                            alt="track" />
                                                    </div>
                                                    <div className="info">
                                                        <span className='naming'>{name} </span>
                                                        <span className='namingA'>{artists}</span>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <span>{album}</span>
                                                </div>
                                                <div className="col">
                                                    <span>{msToMinutesAndSecons(duration)}</span>
                                                </div>
                                            </div>
                                        )
                                    }
                                )
                            }
                        </div>
                    </div>
                </>)
            }
            {/* <div></div> */}
        </div>
    )
}
