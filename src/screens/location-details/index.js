import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text} from 'react-native'
import { getLocation } from '../../component/api/rick-and-morty'

const LocationDetailScreen = ({ navigation,route }) => {
  const { name } = route.params
  const [location, setLocation] = useState({})

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
    <View style={styles.View}>
      {location && (
        <View style={styles.mainView}>
          <Text>Name: {location.name}</Text>
          <Text>Type: {location.type}</Text>
          <Text>Dimension: {location.dimension}</Text>
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
  },
  mainView: {
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
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
