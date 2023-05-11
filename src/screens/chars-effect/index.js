import React, { useEffect, useState } from 'react'
import { StyleSheet, Button, View, Image, Text, FlatList, TextInput } from 'react-native'
import { getCharacter, getCharacterId, getNextCharacterPage } from '../../component/api/rick-and-morty'
import ThemeContext from '../../context/context'
import AppTheme from '../../component/api/rick-and-morty/themes'
import { useContext } from 'react'
import ThemeToogler from '../../component/themeToogler'

const CharsEffectScreen = ({navigation , route}) => {
  const [fetchResult, setFetchResult] = useState({ pageInfo: {}, characters: [] })
  const [nameSearch, setNameSearch] = useState('')
  const { locationName, episodeName } = route.params || {}
  const [personagens, setPersonagens] = useState({chars: ''});
  const theme = useContext(ThemeContext)[0];
  


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

  function styleColor(status){
    if(status == "Alive") return styles.green
    else if (status == "Dead") return styles.red
    else return styles.gray
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
    <View style={[styles.mainView,AppTheme[theme+"Container"]]}>
      <ThemeToogler/>
      <TextInput
        style={[styles.textInput, styles.marginVertical]}
        onChangeText={setNameSearch}
        placeholder='Pesquise algum personagem'
        value={nameSearch}
      />
       {episodeName && <Text style={styles.title}>{episodeName}</Text>}
       {location && <Text style={styles.title}>{locationName}</Text>}
      <FlatList
        style={styles.marginVertical}
        data={fetchResult.characters}
        keyExtractor={({ id }) => id}
        renderItem={({ item: { name, status, image, species } }) => {
          return (
            <Text onPress={() => fetchCharacterDetails(name)} style={styles.characterContainer}>
              
              <Image style={styles.characterImage} source={{ uri: image }} />
              <Text style={[styles.absolute,styleColor(status)]}>{status}</Text>
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
  },
  title: {
    display: 'flex',
    justifyContent:'center',
    fontSize: 18,
    textAlign: 'center'
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
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px"
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
    color: "white",
    fontWeight: 900,
    borderRadius: "10px"
  },
  green: {
    backgroundColor: "darkgreen",
  },
  gray: {
    backgroundColor: "gray",
  },
  red: {
    backgroundColor: "red",
  },
  txtBox: {
    width: "100%",
    padding: "10px",
    gap: "5px"
  }
})

export default CharsEffectScreen