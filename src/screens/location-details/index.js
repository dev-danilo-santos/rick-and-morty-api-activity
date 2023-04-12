import React, { useEffect, useState } from 'react'
import { View, Text, Image } from 'react-native'
import { getLocation } from '../../component/api/rick-and-morty'

const LocationDetailScreen = ({ route }) => {
  const { name } = route.params
  const [Location, setLocation] = useState(null)

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const { data: { results } } = await getLocation({ name })
        setLocation(results[0])
      } catch (error) {
        console.error(error)
      }
    }

    fetchLocation()
  }, [name])

  return (
    <View>
      {Location && (
        <View>
          <Text>Name: {Location.name}</Text>
          <Text>Type: {Location.type}</Text>
          <Text>Dimension: {Location.dimension}</Text>
          <button>
            Residents
          </button>

        </View>
      )}
    </View>
  )
}

export default LocationDetailScreen
