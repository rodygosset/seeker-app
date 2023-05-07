import { Artist, QueryResult } from "@utils/types"
import { useState } from "react"

import styles from "@styles/components/artist-select.scss"
import DropDownPicker from "react-native-dropdown-picker"


const getArtistList = async (query: string) => {
    if(!query) return Promise.resolve([])
    const url = `https://itunes.apple.com/search?term=${query}&entity=musicArtist`
    const response = await fetch(url)
    const data: QueryResult<Artist> = await response.json()
    return [
        { 
            artistId: 0, 
            artistName: "All artists",
            artistLinkUrl: "",
            primaryGenreName: "",
            primaryGenreId: 0,
            wrapperType: "artist",
            artistType: "Artist",
            
        },
        ...data.results
    ]
}


interface Props {
    onSelect: (artist: Artist) => void
}

const ArtistSelect = (
    { onSelect }: Props
) => {

    // state

    const [artists, setArtists] = useState<Artist[]>([])

    const [currentArtistId, setCurrentArtistId] = useState<number>()
    
    // handlers

    const handleArtistSearch = async (query: string) => {
        const list = await getArtistList(query)
        // @ts-ignore
        setArtists(list)
    }


    const handleArtistSelect = (value: number) => {
        const artist = artists.find(artist => artist.artistId === value)
        if(artist) {
            onSelect(artist)
        }
    }

    // handle dropdown

    const [isOpen, setIsOpen] = useState(false)

    // utils

    const placeholder = "Find an artist by name"

    const getOptions = () => artists.map(artist => ({
        label: artist.artistName,
        value: artist.artistId
    }))

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