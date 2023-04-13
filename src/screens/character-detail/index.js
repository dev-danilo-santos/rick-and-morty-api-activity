import React, { useEffect, useState } from 'react'
import { View, Text, Image } from 'react-native'
import { getCharacter } from '../../component/api/rick-and-morty'

const CharacterDetailScreen = ({navigation,route }) => {
  const { name } = route.params
  const [character, setCharacter] = useState(null)

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const { data: { results } } = await getCharacter({ name })
        setCharacter(results[0])
      } catch (error) {
        console.error(error)
      }
    }

    fetchCharacter()
  }, [])

  function fetchLocationDetails(name) {
    navigation.navigate('LocationDetail',{name})
  }

  function fetchEpisodes(episodes) {
    navigation.navigate('EpisodeDetail', {episodes})
  }
  
  return (
    <View>
      {character && (
        <View>
          <Image style={{ width: 200, height: 200 }} source={{ uri: character.image }} />
          <Text>Name: {character.name}</Text>
          <Text>Status: {character.status}</Text>
          <Text>Species: {character.species}</Text>
          <Text>Type: { character.type ? character.type : "Unkdown" }</Text>
          <Text>Gender: {character.gender}</Text>
          <Text onPress={() => fetchLocationDetails(character.origin.name)}>Origin: {character.origin.name}</Text>
          <Text onPress={() => fetchLocationDetails(character.location.name)}>Location: {character.location.name}</Text>
          <Text onPress={() => fetchEpisodes(character.episode)}>Episodios</Text>
        </View>
      )}
    </View>
  )
}

export default CharacterDetailScreen
