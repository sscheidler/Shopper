import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { listbyuser, apideleteshoppingtype } from './api-shoppingtype'
import { Link } from 'react-router-dom'
import auth from './../auth/auth-helper'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import ArrowForward from '@material-ui/icons/ArrowForward'
//import DeleteShoppingType from './DeleteShoppingType'
import DeleteIcon from '@material-ui/icons/Delete'


const useStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3),
        },
        maxWidth: 600,
        margin: 'auto'
    },
    title: {
        margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
        color: theme.palette.openTitle
    }
}))


export default function ShoppingTypesByUser(match) {
    const classes = useStyles()
    const [shoppingTypes, setshoppingTypes] = useState([])
    let user_id = auth.isAuthenticated() ? auth.isAuthenticated().user._id : null
    // console.log(user_id)

    //console.log(match)

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        listbyuser({
            userId: user_id
        }, signal).then((data) => {
            if (data && data.error) {
                console.log(data.error)
            } else {
                setshoppingTypes(data)
            }
        })


        return function cleanup() {
            abortController.abort()
        }
    }, [])

    const deleteShoppingType = (shoppingTypeId) => {
        apideleteshoppingtype({
            userId: user_id,
            shoppingTypeId: shoppingTypeId
        }).then((data) => {
            if (data && data.error) {
                console.log(data.error)
            } else {
                console.log('deleted')
                // setRedirect(true)
                // setOpen(false)
                setshoppingTypes([])

                listbyuser({
                    userId: user_id
                }).then((data) => {
                    if (data && data.error) {
                        console.log(data.error)
                    } else {
                        setshoppingTypes(data)
                    }
                })


            }
        })





    }

    //console.log(shoppingTypes);

    return (<div>

        <Paper className={classes.root} elevation={4}>
            <Typography variant="h6" className={classes.title}>
                All Shopping Lists
            </Typography>
            <List dense>
                {shoppingTypes.map((item, i) => {
                    return <> <ListItem key={item._id}>
                        <IconButton
                            edge="start"
                            aria-label="Delete"
                            onClick={() => deleteShoppingType(item._id)}
                            color="secondary"
                        //userId={user_id}
                        //shoppingTypeId={item._id}
                        >
                            <DeleteIcon />
                        </IconButton>
                        {/* <DeleteShoppingType
                            userId={user_id}
                            shoppingTypeId={item._id}


                        /> */}
                        <Link to={"/shoppertype/" + item._id} >
                            <ListItemText primary={item.shoppinglisttype} />
                            <ListItemSecondaryAction>
                                <IconButton>
                                    <ArrowForward />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </Link>
                    </ListItem>
                    </>

                })
                }
            </List>
        </Paper>
    </div>
    )
}