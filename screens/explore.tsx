import { useFocusEffect } from "@react-navigation/native"
import { Context } from "@utils/context"
import { useCallback, useContext } from "react"
import { View, Text } from "react-native"


const Explore = () => {

    // get search context

    const { query, setQuery, artistName, setArtistName } = useContext(Context)


    useFocusEffect(useCallback(() => {
        console.log("query is ", query)
        console.log("artist name is ", artistName)
    }, [query, artistName]))


    // render

    return (
        <View>
            <Text>Hello</Text>
        </View>
    )
}

export default Explore