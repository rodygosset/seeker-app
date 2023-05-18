import { Artist, QueryResult } from "@utils/types"
import { useContext, useEffect, useState } from "react"

import styles from "@styles/components/artist-select.scss"
import DropDownPicker from "react-native-dropdown-picker"
import { Context } from "@utils/context"


const getArtistList = (query: string) => {
    if(!query) return Promise.resolve<Artist[]>([])

    const handleErr = (err: any) => {
        console.log(err)
        return []
    }

    const url = `https://itunes.apple.com/search?term=${query}&entity=musicArtist`
    return fetch(url).then(res => res.json()).catch(handleErr).then((data: QueryResult<Artist>) => data.results).catch(handleErr)
}


const ArtistSelect = () => {

    // get search query accessors from context

    const { artistName, setArtistName } = useContext(Context)

    // state

    const [artists, setArtists] = useState<Artist[]>([])
    const [options, setOptions] = useState<{ label: string, value: number }[]>([])

    const [currentArtistId, setCurrentArtistId] = useState<number>()
    
    // effects

    // update the artist name when the artist id changes

    useEffect(() => {
        if(currentArtistId) {
            const selectedArtistName = getArtistNameFromId(currentArtistId)
            if(selectedArtistName == artistName) return
            setArtistName(selectedArtistName || "")
        }
    }, [currentArtistId])

    useEffect(() => {
        if(!artistName) {
            setCurrentArtistId(undefined)
            return
        }
        // keep the artist id up to date with the artist name
        // that requires keeping the artist list up to date
        getArtistList(artistName).then(artistList => {
            setArtists(artistList)
            const artist = artistList.find(artist => artist.artistName === artistName)
            if(artist && artist.artistId != currentArtistId) setCurrentArtistId(artist.artistId)
        })
    }, [artistName])


    // update the dropdown options when the artist list changes

    useEffect(() => {
        setOptions(getOptions())
    }, [artists])

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

    const getOptions = () => artists?.map(artist => ({
        label: artist.artistName,
        value: artist.artistId
    })) || []


    const getArtistNameFromId = (id: number) => {
        const artist = artists.find(artist => artist.artistId === id)
        return artist?.artistName
    }

    // render

    return (
        <DropDownPicker
            open={isOpen}
            value={currentArtistId || null}
            items={options}
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