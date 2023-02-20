import { useContext } from "react"
import { UserContext } from '../UserContext'
import { Typography, useTheme} from '@mui/material'


const HiPage = () => {

  const {  user } = useContext(UserContext)
  let username = ''
  if (user) { username = user.username; }
  
  const theme = useTheme()
  
  return (
    <>
      <Typography variant="h2">HiPage</Typography>
      <Typography variant="p">{theme.palette.mode}</Typography>

    </>
  )
}

export default HiPage