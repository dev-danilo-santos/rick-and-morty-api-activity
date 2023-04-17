import { StatusBar } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import CharsEffectScreen from './src/screens/chars-effect'
import MenuScreen from './src/screens/menu'
import MainCharsScreen from './src/screens/main-chars'
import CharacterDetailScreen from './src/screens/character-detail'
import LocationDetailScreen from './src/screens/location-details'
import EpisodeScreen from './src/screens/episodes'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CharsEffect">
        <Stack.Screen name="MainChars" component={MainCharsScreen} />
        <Stack.Screen name="CharsEffect" component={CharsEffectScreen} />
        <Stack.Screen name="CharacterDetail" component={CharacterDetailScreen} />
        <Stack.Screen name="LocationDetail" component={LocationDetailScreen} />
        <Stack.Screen name="EpisodeDetail" component={EpisodeScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  )
}