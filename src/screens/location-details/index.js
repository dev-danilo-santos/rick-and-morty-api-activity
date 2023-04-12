import React, { useEffect, useState } from 'react'
import { View, Text, Image, Button} from 'react-native'
import { getLocation } from '../../component/api/rick-and-morty'

const LocationDetailScreen = ({ navigation,route }) => {
  const { name } = route.params
  const [location, setLocation] = useState({})

  useEffect(() => {
    async function fetchLocation() {
      try {
        const { data: { results } } = await getLocation({ name })
        setLocation(results[0])
      } catch (error) {
        console.error(error)
      }
    }

    fetchLocation()
  }, [])
  function goToHomeScreen(listIds){ 
    navigation.navigate("CharsEffect",{listIds})
  }

  function extractIds(residents) {
    const ids = [];
    residents.forEach((url) => {
      ids.push(url.split("/").pop());
    });
    return ids;
  }
  
  return (
    <View>
      {location && (
        <View>
          <Text>Name: {location.name}</Text>
          <Text>Type: {location.type}</Text>
          <Text>Dimension: {location.dimension}</Text>
          <Button
            title='Residents'
           onPress={ () => {goToHomeScreen(extractIds(location.residents))}}
          />

        </View>
      )}
    </View>
  )
}

export default LocationDetailScreen
