import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './core/Home'
import Users from './user/Users'
import Signup from './user/Signup'
import Signin from './auth/Signin'
import EditProfile from './user/EditProfile'
import Profile from './user/Profile'
import PrivateRoute from './auth/PrivateRoute'
import Menu from './core/Menu'
import NewShoppingType from './shoppingtype/NewShoppingType'
import ShoppingTypesByUser from './shoppingtype/ShoppingTypesByUser'
import ShopperTypeDetail from './shoppingtype/ShoppingTypeDetail'


const MainRouter = () => {
  return (<div>
    <Menu />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/users" component={Users} />
      <Route path="/signup" component={Signup} />
      <Route path="/signin" component={Signin} />
      <Route path="/newshoppertypes" component={NewShoppingType} />
      <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
      <Route path="/user/:userId" component={Profile} />
      <Route path="/shoppertype/:shoppertypeId" component={ShopperTypeDetail} />
      <Route path="/shoppertypesbyuser/:userId" component={ShoppingTypesByUser} />

    </Switch>
  </div>)
}

export default MainRouter
