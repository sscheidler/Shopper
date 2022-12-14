import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import unicornbikeImg from './../assets/images/Billiards.jpg'
import auth from './../auth/auth-helper'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5)
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle
  },
  media: {
    width: 200,
    height: 200,
    margin: "auto"
  },
  credit: {
    padding: 10,
    textAlign: 'right',
    backgroundColor: '#ededed',
    borderBottom: '1px solid #d0d0d0',
    '& a': {
      color: '#3f4771'
    }
  }
}))

export default function Home() {
  const classes = useStyles()
  return (
    <Card className={classes.card}>
      <Typography variant="h6" className={classes.title}>
        Home Page {auth.isAuthenticated() ? auth.isAuthenticated().user._id : null}
      </Typography>
      <CardMedia className={classes.media} image={unicornbikeImg} title="Unicorn Bicycle" />

      <CardContent>
        <Typography variant="body1" component="p">
          Welcome to the Shopper home page.
        </Typography>
      </CardContent>
    </Card>
  )
}

