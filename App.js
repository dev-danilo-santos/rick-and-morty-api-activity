import { StatusBar } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import CharsEffectScreen from './src/screens/chars-effect'
import MenuScreen from './src/screens/menu'
import EffectIntroductionScreen from './src/screens/effect-introduction'
import MainCharsScreen from './src/screens/main-chars'
import CharacterDetailScreen from './src/screens/character-detail'
import LocationDetailScreen from './src/screens/location-details'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CharsEffect">
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="EffectIntroduction" component={EffectIntroductionScreen} />
        <Stack.Screen name="MainChars" component={MainCharsScreen} />
        <Stack.Screen name="CharsEffect" component={CharsEffectScreen} />
        <Stack.Screen name="CharacterDetail" component={CharacterDetailScreen} />
        <Stack.Screen name="LocationDetail" component={LocationDetailScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  )
}