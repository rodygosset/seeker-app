
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Explore from '@screens/explore';
import Home from '@screens/home';
import SongView from '@screens/song-view';
import { Context, getPersistedLikedSongs, setPersistedLikedSongs } from '@utils/context';
import { LikedSong } from '@utils/types';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo, useState } from 'react';

// this component serves as the kernel of the app


// nav conf

const Stack = createNativeStackNavigator()

export default function App() {

	// search context

	const [query, setQuery] = useState("")
	const [artistName, setArtistName] = useState("")
	const [likedSongs, setter] = useState<LikedSong[]>([])

	// custom setter for liked songs
	// that also persists the songs to local storage

	const setLikedSongs = (songs: LikedSong[]) => {
		setPersistedLikedSongs(songs).then(setter)
	}

	// load liked songs from local storage on app load

	useEffect(() => {
		getPersistedLikedSongs().then(setter)
	}, [])

	// memoize the context,
	// to avoid needless React re-renders
	const value = useMemo(
		() => ({ query, setQuery, artistName, setArtistName, likedSongs, setLikedSongs }), [query, artistName, likedSongs]
	)

	// implement navigation

	// render

	return (
		<Context.Provider value={value}>
			<NavigationContainer>
				<Stack.Navigator 
					screenOptions={{  headerShown: false }}>
					<Stack.Screen 
						name="Home" 
						component={Home}
						options={{  }}
					/>
					<Stack.Screen 
						name="Explore" 
						component={Explore}
					/>
					<Stack.Screen 
						name="SongView" 
						component={SongView}
					/>
				</Stack.Navigator>
			</NavigationContainer>
			<StatusBar style="auto" />
		</Context.Provider>
	)
}

