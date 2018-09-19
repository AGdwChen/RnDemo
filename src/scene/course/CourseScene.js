/**
 * Copyright (c) 2017-present
 * All rights reserved.
 *
 * @flow
 */


import React, {PureComponent} from 'react'
import {StyleSheet} from 'react-native'
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'

import CourseSceneCell from './CourseSceneCell'
import {NavTitle} from '../../widget/Text'

import api from '../../api'
import { urlByAppendingParams } from '../../common/tool'
import {color} from "../../widget";

type Props = {
    types: Array<string>,
    navigation: any,
}

type State = {
    currentPage:number,
    data:Array<Object>,
    refreshState: number,
}

class CourseScene extends PureComponent<Props> {

    static navigationOptions = ({navigation}: any) => ({
        headerTitle: (<NavTitle>小课</NavTitle>),
        headerStyle: {backgroundColor: color.primary},
    })


    constructor(props: Object) {
        super(props)

        this.state = {
            currentPage:1,
            data: [],
            refreshState: RefreshState.Idle,
        }
    }

    componentDidMount() {
        this.requestFirstPage()
    }

    requestData = async () => {
        console.log("requestData");

        let requestParams = {}
        requestParams["pageNo"] = this.state.currentPage

        let url = urlByAppendingParams(api.xkList, requestParams)

        let response = await fetch(url)
        let json = await response.json()

        let ossPath = json.data.osspath;
        console.log(json.data.resultData);

        let dataList = json.data.resultData.map((info) => {

            return {
                id: info.id,
                imageUrl: ossPath+info.thumbBig,
                title: info.title,
                subtitle: `[${info.intro}]${info.title}`,
                price: info.price
            }
        })

        return dataList
    }

    requestFirstPage = async () => {
        console.log("requestFirstPage");

        try {

            this.setState({refreshState: RefreshState.HeaderRefreshing,
                currentPage:1})
            let dataList = await this.requestData()

            console.log(dataList);

            this.setState({
                data: dataList,
                refreshState: dataList.length < 10 ? RefreshState.Idle : RefreshState.NoMoreData,
            })
        } catch (error) {

            this.setState({
                refreshState: RefreshState.Failure,
            })
        }
    }

    requestNextPage = async () => {
        console.log("requestNextPage");
        if (this.state.refreshState != RefreshState.idle)
        {
            return;
        }

        try {
            let page = this.state.currentPage + 1;
            this.setState(
                {
                    refreshState: RefreshState.FooterRefreshing,
                    currentPage:page
                })
            let dataList = await this.requestData()

            this.setState({
                data: [...this.state.data, ...dataList],
                refreshState: dataList.length < 10 ? RefreshState.Idle : RefreshState.NoMoreData,
            })
        } catch (error) {
            this.setState({
                refreshState: RefreshState.Failure,
            })
        }
    }

    keyExtractor = (item: Object, index: number) => {
        return index.toString()
    }


    renderCell = (rowData: any) => {
        return (
            <CourseSceneCell
                info={rowData.item}
                onPress={() => {
                    console.info(rowData.item)
                    this.props.navigation.navigate('CourseInfo', {courseInfo: rowData.item})
                }}
            />
        )
    }

    render() {
        return (
            <RefreshListView
                data={this.state.data}
                renderItem={this.renderCell}
                keyExtractor={(item, index) => index.toString()}
                refreshState={this.state.refreshState}
                onHeaderRefresh={this.requestFirstPage}
                onFooterRefresh={this.requestNextPage}
            />
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})


export default CourseScene
