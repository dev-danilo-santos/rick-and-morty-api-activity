import React, { useEffect, useState } from 'react'
import { StyleSheet, Button, View, Image, Text, FlatList, TextInput } from 'react-native'
import { getCharacter, getCharacterId, getNextCharacterPage } from '../../component/api/rick-and-morty'
import CharacterDetailScreen from './../character-detail/index';

const CharsEffectScreen = ({navigation , route}) => {
  const [fetchResult, setFetchResult] = useState({ pageInfo: {}, characters: [] })
  const [nameSearch, setNameSearch] = useState('')
  // const [idPerson, setIdPerson] = route ? route.params : useState('')
  const [personagens, setPersonagens] = useState({chars: ''});

  async function fetchNameData() {
    try {
      const { data: { info, results } } = await getCharacter({ name: nameSearch })
      setFetchResult(prevState => ({ ...prevState, pageInfo: info, characters: results }))

    } catch (error) {
      setFetchResult({ pageInfo: {}, characters: [] })
    }
  }

  async function fetchIdData() {
    try {

        const response = await getCharacterId({ ids: personagens.chars })
        setFetchResult(prevState => ({ ...prevState, pageInfo: '', characters: response.data }))

    } catch (error) {
      console.log(error)
      setFetchResult({ pageInfo: {}, characters: [] })
    }
  }

  function fetchCharacterDetails(name) {
    navigation.navigate('CharacterDetail', {name})
  }

  useEffect(() => {
    if ((route.params && route.params.characters && route.params.characters.length > 0)) {
      setPersonagens({ chars: route.params.characters });
    }
  }, [route.params]);

  useEffect(() => {
    if(personagens.chars && personagens.chars != "" && personagens.chars.length > 0){
      fetchIdData(personagens.chars)
    }
  }, [personagens])

  useEffect(() => {
    fetchNameData(nameSearch)
  }, [nameSearch])

  return (
    <View style={styles.mainView}>
      <TextInput
        style={[styles.textInput, styles.marginVertical]}
        onChangeText={setNameSearch}
        placeholder='Pesquise algum personagem'
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
      {fetchResult.pageInfo?.next && (
        <Button
          title="Load More..."
          onPress={async () => {
            const currentResults = fetchResult.characters
            const { data: { info, results } } = await getNextCharacterPage(fetchResult.pageInfo.next)
            setFetchResult({ pageInfo: info, characters: [...currentResults, ...results] })
          }}
        />
      )}
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
    padding: 5,
    borderRadius: "6px",
    borderColor: "darkgreen",
  },
  marginVertical: {
    marginVertical: 5
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