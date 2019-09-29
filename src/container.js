import React from 'react'
import {createSwitchNavigator,createAppContainer } from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs'

import AuthHandler from './screens/AuthHandler'
import Home from './screens/Home'
import Chat from './screens/Chat'


const MainNavigator=createSwitchNavigator({
    auth:createStackNavigator({
        AuthHandler:AuthHandler

    },{headerMode:'none'}),
    mainFlow:createBottomTabNavigator({
        Chat,Home
    })
})

const m=createAppContainer(MainNavigator)

export default m