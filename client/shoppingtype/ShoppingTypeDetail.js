import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import auth from '../auth/auth-helper'
import { read, apinewlistitem, apideletelistitem } from './api-shoppingtype'
import { Redirect } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Icon from '@material-ui/core/Icon'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'


const useStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3),
        },
        maxWidth: 400,
        margin: 'auto'
    }
    ,
    card: {
        maxWidth: 350,
        margin: 'auto',
        textAlign: 'center',
        marginTop: theme.spacing(1),
        paddingBottom: theme.spacing(2)
    },
    error: {
        verticalAlign: 'middle'
    },
    title: {
        marginTop: theme.spacing(2),
        color: theme.palette.openTitle
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 300
    },
    submit: {
        margin: 'auto',
        marginBottom: theme.spacing(1)
    }
}))

export default function ShopperTypeDetail({ match }) {
    const classes = useStyles()
    const [shoppertypedetail, setShopperTypeDetail] = useState({
        user_id: String,
        shoppinglisttype: String,
        items: [{
            itemname: String,
            created: { type: Date }
        }],
    })
    const [redirectToSignin, setRedirectToSignin] = useState(false)
    const jwt = auth.isAuthenticated()
    const [itemname, setValues] = useState("")

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        read({
            shoppertypeId: match.params.shoppertypeId
        }, signal).then((data) => {
            if (data && data.error) {
                console.log(data.error)
            } else {
                setShopperTypeDetail(data)
            }
        })

        return function cleanup() {
            abortController.abort()
        }

    }, [match.params.shoppertypeId])


    if (redirectToSignin) {
        return <Redirect to='/signin' />
    }

    const handleChange = event => {
        setValues(event.target.value)
    };

    const clickSubmit = (event) => {

        apinewlistitem(shoppertypedetail,
            itemname).then((data) => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    // shoppertypedetail.items = [];
                    console.log("After Add")
                    console.log(data)
                    setShopperTypeDetail(data)
                    //setShopperTypeDetail(shoppertypedetail.items.push(itemname));
                }
            })

        setValues("");

    }

    const clickDelete = (shoppertypeId, id) => {
        apideletelistitem({
            shoppertypeId: shoppertypeId,
            itemId: id
        }
        ).then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                setShopperTypeDetail(data)
            }
        })


    }

    return (
        <Paper className={classes.root} elevation={4}>
            <Typography variant="h6" className={classes.title}>
                {shoppertypedetail.shoppinglisttype}

            </Typography>


            <div>

                <List dense>
                    {shoppertypedetail.items.map((item, i) => {
                        return (
                            <ListItem >
                                <input
                                    type="checkbox"
                                    name="checkbox"
                                    value={item._id}
                                    key={item._id}
                                    onChange={() => clickDelete(shoppertypedetail._id, item._id)}
                                ></input>
                                <ListItemText primary={(i + 1) + ": " + item.itemname} />
                            </ListItem>
                        )
                    })
                    }
                </List>
            </div>
            <Divider />
            <div>
                <Card className={classes.card}>
                    <CardContent>
                        <TextField
                            id="New Item"
                            label="New Item"
                            className={classes.textField}
                            value={itemname}
                            onChange={handleChange}
                            margin="normal"
                        />
                        {
                            itemname.error && (<Typography component="p" color="error">
                                <Icon color="error" className={classes.error}>error</Icon>
                                {itemname.error}</Typography>)
                        }
                    </CardContent>
                    <CardActions>
                        <Button color="primary"
                            variant="contained"
                            onClick={clickSubmit}
                            className={classes.submit}
                        >Add
                        </Button>
                    </CardActions>
                </Card>

            </div>
        </Paper>
    )
}