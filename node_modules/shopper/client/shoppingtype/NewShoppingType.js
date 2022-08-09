import React, { useState } from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import { create } from './api-shoppingtype'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Redirect } from 'react-router-dom';
import auth from './../auth/auth-helper'


const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        textAlign: 'center',
        marginTop: theme.spacing(5),
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
        marginBottom: theme.spacing(2)
    }
}))


export default function NewShoppingType() {
    const classes = useStyles()
    const [open, setOpen] = useState(false);
    const [redirect, setRedirect] = useState(false)
    const [newShoppingType, setNewValues] = useState("")
    const [values, setValues] = useState({
        user_id: '',
        shoppinglisttype: ''
    })
    let userid = auth.isAuthenticated() ? auth.isAuthenticated().user._id : null

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    };

    const handleClose = () => {
        setOpen(false);

    };

    const clickSubmit = () => {
        let ShoppingType = {
            user_id: userid,
            shoppinglisttype: values.shoppinglisttype || undefined


        }

        setValues(ShoppingType);
        //console.log(ShoppingType);

        create(ShoppingType).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setNewValues(data)
                console.log(data)
                setRedirect(true)
            }
        })
        ShoppingType = {
            user_id: '',
            shoppinglisttype: ''


        }
        setValues(ShoppingType);
        values.shoppinglisttype = '';


    }

    if (redirect) {
        console.log(newShoppingType)
        return <Redirect to={'/shoppertype/' + newShoppingType} />
    }

    return (<div>
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h6" className={classes.title}>
                    Create New Shopping List
                </Typography>
                <TextField
                    id="Shopping List Name"
                    label="Shopping List Name"
                    className={classes.textField}
                    value={values.shoppinglisttype}
                    onChange={handleChange('shoppinglisttype')}
                    margin="normal"
                />
                <br />

                <br /> {
                    values.error && (<Typography component="p" color="error">
                        <Icon color="error" className={classes.error}>error</Icon>
                        {values.error}</Typography>)
                }
            </CardContent>
            <CardActions>
                <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Submit</Button>
            </CardActions>
        </Card>
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>New ShoppingList</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    New ShoppingList successfully created.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} autofocus>Close</Button>
            </DialogActions>
        </Dialog>

    </div>
    )
}