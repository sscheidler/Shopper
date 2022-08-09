import React, { useState } from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { apideleteshoppingtype } from './api-shoppingtype.js'
import { Redirect } from 'react-router-dom';

export default function DeleteShoppingType(props) {
  const [open, setOpen] = useState(false)
  const [redirect, setRedirect] = useState(false)

  console.log(props);

  const clickButton = () => {
    setOpen(true)
  }
  const deleteShoppingType = () => {
    apideleteshoppingtype({
      userId: props.userId,
      shoppingTypeId: props.shoppingTypeId
    }).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        console.log('deleted')
        setRedirect(true)
        setOpen(false)

      }
    })
  }
  const handleRequestClose = () => {
    setOpen(false)
  }

  if (redirect) {
    console.log(props.userId)
    return <Redirect to={'/shoppertypesbyuser/' + props.userId} />
  }

  return (<span>
    <IconButton
      edge="start"
      aria-label="Delete"
      onClick={deleteShoppingType}
      color="secondary">
      <DeleteIcon />
    </IconButton>

    <Dialog open={open} onClose={handleRequestClose}>
      <DialogTitle>{"Delete Shopping List"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Confirm to delete your Shopping List.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleRequestClose} color="primary">
          Cancel
        </Button>
        <Button onClick={deleteShoppingType} color="secondary" autoFocus="autoFocus">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  </span>)

}
DeleteShoppingType.propTypes = {
  userId: PropTypes.string.isRequired,
  shoppingTypeId: PropTypes.string.isRequired
}

