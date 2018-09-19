/**
 * Copyright (c) 2017-present
 * All rights reserved.
 *
 * @flow
 */


import React, {PureComponent} from 'react'
import {StatusBar} from 'react-native'
import {StackNavigator, TabNavigator, TabBarBottom} from 'react-navigation'

import color from './widget/color'
import TabBarItem from './widget/TabBarItem'

import HomeScene from './scene/home/HomeScene'
import MergeScene from './scene/merge/MergeScene'
import CourseScene from './scene/course/CourseScene'
import MineScene from './scene/mine/MineScene'

import WebScene from './widget/WebScene'
import CourseDetail from "./scene/course/CourseDetail"

const lightContentScenes = ['Home', 'Merge','Course', 'Mine']

function getCurrentRouteName(navigationState: any) {
    if (!navigationState) {
        return null
    }
    const route = navigationState.routes[navigationState.index]
    // dive into nested navigators
    if (route.routes) {
        return getCurrentRouteName(route)
    }
    return route.routeName
}


class RootScene extends PureComponent<{}> {
    constructor() {
        super()

        StatusBar.setBarStyle('light-content')
    }

    render() {
        return (
            <Navigator
                onNavigationStateChange={
                    (prevState, currentState) => {
                        const currentScene = getCurrentRouteName(currentState)
                        const previousScene = getCurrentRouteName(prevState)
                        if (previousScene !== currentScene) {
                            if (lightContentScenes.indexOf(currentScene) >= 0) {
                                StatusBar.setBarStyle('light-content')
                            } else {
                                StatusBar.setBarStyle('dark-content')
                            }
                        }
                    }
                }
            />
        )
    }
}

const Tab = TabNavigator(
    {
        Home: {
            screen: HomeScene,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: '首页',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./img/index/index.png')}
                        selectedImage={require('./img/index/index_active.png')}
                    />
                )
            }),
        },
        Merge: {
            screen: MergeScene,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: '杂志',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./img/index/magazine.png')}
                        selectedImage={require('./img/index/magazine_active.png')}
                    />
                )
            }),
        },

        Course: {
            screen: CourseScene,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: '小课',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./img/index/smallClass.png')}
                        selectedImage={require('./img/index/smallClass_active.png')}
                    />
                )
            }),
        },

        Mine: {
            screen: MineScene,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: '我的',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./img/index/mine.png')}
                        selectedImage={require('./img/index/mine_active.png')}
                    />
                )
            }),
        },
    },
    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        lazy: true,
        animationEnabled: false,
        swipeEnabled: false,
        tabBarOptions: {
            activeTintColor: color.priceRed,
            inactiveTintColor: color.gray,
            style: {backgroundColor: '#ffffff'},
        },
    }

)

const Navigator = StackNavigator(
    {
        Tab: {screen: Tab},
        Web: {screen: WebScene},
        CourseInfo:{screen:CourseDetail},
    },
    {
        navigationOptions: {
            // headerStyle: {
            //     backgroundColor: color.primary,
            //     elevation: 0,
            //     borderBottomWidth: 0,
            // },
            headerBackTitle: null,
            headerTintColor: '#000000',
            showIcon: true,
        },
    }
)

export default RootScene
