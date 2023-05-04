import { fonts } from "@utils/fonts"
import { useFonts } from "expo-font"
import { View, Text } from "react-native"

import styles from "@styles/screens/home.scss"
import { ScreenProps } from "@utils/types"
import SearchBar from "@components/search-bar"

import Logo from "@assets/seeker-logo.svg"


const Home = ({ navigation }: ScreenProps) => {


    // load the fonts

	const [fontsLoaded] = useFonts(fonts)

	// don't display anything until the fonts are loaded

	if(!fontsLoaded) return <View></View>

	// render

	return (
        <View style={styles.container}>
            <View style={styles.hero}>
                <Logo/>
                <Text style={styles.text}>Seeker</Text>
                <Text style={styles.caption}>FIND THE MUSIC YOU’RE LOOKING FOR</Text>
            </View>
            <SearchBar/>
        </View>
	)
}

export default Home