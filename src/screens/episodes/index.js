import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, FlatList, } from 'react-native'
import { getEpisode } from '../../component/api/rick-and-morty'

const EpisodeScreen = (props) => {
  const urls = props.route.params.episodes
  const epMap = urls.map((url) => parseInt(url.split("/").pop()))

  const [episode, setEpisode] = useState({allEpisodes: []})

  console.log(epMap)

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
          const info = await getEpisode( {episode: epMap} )
        setEpisode({allEpisodes: info.data})
      } catch (error) {
        console.error(error)
      }
    }

    fetchEpisodes()
  }, [])

  return (
    <View>
        <FlatList
        style={styles.marginVertical}
        data={episode.allEpisodes}
        renderItem={({ item: { name, air_date, episode } }) => {
          return (
            <Text style={styles.characterContainer}>
              
              <View >
                <Text>{name}</Text>
                <Text>{air_date}</Text>
                <Text>{episode}</Text>
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
      width: "50%",
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
