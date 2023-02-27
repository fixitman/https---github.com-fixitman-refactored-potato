import { useContext, useEffect, useState } from "react"
import { UserContext } from '../UserContext'
import { Typography, useTheme, Button } from '@mui/material'
import FormDialog from '../components/formDialog'
import axios from 'axios'


const HiPage = () => {

  const { user } = useContext(UserContext)
  const [lists, setLists] = useState([])
  let username = ''
  if (user) { username = user.username; }

  const theme = useTheme()

  useEffect(() => {
    async function getData() {
      await axios.get('list')
        .then((result) => {
          let titles = result.data.map((list) => { return list.title })
          setLists(titles)
          console.log(JSON.stringify(titles, null, 2))
        })
    }
    getData()
  }, [])

  const createNewList = async (title) => {
    await axios.post('list/create', { title })
      .then((response) => {
        console.log('created', JSON.stringify(response.data, null, 2))
        setLists([...lists, response.data.title])
      })
      .catch((e) => {
        console.log('Error', e.message)
      })
  }

  return (
    <>
      <Typography variant="h2">HiPage</Typography>
      <Typography variant="p">Welcome, {username}</Typography>
      <Typography variant="p">{
        lists.map((l, index) => { return (<li key={index}>{l}</li>) })
      }      
      </Typography>

      <FormDialog callback={createNewList} />

    </>
  )
}

export default HiPage