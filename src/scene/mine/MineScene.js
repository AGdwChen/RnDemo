/**
 * Copyright (c) 2017-present
 * All rights reserved.
 *
 * @flow
 */


import React, {PureComponent} from 'react'
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Image,
    TouchableOpacity,
    ScrollView,
    RefreshControl
} from 'react-native'

import {Heading2, Heading3, Paragraph} from '../../widget/Text'
import {screen, system} from '../../common'
import {color, NavigationItem, SpacingView} from '../../widget'

import MineTopCell from './MineCellTop'
import MineCellBottom from './MineCellBottom'
import MineCellDesc from './MineCellDesc'

import LinearGradient from 'react-native-linear-gradient'
import {scaleSize, setSpText} from "../../common/ScreenUtil";

type Props = {}

type State = {
    isRefreshing: boolean,
}

class MineScene extends PureComponent<Props, State> {

    static navigationOptions = ({navigation}: any) => ({
        headerTitle: "我的",
        headerStyle: {backgroundColor: color.primary},

    })

    state: {
        isRefreshing: boolean
    }

    constructor(props: Object) {
        super(props)

        this.state = {
            isRefreshing: false
        }
    }

    onHeaderRefresh() {
        this.setState({isRefreshing: true})

        setTimeout(() => {
            this.setState({isRefreshing: false})
        }, 2000)
    }

    renderCells() {
        let cells = []
        let dataList = this.getDataList()
        for (let i = 0; i < dataList.length; i++) {
            let data = dataList[i]
            let cell = <MineTopCell title={data.title} key={data.title}/>
            cells.push(cell)
        }

        return (
            <View style={{flex: 1}}>
                {cells}
            </View>
        )
    }

    renderVipCells() {
        let cells = []
        let dataList = this.getVipRoleList()
        for (let i = 0; i < dataList.length; i++) {
            let data = dataList[i]
            let cell = <MineCellBottom title={data.title} image={data.image} key={data.title}/>
            cells.push(cell)
        }

        return (
            <View style={{flex: 1}}>
                {cells}
            </View>
        )
    }

    renderVipDescCells(){
        let cells = []
        let dataList = this.getVipDescList()
        for (let i = 0; i < dataList.length; i++) {
            let data = dataList[i]
            let cell = <MineCellDesc title={data.title} desc={data.desc} key={data.title}/>
            cells.push(cell)
        }

        return (
            <View style={{flex: 1}}>
                {cells}
            </View>
        )
    }

    renderSection() {
        return (
            <View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>VIP会员</Text>
                    <Text style={styles.sectionPrice}>¥69.00年</Text>
                </View>
                <Text style={styles.newSection}>VIP会员权益</Text>
            </View>
        )
    }

    renderHeader() {
        return (
            <View>
                <LinearGradient style={styles.header} start={{x: 0.0, y: 0.5}} end={{x: 1.0, y: 0.5}}
                                colors={['#F75D59', '#FF8040', '#FFD801']}>
                    <Image style={styles.avatar}/>
                    <View>
                        <View>
                            <Heading2 style={{color: 'white'}}>素敌</Heading2>
                        </View>
                        <Paragraph style={{color: color.darkGray, marginTop: 8}}>VIP会员：到期 ></Paragraph>
                    </View>
                </LinearGradient>
            </View>
        )
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: color.paper}}>
                <View style={{
                    position: 'absolute',
                    width: screen.width,
                    height: screen.height / 2,
                    backgroundColor: color.white
                }}/>
                <ScrollView style={styles.container}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.isRefreshing}
                                    onRefresh={() => this.onHeaderRefresh()}
                                    tintColor='gray'
                                />
                            }>
                    {this.renderHeader()}
                    {this.renderCells()}
                    {this.renderSection()}
                    {this.renderVipCells()}
                    {this.renderVipDescCells()}
                    <Text style={styles.copyRight}>*本次活动最终解释权归“国家人文历史”所有</Text>
                </ScrollView>
            </View>
        )
    }

    getDataList() {
        return (
            [
                {title: '我的余额'},
                {title: '购买记录'},
                {title: '邀请好友'},
            ]
        )
    }

    getVipRoleList() {
        return ([
            {title: '畅读特权', image: require('../../img/mine/benefits_read.png')},
            {title: '畅听特权', image: require('../../img/mine/benefits_listen.png')},
            {title: '第二年半价续费', image: require('../../img/mine/benefits_gift.png')},
        ])
    }
    getVipDescList() {
        return (
            [
                {title: '畅读特权', desc:'会员可以在会员期内不限次畅读：小程序内自2013年至会员到期日的《国家人文历史》杂志所有内容，杂志内容将持续更新。'},
                {title: '畅听特权', desc:'会员可以在会员期内不限次畅听：小程序内“小课”栏目下所有音频，小课栏目的音频将持续更新。'},
                {title: '第二年半价续费', desc:'年卡会员一年期满后，次年续费专享五折优惠。'},
                {title: '问题反馈', desc:'方法1：关注“果粒时刻”公众号（ID：pickglsk）→直接留言进行问题描述。\n方法2：关注“果粒时刻”公众号（ID：pickglsk）→点击问题反馈菜单进行问题描述。'},

            ]
        )
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: color.white,
    },
    icon: {
        width: 27,
        height: 27,
    },
    header: {
        paddingBottom: 20,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        borderRadius: 4,
        marginBottom: 40,
    },
    avatar: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#51D3C6'
    },
    // section
    section: {
        height: 64,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'space-between',

    },
    newSection: {
        paddingLeft: 20,
        fontSize: 22,
        fontWeight: 'bold'
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    sectionPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        color: color.priceRed
    },
    copyRight:{
        color: color.gray,
        fontSize: setSpText(12),
        marginTop:40,
        marginBottom:20,
        textAlign:'center',
    }
    //
})


export default MineScene