import { Song } from "@utils/types"
import { View, Text, Image, TouchableOpacity } from "react-native"

import styles from "@styles/components/song-list-item.scss"
import LikeButton from "./like-button"
import { Context } from "@utils/context";
import { useContext, useEffect, useState } from "react";


interface Props {
    song: Song;
    isLast?: boolean;
    onPress: () => void;
}

const SongListItem = (
    {
        song,
        isLast,
        onPress
    }: Props
) => {

    // state

    const [isLiked, setIsLiked] = useState(false)

    // get liked songs from context

    const { likedSongs, setLikedSongs } = useContext(Context)

    // check if the current song is liked

    const isSongLiked = () => likedSongs.some(likedSong => likedSong.song.trackId == song.trackId)

    useEffect(() => {
        setIsLiked(isSongLiked())
    }, [likedSongs])
    

    // handlers

    // add the current song to the liked songs

    const handleLikeToggle = () => {
        let newList = [...likedSongs]
        if(isLiked) {
            // remove the song from the list
            newList = newList.filter(likedSong => likedSong.song.trackId != song.trackId)
        }
        else {
            newList.push({ song, rating: 0 })
        }
        setLikedSongs(newList)
        // optimistically update the state
        setIsLiked(!isLiked)
    }


    // render

    return (
        <>
            <TouchableOpacity style={styles.container} onPress={onPress}>
                <Image
                    style={styles.thumbnail}
                    source={{
                        uri: song.artworkUrl100,
                    }}
                />
                <View style={styles.songTitleContainer}>
                    <Text style={styles.trackName}>{ song.trackName }</Text>
                    <Text style={styles.artistName}>{ song.artistName }</Text>
                </View>
                <LikeButton 
                    onToggleLike={handleLikeToggle}
                    liked={isLiked}
                />
            </TouchableOpacity>
            {
                !isLast ?
                <View style={styles.separator}/> 
                :
                <></>
            }
        </>
    )

}

export default SongListItem