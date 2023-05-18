import { ScreenProps } from "@utils/types"
import { FlatList, View } from "react-native"

import styles from "@styles/screens/liked-songs-view.scss"
import Nav from "@components/layout/nav"
import { Context } from "@utils/context"
import { useContext } from "react"
import SongListItem from "@components/song-list-item"

const LikedSongsView = ({ navigation }: ScreenProps) => {

    const { likedSongs } = useContext(Context)

    // render

    return (
        <View style={styles.container}>
            <Nav 
                currentScreen="Liked Songs" 
                goBack={navigation.goBack} 
            />
            <FlatList
                data={likedSongs}
                style={styles.list}
                renderItem={({ item, index }) => (
                    <SongListItem 
                        song={item.song} 
                        isLast={index == likedSongs.length - 1} 
                        // @ts-ignore
                        onPress={() => navigation.navigate("SongView", { song: item.song })}
                    />
                )}
                keyExtractor={item => item.song.trackId.toString()}
            />
        </View>
    )

}

export default LikedSongsView