import { Artist, QueryResult } from "@utils/types"
import { useContext, useEffect, useState } from "react"

import styles from "@styles/components/artist-select.scss"
import DropDownPicker from "react-native-dropdown-picker"
import { Context } from "@utils/context"


const getArtistList = (query: string) => {
    if(!query) return Promise.resolve([])
    const url = `https://itunes.apple.com/search?term=${query}&entity=musicArtist`
    return fetch(url).then(res => res.json()).then((data: QueryResult<Artist>) => data.results)
}


const ArtistSelect = () => {

    // get search query accessors from context

    const { setArtistName } = useContext(Context)

    // state

    const [artists, setArtists] = useState<Artist[]>([])

    const [currentArtistId, setCurrentArtistId] = useState<number>()
    
    // effects

    // update the artist name when the artist id changes

    useEffect(() => {
        if(currentArtistId) {
            const artistName = getArtistNameFromId(currentArtistId)
            setArtistName(artistName || "")
        }
    }, [currentArtistId])


    // handlers

    const handleArtistSearch = async (query: string) => {
        const list = await getArtistList(query)
        // @ts-ignore
        setArtists(list)
    }

    
    // handle dropdown

    const [isOpen, setIsOpen] = useState(false)

    // utils

    const placeholder = "Find an artist by name"

    const getOptions = () => artists.map(artist => ({
        label: artist.artistName,
        value: artist.artistId
    }))

    const getArtistNameFromId = (id: number) => {
        const artist = artists.find(artist => artist.artistId === id)
        return artist?.artistName
    }

    // render

    return (
        <DropDownPicker
            open={isOpen}
            value={currentArtistId || null}
            items={getOptions()}
            setOpen={setIsOpen}
            setValue={setCurrentArtistId}
            searchable
            placeholder="Find an artist by name"
            searchPlaceholder={placeholder}
            onChangeSearchText={handleArtistSearch}
            // styles

            style={styles.selectContainer}
            placeholderStyle={styles.placeholder}
            searchTextInputStyle={styles.searchTextInput}
            searchContainerStyle={styles.searchContainer}
            dropDownContainerStyle={styles.dropDownContainer}
            listItemLabelStyle={styles.listItemLabel}
        />
    )
}

export default ArtistSelect