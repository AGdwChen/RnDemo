/**
 * Copyright (c) 2017-present
 * All rights reserved.
 *
 * @flow
 */


import React, {PureComponent} from 'react'
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native'
import {Heading2, Paragraph} from '../../widget/Text'
import {color} from '../../widget'

import {scaleSize} from '../../common/ScreenUtil'
import api from "../../api";

let count = 0

type Props = {
    info: Object,
    onPress: Function,
}


class HomeCourseCell extends PureComponent<Props> {

    render() {
        let {info} = this.props
        let imageUrl = info.thumb
        if (imageUrl.indexOf("http")==-1)
        {
            imageUrl = api.sourceHost + imageUrl;
        }
        return (
            <TouchableOpacity style={styles.container} onPress={() => this.props.onPress(info)}>
                <Image source={{uri: imageUrl}} style={styles.logoImage} />

                <View style={styles.bottomContainer}>
                    <Heading2  numberOfLines={2} style={{lineHeight:24}} >{info.title}</Heading2>
                    <Paragraph numberOfLines={1} style={{marginTop: 8}}>{info.intro}</Paragraph>
                    <View style={{flex: 1, justifyContent: 'flex-end'}}>
                        <Heading2 style={styles.price}>¥{info.price}</Heading2>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: scaleSize(40),
        backgroundColor: 'white',
    },
    logoImage: {
        width: scaleSize(260),
        height: scaleSize(200),
        borderRadius: 5,
    },
    bottomContainer: {
        flex: 1,
        paddingLeft:scaleSize(20),
    },
    price: {
        color: color.priceRed,
        marginTop:8,
    }
})


export default HomeCourseCell
