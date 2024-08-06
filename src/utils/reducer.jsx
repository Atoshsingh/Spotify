import Playlist from "../components/Playlists";
import { reducerCases } from "./Constants";

export const initialState = {
    token: null,
    playlists: [],
    selectedPlaylist:[],
    userInfo: null,
    selectedPlaylistId:'38ZeJuseMWuLju6Biykr2y',
    currentlyPlaying:null,
    playerState:false
};

const reducer = (state, dispatch) => {
    switch (dispatch.type) {
        case reducerCases.SET_TOKEN: {
            return {
                ...state,
                token: dispatch.token,
            }
        }
        case reducerCases.SET_PLAYLISTS: {
            return {
                ...state,
                playlists: dispatch.playlists,
            }
        }
        case reducerCases.SET_USER: {
            // console.log("set user called ");
            // console.log(dispatch.userInfo);
            return {
                ...state,
                userInfo: dispatch.userInfo,
            }
        }
        case reducerCases.SET_PLAYLIST:{
            return{
                ...state,
                selectedPlaylist:dispatch.selectedPlaylist,
            }
        }
        case reducerCases.SET_PLAYING:{
            return{
                ...state,
                currentlyPlaying:dispatch.currentlyPlaying
            }
        }
        case reducerCases.SET_PLAYER_STATE:{

            return{
                ...state,
                playerState:dispatch.playerState
            }
        }
        case reducerCases.SET_PLAYLIST_ID:{
            console.log(dispatch.id)
            return{
                ...state,
                selectedPlaylistId:dispatch.id
            }
        }
        default:
            return state;
    }
}
export default reducer;