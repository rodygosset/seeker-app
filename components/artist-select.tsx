import { Artist, QueryResult } from "@utils/types"
import { useEffect, useState } from "react"
import { TextInput, View } from "react-native"

import styles from "@styles/components/artist-select.scss"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import DropDownPicker from "react-native-dropdown-picker"


const getArtistList = async (query: string) => {
    if(!query) return Promise.resolve([])
    const url = `https://itunes.apple.com/search?term=${query}&entity=musicArtist`
    const response = await fetch(url)
    const data: QueryResult<Artist> = await response.json()
    return data.results
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
            searchPlaceholder={placeholder}
            onChangeSearchText={handleArtistSearch}
        />
    )
}

export default ArtistSelect