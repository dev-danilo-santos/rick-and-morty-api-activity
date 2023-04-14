import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, FlatList, } from 'react-native'
import { getEpisode } from '../../component/api/rick-and-morty'

const EpisodeScreen = ({navigation, route}) => {
  const urls = route.params.episodes
  const epMap = urls.map((url) => parseInt(url.split("/").pop()))
  
  const [episode, setEpisode] = useState({});
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const info = await getEpisode({ episode: epMap });
        const episodesData = {};
        if(info.data.length > 1){
          info.data.forEach((ep) => {
            episodesData[ep.id] = ep; // Cria uma propriedade para cada episódio, usando o id como chave
          });
        }else{
          episodesData[0] = info.data;
        }
        setEpisode(episodesData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEpisodes();
  }, []);


  function findEp(id){
    const numPropriedades = Object.keys(episode).length;
    let type;
    if(numPropriedades == "1"){
      type = [0]
    }else{
      type = [id]
    }
    const allChars = episode[type].characters;
    const charMap = allChars.map((url) => parseInt(url.split("/").pop()))
    fetchPersonagens(charMap)
  }

  function fetchPersonagens(ids) {
    setCharacters(ids)
    // navigation.navigate('CharsEffect', characters)
    console.log(characters)
  }

  useEffect(() => {
    fetchPersonagens()
  }, [episode])


  return (
    <View style={styles.mainView}>
        <FlatList
        style={styles.marginVertical}
        data={Object.values(episode)}
        renderItem={({ item: { name, air_date, episode, id } }) => {
          return (
            <Text style={styles.characterContainer}>
              
              <View >
                <Text>{name}</Text>
                <Text>{air_date}</Text>
                <Text>{episode}</Text>
                <Text>{id}</Text>
                {/* <Text onPress={() => fetchCharacter(characters[id])}>Personagens</Text> */}
                <Text onPress={() => findEp(id)}>Personagens</Text>
              </View>
              
            </Text>
          )
        }}
      />
    </View>
  )
}
const styles = StyleSheet.create({
    mainView: {
      justifyContent: 'center',
      padding: 10,
      backgroundColor: 'white',
    },
    characterContainer: {
      display:'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
      width: "100%",
      margin: 'auto',
    },
    characterImage: {
      width: 90,
      height: 90,
      marginRight: 10
    },
    textInput: {
      borderWidth: 1,
      borderColor: '#CCCCCC',
      height: 35,
      padding: 5
    },
    marginVertical: {
      marginVertical: 5
    },
    card: {
  
    }
})
export default EpisodeScreen
