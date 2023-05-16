import { Song } from "@utils/types"
import { View, Text, Image, TouchableOpacity } from "react-native"

import styles from "@styles/components/song-list-item.scss"
import LikeButton from "./like-button"


interface Props {
    song: Song;
    isLast?: boolean;
}

const SongListItem = (
    {
        song,
        isLast
    }: Props
) => {


    // render

    return (
        <>
            <TouchableOpacity style={styles.container}>
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
                    onToggleLike={() => {}}
                    liked={false}
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