import React from 'react'
import "./Footer.css"
import CurrentTrack from './CurrentTrack'
import PlayerControls from './PlayerControls'
import Volume from './Volume'
export default function () {
    return (
        <div className='footerDiv'>
            <CurrentTrack/>
            <PlayerControls/>
            <Volume/>
        </div>
    )
}

 