/**
 * Copyright (c) 2017-present
 * All rights reserved.
 *
 * @flow
 */


import React, {PureComponent} from 'react'
import {View, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Image, Text, NativeModules} from 'react-native'
import {NavigationActions} from 'react-navigation'

import {color, Button} from '../../widget'
import {NavTitle} from '../../widget/Text'
import api from "../../api"
import EZSwiper from 'react-native-ezswiper'

import screen from "../../common/screen"

import HomeMergeCell from './HomeMergeCell'
import HomeCourseCell from './HomeCourseCell'

type Props = {
    navigation: any,
}

type State = {
    loading: boolean,
    ads: Array<Object>,
    course: Object,
    periodicals: Object,
    books: Object,
}

class HomeScene extends PureComponent<Props, State> {

    static navigationOptions = ({navigation}: any) => ({
        headerTitle: (<NavTitle>果粒时刻</NavTitle>),
        headerStyle: {backgroundColor: color.primary},
    })

    constructor(props: Props) {
        super(props)

        this.state = {
            loading: true,
            ads: [],
            course: undefined,
            periodicals: undefined,
            books: undefined,
        }
    }


    componentDidMount() {
        this.requestData();
    }

    requestData = async () => {

        let response = await fetch(api.indexFind)
        let json = await response.json()

        let dataList = json.data;
        this.setState({
            ads: dataList.ads,
            course: dataList.course,
            periodicals: dataList.periodicals,
            books: dataList.books,
            loading: false,
        })
    }


    render() {
        if (this.state.loading) {
            return this._renderLoadingView()
        }
        return (
            <ScrollView style={styles.container}>
                {this.renderHeader()}
                {this.renderMerge()}
                {this.renderCourse()}
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

    renderImageRow(item, index) {
        return (
            <View style={styles.adsBorder}>
                <Image style={[styles.adsImage, {borderRadius: 4}]}
                       resizeMode={'stretch'}
                       source={{uri: api.sourceHost + item.img}}/>
            </View>

        )
    }

    onPressRow(obj, index) {
        console.log('onPressRow=>obj:' + obj + ' ,index:' + index);
        alert('onPressRow=>obj:' + obj + ' ,index:' + index);
    }

    renderHeader() {
        return (
            <EZSwiper style={{width: screen.width, height: 170, backgroundColor: 'white'}}
                      dataSource={this.state.ads}
                      width={screen.width}
                      height={170}
                      renderRow={this.renderImageRow}
                      onPress={this.onPressRow}
                      ratio={0.867}
                      horizontal={true}
                      loop={true}
                      autoplayTimeout={5}
            />
        )
    }

    renderMerge() {
        return (
            <View>
                <View style={styles.sectionView}>
                    <Text style={styles.sectionTitle}>{this.state.periodicals.ntype.title}</Text>
                    <View style={styles.sectionDetailView}>
                        <Text style={styles.sectionSubTitle}>{this.state.periodicals.ntype.intro}</Text>
                        <Button titleStyle={styles.sectionMore}
                                onPress={()=>{ // push BillTwo
                                    this.props.navigation.navigate( { routeName: 'Merge'});

                                }}
                                title={'更多'}/>
                    </View>
                </View>
                <ScrollView style={styles.margeMainStyle} horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={styles.margeBoxStyle}>
                        {this.state.periodicals.ndata.map((item, i) => (
                            <HomeMergeCell info={item}
                                           key={i}
                                           onPress={() => {
                                               // this.props.navigation.navigate('CourseInfo', {info: item})
                                               NativeModules.MyMapIntentModule.startActivityByClassname('com.glread.GlTestActivity')
                                           }}
                            />
                        ))}
                    </View>
                </ScrollView>
            </View>
        )
    }

    renderCourse() {
        return (
            <View>
                <View style={styles.sectionView}>
                    <Text style={styles.sectionTitle}>{this.state.course.ntype.title}</Text>
                    <View style={styles.sectionDetailView}>
                        <Text style={styles.sectionSubTitle}>{this.state.course.ntype.intro}</Text>
                        <Button titleStyle={styles.sectionMore}
                                onPress={()=>{ // push BillTwo
                                    this.props.navigation.navigate( { routeName: 'Course'});
                                }}
                                title={'更多'}></Button>
                    </View>
                </View>
                <ScrollView style={styles.mainStyle}>
                    <View style={styles.boxStyle}>
                        {this.state.course.ndata.map((item, i) => (
                            <HomeCourseCell info={item}
                                           key={i}
                                           onPress={() => {
                                               this.props.navigation.navigate('CourseInfo', {courseInfo: item})
                                           }}
                            />
                        ))}
                    </View>
                </ScrollView>
            </View>
        )
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.paper
    },
    // swiper: {
    //     backgroundColor: '#00ff00',
    // },
    adsBorder: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,
        shadowColor: color.darkGray,
        shadowOffset: {h: 10, w: 10},
        shadowRadius: 4,
        shadowOpacity: 0.8,
        borderRadius: 4
    },
    adsImage: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: undefined,
        height: undefined,
    },
    // section view
    sectionView: {
        height: 94,
        width: screen.width,
        backgroundColor: color.white,
        paddingLeft: 20,
        paddingRight: 20
    },
    sectionTitle: {
        marginTop: 20,
        fontSize: 24,
    },
    sectionDetailView: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    sectionSubTitle: {
        color: color.gray
    },
    sectionMore: {
        color: color.priceRed
    },

    // merge
    margeMainStyle:{
        backgroundColor:color.paper
    },
    margeBoxStyle:{
        flex:1,
        flexDirection:"row",
        flexWrap:"nowrap"
    },

    // course
    mainStyle:{
        backgroundColor:color.paper
    },
    boxStyle:{
        flex:1,
        flexDirection:"column",
    },


})


export default HomeScene
