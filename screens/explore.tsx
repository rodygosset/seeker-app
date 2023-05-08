import { useFocusEffect } from "@react-navigation/native"
import { Context } from "@utils/context"
import { QueryResult, Song } from "@utils/types"
import { useCallback, useContext, useEffect, useState } from "react"
import { View, Text } from "react-native"


const getSearchResults = (query: string, artistName: string) => {

    // get the search results from the iTunes API

    const url = `https://itunes.apple.com/search?term=${query}+${artistName}&entity=musicTrack&limit=50`
    return fetch(url).then(res => res.json()).then((data: QueryResult<Song>) => data.results)
}

const Explore = () => {

    // get search context

    const { query, setQuery, artistName, setArtistName } = useContext(Context)

    // state

    const [results, setResults] = useState<Song[]>([])

    // when the screen is focused on
    // get the results from the iTunes API

    useFocusEffect(useCallback(() => {
        
        getSearchResults(query, artistName || "").then(setResults)

    }, [query, artistName]))

    // console the results when they change

    useEffect(() => console.log("search results => ", results), [results])


    // render

    return (
        <View>
            <Text>Hello</Text>
        </View>
    )
}

export default Explore