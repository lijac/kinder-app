import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Button } from "native-base";
import * as Screens from "./src/screens";

const RootStack = createStackNavigator(
    {
        _splash: {
            screen: Screens.Splash,
            navigationOptions: ({ navigation }) => ({
                title: ``,
                headerVisible: false,
                header: null
            })
        },
        _home: {
            screen: Screens.Home,
            navigationOptions: ({ navigation }) => ({
                title: `Home`,
                header: null
            })
        },
        _login: {
            screen: Screens.Login,
            navigationOptions: ({ navigation }) => ({
                title: `Login`,
                headerLeft: null
            })
        },
        _register: {
            screen: Screens.Register,
            navigationOptions: ({ navigation }) => ({
                title: `Register`,
            })
        },
        _dashboard: {
            screen: Screens.Dashboard,
            navigationOptions: ({ navigation }) => ({
                title: `Dashboard`,
                headerLeft: null
            })

        },
        _profile: {
            screen: Screens.Profile,
            navigationOptions: ({ navigation }) => ({
                title: `Profile`,
            })
        },
        _houseDetail: {
            screen: Screens.HouseDetail,
            navigationOptions: ({ navigation }) => ({
                title: `HouseDetail`,
            })
        },
        _filterResult: {
            screen: Screens.FilterResult
        },
        _resetpassword: {
            screen: Screens.ResetPassword,
            navigationOptions: ({ navigation }) => ({
                title: `Reset Password`,
            })
        },
        _addChild: {
            screen: Screens.AddChild,
            navigationOptions: ({ navigation }) => ({
                title: `Add my Child`,
            })
        },
        _editChild: {
            screen: Screens.EditChild,
            navigationOptions: ({ navigation }) => ({
                title: `Update my child info`,
            })
        },
        _findChild: {
            screen: Screens.FindChild,
            navigationOptions: ({ navigation }) => ({
                title: `Find Child`,
            })
        },
        _returnChild: {
            screen: Screens.ReturnChild,
            navigationOptions: ({ navigation }) => ({
                title: `Return Child`,
            })
        }
    },
    {
        initialRouteName: "_splash",
        navigationOptions: {
            gesturesEnabled: false
        },
        headerLayoutPreset: 'center'
    }
);
const App = createAppContainer(RootStack);

export default App;