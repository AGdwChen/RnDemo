/**
 * Copyright (c) 2017-present
 * All rights reserved.
 *
 * @flow
 */


import React, {PureComponent} from 'react'
import {View, StyleSheet, TouchableOpacity, Image, Text} from 'react-native'
import {color} from '../../widget'

import {scaleSize} from '../../common/ScreenUtil'
import api from '../../api'

type Props = {
    info: Object,
    onPress: Function,
}


class MergeListCell extends PureComponent<Props> {

    render() {
        let {info} = this.props
        let imageUrl = info.thumb
        if (imageUrl.indexOf("http")==-1)
        {
            imageUrl = api.sourceHost + imageUrl;
        }
        console.log(imageUrl)

        return (
            <TouchableOpacity style={styles.container} onPress={() => this.props.onPress(info)}>
                <Image source={{uri: imageUrl}} style={styles.logoImage} />

                <View style={styles.bottomContainer}>
                    <View style={styles.titleBox}>
                        <Text numberOfLines={2} style={styles.bookTitle}>{info.title}</Text>
                    </View>
                     <View style={styles.priceBox}>
                         <Text style={styles.priceOrg}>¥{info.oldPrice!=null?info.oldPrice:20.00}</Text>
                         <Text style={styles.price}>¥{info.price}</Text>
                    </View>

                </View>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        paddingTop:scaleSize(40),
        paddingLeft:scaleSize(40),
        width:scaleSize(355),
    },
    logoImage: {
        width: scaleSize(315),
        height: scaleSize(324),
        borderRadius: 5,
    },
    bottomContainer: {
        flex: 1,
    },
    titleBox:{
        height:44,
        marginTop:10,
        marginBottom:10,
    },
    bookTitle:{
        fontSize:18,
        fontWeight:"bold",
    },
    priceBox:{
        flex:1,
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop:3,
    },

    price: {
        color: color.priceRed,
    },
    priceOrg:{
        fontSize: 13,
        fontWeight: 'normal',
        color:color.placeholderColor,
        textDecorationLine:'line-through',
    }
})


export default MergeListCell
