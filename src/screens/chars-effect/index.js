import React, { useEffect, useState } from 'react'
import { StyleSheet, Button, View, Image, Text, FlatList, TextInput } from 'react-native'
import { getCharacter, getNextCharacterPage } from '../../component/api/rick-and-morty'
import CharacterDetailScreen from './../character-detail/index';
import { getCharacterId } from '../../component/api/rick-and-morty';

const CharsEffectScreen = ({navigation} ,props, route) => {
  const [fetchResult, setFetchResult] = useState({ pageInfo: {}, characters: [] })
  const [nameSearch, setNameSearch] = useState('')
  const [idPerson, setIdPerson] = route ? route.params : useState('')

  async function fetchData(nameOrIds = '', location = true) {
    try {
        
        const { data: { info, results } } = location? await getCharacterId ({ name: nameOrIds }) : await getCharacter({ name: nameOrIds })
     
      setFetchResult({ pageInfo: info, characters: results })
    } catch (error) {
      setFetchResult({ pageInfo: {}, characters: [] })
    }
  }

  function fetchCharacterDetails(name) {
    navigation.navigate('CharacterDetail', {name})
  }
  

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    fetchData(nameSearch)
  }, [nameSearch])

  return (
    <View style={styles.mainView}>
      <TextInput
        style={[styles.textInput, styles.marginVertical]}
        onChangeText={setNameSearch}
        value={nameSearch}
      />
      <FlatList
        style={styles.marginVertical}
        data={fetchResult.characters}
        keyExtractor={({ id }) => id}
        renderItem={({ item: { name, status, image, species } }) => {
          return (
            <Text onPress={() => fetchCharacterDetails(name)} style={styles.characterContainer}>
              
              <Image style={styles.characterImage} source={{ uri: image }} />
              <Text style={styles.absolute}>{status}</Text>
              <View style={styles.txtBox}>
                <Text><strong>{name}</strong></Text>
                <Text>{species}</Text>
              </View>
              
            </Text>
          )
        }}
      />
      <Button
        title="Load More..."
        disabled={!fetchResult.pageInfo.next}
        onPress={async () => {
          const currentResults = fetchResult.characters
          const { data: { info, results } } = await getNextCharacterPage(fetchResult.pageInfo.next)
          setFetchResult({ pageInfo: info, characters: [...currentResults, ...results] })
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
    flexDirection: 'column',
    alignItems: 'center',
    width: "204px",
    borderColor: "blue",
    borderWidth: "2px",
    borderStyle: 'solid',
    borderRadius: "10px",
    margin: "auto",
    marginBottom: "15px",
    position: 'relative',

  },
  characterImage: {
    width: 200,
    height: 200,
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px"
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

  },
  absolute: {
    position: "absolute",
    right: "10px",
    top: "10px",
    padding: "5px",
    backgroundColor: "darkgreen",
    color: "white",
    fontWeight: 900,
    borderRadius: "10px"
  },
  txtBox: {
    width: "100%",
    padding: "10px",
    gap: "5px"
  }
})

export default CharsEffectScreen