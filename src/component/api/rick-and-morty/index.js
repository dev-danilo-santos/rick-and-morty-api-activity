import axios from 'axios'

const baseURL = 'https://rickandmortyapi.com/api/'

const client = axios.create({
  baseURL: baseURL,
  timeout: 5000
})

const getNextCharacterPage = async (url) => {
  return await client.get(url)
}

const getCharacter = async ({ name = '' }) => {
  const uri = encodeURI(`character/?name=${name}`)
  return await client.get(uri)
}
const getCharacterId = async ({ ids = [] }) => {
  const uri = encodeURI(`character/${ids}`)
  return await client.get(uri)
}

const getEpisode = async ( {episode} ) => {
  const uri = encodeURI(`episode/${episode}`)
  return await client.get(uri)
}

const getLocation = async ({ name = ''}) => {
  const uri = encodeURI(`location/?name=${name}`)
  return await client.get(uri)
}



export { getCharacter, getNextCharacterPage, getLocation, getCharacterId, getEpisode }