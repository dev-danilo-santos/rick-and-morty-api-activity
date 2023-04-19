import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { getCharacter } from '../../component/api/rick-and-morty'

const CharacterDetailScreen = ({navigation,route }) => {
  const { name } = route.params
  const [character, setCharacter] = useState(null)
  const [modalVisible, setModalVisible] = useState(true);

  function fetchLocationDetails(name) {
    navigation.navigate('LocationDetail',{name})
  }
  
  function fetchEpisodes(episodes) {
    navigation.navigate('EpisodeDetail', {episodes})
  }
  
  function styleReturn(status){
    if(status == "Alive") return styles.charStatusAlive
    else if (status == "Dead") return styles.charStatusDead
    else return styles.charStatusUnknown
  }

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
  
  return (
    <View>
      {character && (
        <View style={styles.charInfo}>
          <View style={styles.charBox}>
            <Image style={styles.charImg} source={{ uri: character.image }} />
            <Text style={styleReturn(character.status)}>Status: {character.status}</Text>
          </View>
          <View style={styles.charFile}>
            <Text style={styles.charInfos}>Name: {character.name}</Text>

            <Text style={styles.charInfos}>Species: {character.species}</Text>
            <Text style={styles.charInfos}>Type: { character.type ? character.type : "Unkdown" }</Text>
            <Text style={styles.charInfos}>Gender: {character.gender}</Text>

            <Text style={styles.charLocs} onPress={() => fetchLocationDetails(character.origin.name)}>Origin: {character.origin.name}</Text>
            <Text style={styles.charLocs} onPress={() => fetchLocationDetails(character.location.name)}>Location: {character.location.name}</Text>

          </View>
          <Text style={styles.openEp} onPress={() => fetchEpisodes(character.episode)}>Episodios</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  charInfo: {
    justifyContent: 'center',
    padding: "12px",
    alignItems: "center",
    gap: "5px"
  },
  charImg: {
    width: "200px",
    height: "200px",
    borderRadius: "10px",
    borderWidth: "1px",
    borderColor: "#cecece",
    borderStyle: "solid"
  },
  charBox: {
    position: 'relative',
  },
  charStatusAlive:{
    position: "absolute",
    right: "10px",
    top: "10px",
    padding: "5px",
    backgroundColor: "darkgreen",
    color: "white",
    fontWeight: 900,
    borderRadius: "10px"
  },
  charStatusDead:{
    position: "absolute",
    right: "10px",
    top: "10px",
    padding: "5px",
    backgroundColor: "red",
    color: "white",
    fontWeight: 900,
    borderRadius: "10px"
  },
    charStatusUnknown:{
    position: "absolute",
    right: "10px",
    top: "10px",
    padding: "5px",
    backgroundColor: "gray",
    color: "white",
    fontWeight: 900,
    borderRadius: "10px"
  },
  openEp: {
    width: "80%",
    height: '60px',
    backgroundColor: "#fcfe8c",
    display: 'flex',
    alignItems: "center",
    justifyContent: 'center',
    color: "#985a2c",
    fontWeight: 900,
    fontSize: "20px",
    borderRadius: "10px",
    marginTop: "15px",
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderWidth: "1px",
    borderColor: "#cecece",
    borderStyle: "solid"

  },
  charFile:{
    width: '80%',
    height: 'auto',
    borderRadius: "10px",
    borderWidth: "3px",
    borderColor: "#cecece",
    borderStyle: "solid",
    padding: "10px",
    gap: "5px"
  },
  charLocs: {
    textAlign: "center",
    fontWeight: 700,
    backgroundColor: "#a0d4e7",
    borderRadius: "10px",
    marginTop: "15px",
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    width: "100%",
    height: '60px',
    padding: "10px",
    display: 'flex',
    alignItems: "center",
    justifyContent: 'center',
    borderWidth: "1px",
    borderColor: "#cecece",
    borderStyle: "solid"
  },
  charInfos: {
    textAlign: "center",
    fontWeight: 900
  }
})


export default CharacterDetailScreen
