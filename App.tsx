import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { fonts } from '@utils/fonts';

import styles from "@styles/screens/app.scss"

export default function App() {


	console.log({styles})

	// load the fonts

	const [fontsLoaded] = useFonts(fonts)

	// don't display anything until the fonts are loaded

	if(!fontsLoaded) return <View></View>

	// render

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Hello, World !</Text>
			<StatusBar style="auto" />
		</View>
	)
}

