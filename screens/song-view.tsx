import { View, Text, Image, Linking, FlatList } from "react-native"

import styles from "@styles/screens/song-view.scss"
import ImageGradient from "@assets/image-gradient.svg"
import { ScreenProps, Song } from "@utils/types"
import Nav from "@components/layout/nav"
import { useContext, useEffect, useState } from "react"
import LikeButton from "@components/like-button"
import { Context, updatePersistedLikedSong } from "@utils/context"
import Button from "@components/button"
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons"
import RatingStar from "@components/rating-star"


const SongView = ({ route, navigation }: ScreenProps) => {


    const { song } = route.params as { song: Song }

    const getHQArtwork = () => song.artworkUrl100.replaceAll("100", "2000")

    // song liking logic

    // state

    const [isLiked, setIsLiked] = useState(false)

    // get liked songs from context

    const { likedSongs, setLikedSongs } = useContext(Context)

    const getSongRating = () => {
        const likedSong = likedSongs.find(likedSong => likedSong.song.trackId == song.trackId)
        return likedSong?.rating
    }

    const [currentRating, setCurrentRating] = useState<number | undefined>(getSongRating())


    // check if the current song is liked

    const isSongLiked = () => likedSongs.some(likedSong => likedSong.song.trackId == song.trackId)

    useEffect(() => {
        setIsLiked(isSongLiked())
    }, [likedSongs, song])

    // keep the current rating in sync with the liked songs

    useEffect(() => setCurrentRating(getSongRating()), [likedSongs, song, isLiked])

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

    // update the song rating

    const handleRatingUpdate = (rating: number) => {
        // optimistically update the state
        setCurrentRating(rating)
        // update the rating in the async storage
        updatePersistedLikedSong({
            song,
            rating
        }).then(newLikedSongs => setLikedSongs(newLikedSongs))
    }

    // render

    return (
        <View style={styles.container}>
            <Nav 
                currentScreen="Song Info" 
                goBack={navigation.goBack} 
            />
            <View style={styles.card}>
                <Image
                    style={styles.image}
                    source={{ uri: getHQArtwork() }}
                />
                <ImageGradient 
                    style={styles.gradient} 
                    width="100%"
                    height="100%"
                />
                <View style={styles.trackInfo}>
                    <View style={styles.left}>
                        <Text style={styles.trackName}>{song.trackName}</Text>
                        <Text style={styles.artistName}>{song.artistName}</Text>
                    </View>
                    <LikeButton
                        onToggleLike={handleLikeToggle}
                        liked={isLiked}
                        dark
                    />
                </View>
            </View>
            <View style={styles.ratingInfo}>
                <Text style={styles.sectionTitle}>Rating</Text>
                {
                    isLiked ?
                    // show rating stars
                    <FlatList 
                        data={[1, 2, 3, 4, 5]}
                        horizontal
                        keyExtractor={item => item.toString()}
                        renderItem={({ item }) => (
                            <RatingStar
                                starNumber={item}
                                currentRating={currentRating}
                                onPress={() => handleRatingUpdate(item)}
                            />
                        )}
                    />

                    :
                    <Text style={styles.notLikedMessage}>Save the song to your library to rate it</Text>
                }
            </View>
            <Button
                icon={faArrowUpRightFromSquare}
                style={styles.button}
                title="Listen on iTunes"
                onPress={() => Linking.openURL(song.trackViewUrl)}
            />
        </View>
    )
}

export default SongView