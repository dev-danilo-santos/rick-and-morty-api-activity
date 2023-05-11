import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text} from 'react-native'
import { getLocation } from '../../component/api/rick-and-morty'
import ThemeContext from '../../context/context'
import ThemeToogler from '../../component/themeToogler'
import AppTheme from '../../component/api/rick-and-morty/themes'
import { useContext } from 'react'

const LocationDetailScreen = ({ navigation,route }) => {
  const { name } = route.params
  const [location, setLocation] = useState({})
  const theme = useContext(ThemeContext)[0];

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

  function extractIds(residents) {
    const ids = [];
    residents.forEach((url) => {
      ids.push(url.split("/").pop());
    });
    return ids;
  }
  function handleClick(resident, location){
    const residentsIds = extractIds(resident)
    navigation.navigate("CharsEffect", {
    characters: residentsIds,
    locationName: `Personagens da localização:  ${"\n"} ${location}`,})
  }
  
  return (
    <View style={[styles.View,AppTheme[theme+"Container"]]}>
      <ThemeToogler/>
      {location && (
        <View style={[styles.mainView,AppTheme[theme+"Container"]]}>
          <Text style={AppTheme[theme]}>Name: {location.name}</Text>
          <Text style={AppTheme[theme]}>Type: {location.type}</Text>
          <Text style={AppTheme[theme]}>Dimension: {location.dimension}</Text>
          <View style={styles.areaBut}>
              <Text onPress={() => handleClick(location.residents, location.name)} style={styles.fakeButton}>Residents</Text>
          </View>


        </View>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  View:{
    padding: 10,
    height: '100%',
    marginTop: 20
  },
  mainView: {
    justifyContent: 'center',
    padding: 10,
    width:'100%',
    gap: '5px',
    borderWidth: 2,
    borderColor: '#CCCCCC',
    padding: '5px',
    borderRadius: "12px"
  },
  areaBut:{
    height: "50px",
    alignItems: "center",
    justifyContent: "center",
  },
  fakeButton:{
    width: "80%",
    height: '100%',
    backgroundColor: "#985a2c",
    display: 'flex',
    alignItems: "center",
    justifyContent: 'center',
    color: "#fcfe8c",
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
})
export default LocationDetailScreen
