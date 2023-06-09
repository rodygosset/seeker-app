import { TextInput, View, Text } from "react-native"


import styles from "@styles/components/search-bar.scss"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faArrowUpRightFromSquare, faSearch } from "@fortawesome/free-solid-svg-icons"
import { useContext, useEffect, useRef, useState } from "react"
import Button from "./button"
import ArtistSelect from "./artist-select"
import { Context } from "@utils/context"

interface Props {
    onSearch: () => void
}

const SearchBar = (
    { onSearch }: Props
) => {
    

    // get search query accessors from context

    const { query, setQuery, setArtistName } = useContext(Context)

    // when the search input is focused on
    // update the placeholder and show the form

    const [placeholder, setPlaceholder] = useState("Explore the iTunes library")

    const [isFocused, setIsFocused] = useState(false)

    const inputRef = useRef<TextInput>(null)

    useEffect(() => {
        if(isFocused) setPlaceholder("Find a song by track name")
        else {
            setPlaceholder("Explore the iTunes library")
            if(inputRef.current) inputRef.current.blur()
        }
    }, [isFocused])

    // utils

    const getContainerStyles = () => {
        let s = styles.container
        if(isFocused) {
            s = { ...s, ...styles.containerFocus }
        }
        return s
    }

    const getStyles = () => {
        let s = styles.searchBar
        if(isFocused) {
            s = { ...s, ...styles.searchBarFocus }
        }
        return s
    }

    const clearSearch = () => {
        setQuery("")
        setArtistName("")
    }

    // handlers

    const focus = () => setIsFocused(true)
    const loseFocus = () => setIsFocused(false)

    const handleSearch = () => {
        onSearch()
        loseFocus()
    }

    // render

    return (
        <View style={getContainerStyles()}>
            <View style={getStyles()}>
                <View style={styles.inputContainer}>
                    <FontAwesomeIcon icon={faSearch} style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder={placeholder}
                        onPressIn={focus}
                        ref={inputRef}
                        value={query}
                        onChangeText={setQuery}
                    />
                </View>
                {
                    isFocused ?
                    <>
                        <View style={styles.divider} />
                        <View style={styles.formContainer}>
                            <Text style={styles.filterLabel}>Filter by artist</Text>
                            <ArtistSelect />
                            <Button
                                title="Clear"
                                onPress={clearSearch}
                                role="secondary"
                                style={{
                                    width: "100%",
                                    zIndex: -1
                                }}
                            />
                            <View style={styles.buttonsContainer}>
                                <Button
                                    title="Close"
                                    onPress={loseFocus}
                                    role="secondary"
                                    fullWidth
                                />
                                <Button
                                    title="Show results"
                                    icon={faArrowUpRightFromSquare}
                                    onPress={handleSearch}
                                    fullWidth
                                />
                            </View>
                            
                        </View>
                    </>
                    :
                    <></>
                }
            </View>
        </View>
    )
}

export default SearchBar