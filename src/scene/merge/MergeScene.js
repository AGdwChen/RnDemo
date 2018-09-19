/**
 * Copyright (c) 2017-present
 * All rights reserved.
 *
 * @flow
 */

import React, {PureComponent} from 'react'
import {StyleSheet, View, ActivityIndicator} from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'

import {color} from '../../widget'

import MergeListScene from './MergeListScene'
import api from "../../api";
import screen from "../../common/screen";
import {NavTitle} from '../../widget/Text'

type Props = {
    navigation: any,
}

type State = {
    years: Array<Object>,
    hidden: true,
}

class MergeScene extends PureComponent<Props> {

    static navigationOptions = ({navigation}: any) => ({
        headerTitle: (<NavTitle>国家人文历史</NavTitle>),
        headerStyle: {backgroundColor: color.primary},

    })

    constructor(props: Object) {
        super(props)

        this.state = {
            years: [],
            hidden: true,
        }
    }

    componentDidMount() {
        this.requestData();
    }

    requestData = async () => {

        let response = await fetch(api.selectYear)
        let json = await response.json()

        console.log(json.data.resultData);

        let dataList = json.data.resultData;
        this.setState({years: dataList, hidden: false})
    }

    render() {

        if (this.state.hidden) {
            return this._renderLoadingView();
        }

        return (
            <ScrollableTabView
                style={styles.container}
                tabBarBackgroundColor='white'
                tabBarActiveTextColor='#FE566D'
                tabBarInactiveTextColor='#555555'
                tabBarTextStyle={styles.tabBarText}
                tabBarUnderlineStyle={styles.tabBarUnderline}
            >
                {this.state.years.map((year, i) => (
                    <MergeListScene
                        tabLabel={this.state.years[i]}
                        year={this.state.years[i]}
                        key={i}
                        navigation={this.props.navigation}/>
                ))}
            </ScrollableTabView>
        )
    }

    _renderLoadingView() {
        return (
            <View style={styles.loading}>
                <ActivityIndicator
                    size='large'
                    color='#6435c9'
                />
            </View>
        );
    };

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.paper
    },
    tabBarText: {
        fontSize: 14,
        marginTop: 13,
    },
    tabBarUnderline: {
        backgroundColor: '#fff'
    },
    loading:{
        width:screen.width,
        height:screen.height,
        justifyContent:'center',
        alignItems:'center',
    },
})


export default MergeScene
