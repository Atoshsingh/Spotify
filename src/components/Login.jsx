import React from 'react'
import './Login.css'
export default function Login() {

    function handleClick() {
        // alert("click working ");
        const clientId = ""
        const redirectedUrl = "http://localhost:5173"
        const apiUrl = "https://accounts.spotify.com/authorize";
        const scope = [
            "user-read-email",
            "user-read-private",
            "user-modify-playback-state",
            "user-read-playback-state",
            "user-read-currently-playing",
            'user-read-recently-played',
            'user-read-playback-position',
            'user-top-read'
            // "ugc-image-upload",
            // "user-read-playback-state",
            // "user-modify-playback-state",
            // "user-read-currently-playing",
            // "app-remote-control",
            // "streaming",
            // "playlist-read-private",
            // "playlist-read-collaborative",
            // "playlist-modify-private",
            // "playlist-modify-public",
            // "user-follow-modify",
            // "user-follow-read",
            // "user-read-playback-position",
            // "user-top-read",
            // "user-read-recently-played",
            // "user-library-modify",
            // "user-library-read",
            // "user-read-email",
            // "user-read-private",
            // "user-soa-link",
            // "user-soa-unlink",
            // "soa-manage-entitlements",
            // "soa-manage-partner",
            // "soa-create-partner"
        ]

        // window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectedUrl}&scope=${scope.join(
        //     " "
        // )}&response_type=token&show_dailog=true`;
        window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectedUrl}&scope=${scope}&response_type=token&show_dailog=true`;
    }
    return (
        <div className='LoginDiv'>
            <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Full_Logo_RGB_Black.png" alt="spotifyLogo" />
            <button onClick={handleClick}>Let's Play</button>
        </div>
    )
}
