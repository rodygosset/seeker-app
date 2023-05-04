
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Explore from '@screens/explore';
import Home from '@screens/home';

// this component serves as the kernel of the app


// nav conf

const Stack = createNativeStackNavigator()

export default function App() {

	// implement navigation


	// render

	return (
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
	)
}

