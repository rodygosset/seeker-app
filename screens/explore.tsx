import { useFocusEffect } from "@react-navigation/native"
import { Context } from "@utils/context"
import { QueryResult, ScreenProps, Song } from "@utils/types"
import { useCallback, useContext, useState } from "react"
import { FlatList, View } from "react-native"

import styles from "@styles/screens/explore.scss"
import Nav from "@components/layout/nav"
import SearchBar from "@components/search-bar"
import SongListItem from "@components/song-list-item"


const getSearchResults = (query: string, artistName: string) => {

    const handleErr = (err: any) => {
        console.log(err)
        return []
    }

    // get the search results from the iTunes API

    const url = `https://itunes.apple.com/search?term=${artistName}+${query}&entity=musicTrack&limit=50`
    return fetch(url).then(res => res.json()).then((data: QueryResult<Song>) => data.results).catch(handleErr)
}

const Explore = ({ navigation }: ScreenProps) => {

    // get search context

    const { query, artistName } = useContext(Context)

    // state

    const [results, setResults] = useState<Song[]>([])

    const refreshResults = () => { getSearchResults(query, artistName || "").then(setResults) }

    // when the screen is focused on
    // get the results from the iTunes API

    useFocusEffect(useCallback(refreshResults, [query, artistName]))

    // render

    return (
        <View style={styles.container}>
            <Nav 
                currentScreen="Explore" 
                goBack={navigation.goBack} 
            />
            <SearchBar
                // @ts-ignore
                onSearch={() => refreshResults()}
            />

            <FlatList
                style={styles.list}
                data={results}
                renderItem={({ item, index }) => (
                    <SongListItem 
                        song={item} 
                        isLast={index == results.length - 1} 
                        // @ts-ignore
                        onPress={() => navigation.navigate("SongView", { song: item })}
                    />
                )}
                keyExtractor={(item, index) => `${item.trackName}-${index}`}
            />
        </View>
    )
}

export default Explore