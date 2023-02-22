import { useContext, useEffect } from "react"
import { UserContext } from '../UserContext'
import { Typography, useTheme, Button } from '@mui/material'
import axios from 'axios'


const HiPage = () => {

  const { user } = useContext(UserContext)
  let username = ''
  if (user) { username = user.username; }

  const theme = useTheme()

  useEffect( () => {
    async function getData() {
      await axios.get('list')
      .then((result)=>{
        console.log(JSON.stringify(result.data,null,2))
      })
    }
    getData()
  },[])

  const createNewList = async (event) => {
    await axios.post('list/create')
      .then(() => {
        console.log('created')
      })
      .catch((e) => {
        console.log('Error', e.message)
      })
  }

  return (
    <>
      <Typography variant="h2">HiPage</Typography>
      <Typography variant="p">Welcome, {username}</Typography>
      <Button variant="outlined" onClick={createNewList}>create a list</Button>

    </>
  )
}

export default HiPage