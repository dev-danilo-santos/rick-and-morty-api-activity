import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, FlatList, Button, } from 'react-native'
import { getEpisode } from '../../component/api/rick-and-morty'
import ThemeContext from '../../context/context'
import ThemeToogler from '../../component/themeToogler'
import AppTheme from '../../component/api/rick-and-morty/themes'
import { useContext } from 'react'

const EpisodeScreen = ({navigation, route}) => {
  const urls = route.params.episodes
  const epMap = urls.map((url) => parseInt(url.split("/").pop()))
  
  const [episode, setEpisode] = useState({});
  const [characters, setCharacters] = useState([])
  const [episodeName, setEpisodeName] = useState('')
  const theme = useContext(ThemeContext)[0];

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

  function findEp(id) {
    const numPropriedades = Object.keys(episode).length;
    let type;
    if (numPropriedades == "1") {
      type = [0]
    } else {
      type = [id]
    }
    const currentEpisode = episode[type];
    setEpisodeName(`Personagens do Episódio: ${currentEpisode.name} - ${currentEpisode.episode}`);
    if (currentEpisode) {
      const allChars = currentEpisode.characters;
      const charMap = allChars.map((url) => parseInt(url.split("/").pop()))
      setCharacters(charMap)
    }
  }
  
  useEffect(() => {
    if (characters.length > 0) {
      navigation.navigate('CharsEffect', { characters: characters, episodeName:episodeName })
    }
  }, [characters])
  

  return (
    <View style={[styles.mainView,AppTheme[theme+"Container"]]}>
      <ThemeToogler/>
        <FlatList
        style={[styles.marginVertical,AppTheme[theme+"Container"]]}
        data={Object.values(episode)}
        renderItem={({ item: { name, air_date, episode, id } }) => {
          return (
            <View style={styles.characterContainer}>
              <View style={styles.charInfo}>
                <Text style={[styles.title,AppTheme[theme]]}>{name}</Text>
                <Text style={AppTheme[theme]}>{air_date}</Text>
                <Text style={AppTheme[theme]}>{episode}</Text>
                <View style={styles.areaBut}>
                    <Text onPress={() => findEp(id)} style={styles.fakeButton}>Personagens</Text>
                </View>
              </View>
              
            </View>
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
      height: '100%'
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
    marginVertical: {
      marginVertical: 5
    },
    charInfo: {
      width:'100%',
      gap: '5px',
      borderWidth: 2,
      borderColor: '#CCCCCC',
      padding: '5px'
    },
    charInfo: {
      width:'100%',
      gap: '5px',
      borderRadius: "8px",
      borderWidth: 2,
      borderColor: '#CCCCCC',
      padding: '5px',
    },
    areaBut:{
      height: "50px",
      alignItems: "center",
      justifyContent: "center",
    },
    fakeButton:{
      width: "80%",
      height: '100%',
      backgroundColor: "#fcfe8c",
      display: 'flex',
      alignItems: "center",
      justifyContent: 'center',
      color: "#985a2c",
      fontWeight: 900,
      fontSize: "20px",
      borderRadius: "10px",
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 3,
      borderWidth: "1px",
      borderColor: "#cecece",
      borderStyle: "solid"
    },
    title:{
      textAlign: 'center',
      fontSize: "17px",
    }
})
export default EpisodeScreen
