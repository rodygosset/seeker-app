
import React from "react";

import { LikedSong } from "./types";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Context API configuration

export interface AppContextType {
    query: string;
    artistName?: string;
    likedSongs: LikedSong[];
    setQuery: (data: string) => void;
    setArtistName: (data: string) => void;
    setLikedSongs: (data: LikedSong[]) => void;
}

export const initContext: AppContextType = {
    query: '',
    setQuery: () => { },
    artistName: '',
    setArtistName: () => { },
    likedSongs: [],
    setLikedSongs: () => { }
}

export const Context = React.createContext(initContext)


// Dealing with AsyncStorage and liked songs

/**
 * Get the liked songs from async storage
 * @returns Promise<LikedSong[]> The list of liked songs
 */

export const getPersistedLikedSongs = () => {
    return AsyncStorage.getItem('@liked_songs').then((res) => res != null ? JSON.parse(res) : []).catch(e => {
        console.log(e)
        return []
    }) as Promise<LikedSong[]>
}

/**
 * Set the liked songs in async storage
 * @param data The list of liked songs
 * @returns Promise<void>
 */

export const setPersistedLikedSongs = (data: LikedSong[]) => {
    console.log("updating data")
    return AsyncStorage.setItem('@liked_songs', JSON.stringify(data)).catch(e => {
        console.log(e)
    }).then(() => getPersistedLikedSongs())
}

/**
 * Update a song in the list of liked songs
 * @param likedSong The song to update in the list of liked songs
 * @returns Promise<void>
 */

export const updatePersistedLikedSong = (likedSong: LikedSong) => {
    return getPersistedLikedSongs().then((res) => {

        let newLikedSongs = [...res]

        // Find the index of the song in the list of liked songs

        const index = res.findIndex((item) => item.song.trackId === likedSong.song.trackId)
        
        if (index == -1) return res

        // Update the song if it was found

        newLikedSongs[index] = {...likedSong}

        // Update the list of liked songs

        return setPersistedLikedSongs(newLikedSongs)
    })
}