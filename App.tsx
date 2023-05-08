
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Explore from '@screens/explore';
import Home from '@screens/home';
import { Context, initContext } from '@utils/context';
import { useMemo, useState } from 'react';

// this component serves as the kernel of the app


// nav conf

const Stack = createNativeStackNavigator()

export default function App() {

	// search context

	const [query, setQuery] = useState("")
	const [artistName, setArtistName] = useState("")

	// memoize the context,
	// to avoid needless React re-renders
	const value = useMemo(
		() => ({ query, setQuery, artistName, setArtistName }), [query, artistName]
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
				</Stack.Navigator>
			</NavigationContainer>
		</Context.Provider>
	)
}

