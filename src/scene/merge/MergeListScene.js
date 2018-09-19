/**
 * Copyright (c) 2017-present
 * All rights reserved.
 *
 * @flow
 */


import React, {PureComponent} from 'react'
import {View, ScrollView, StyleSheet, ActivityIndicator} from 'react-native'
import {RefreshState} from 'react-native-refresh-list-view'
import api from "../../api";
import {urlByAppendingParams} from "../../common/tool";
import screen from "../../common/screen";
import {color} from "../../widget";

import MergeListCell from './MergeListCell'

type Props = {
    navigation: any,
    year: string,
}

type State = {
    data: Array<Object>,
    refreshState: number,
}

class MergeListScene extends PureComponent<Props> {

    static navigationOptions = ({navigation}: any) => ({
        title: "详情",
        headerStyle: {backgroundColor: 'white'},
    })

    constructor(props: Object) {
        super(props)

        this.state = {
            data: [],
            refreshState: RefreshState.Idle,
        }
    }


    componentDidMount() {
        console.log("componentDidMount");

        try {
            this.requestData()
        }
        catch (e) {

        }
    }

    requestData = async () => {

        let requestParams = {}
        requestParams["year"] = this.props.year

        let url = urlByAppendingParams(api.magazineList, requestParams)
        console.log(url);

        let response = await fetch(url)
        let json = await response.json()

        // console.log(json.data);

        let dataList = json.data
        console.log("requestData", dataList);

        this.setState({
            data: dataList
        })
    }

    render() {
        if (this.state.data.length == 0) {
            return this._renderLoadingView()
        }
        console.log("render", this.state.data);

        return (
            <ScrollView style={styles.mainStyle} removeClippedSubviews={true}>
                <View style={styles.boxStyle}>
                    {this.state.data.map((item, i) => (
                        <MergeListCell style={styles.itemStyle}
                                       info={item}
                                       key={i}
                                       onPress={() => {
                                           this.props.navigation.navigate('CourseInfo', {info: item})
                                       }}
                        />
                    ))}
                </View>

            </ScrollView>
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
    boxStyle: {
        flex: 1,
        flexDirection:"row",
        // justifyContent: "space-between",
        flexWrap:"wrap",
    },

    mainStyle: {
        backgroundColor: color.paper,
        flex: 1,
    },
    loading: {
        width: screen.width,
        height: screen.height - 300,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    },
})


export default MergeListScene
