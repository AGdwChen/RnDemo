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

let count = 0

type Props = {
    info: Object,
    onPress: Function,
}


class CourseSceneCell extends PureComponent<Props> {

    render() {
        let {info} = this.props
        let imageUrl = info.imageUrl
        return (
            <TouchableOpacity style={styles.container} onPress={() => this.props.onPress(info)}>
                <Image source={{uri: imageUrl}} style={styles.logoImage} />

                <View style={styles.bottomContainer}>
                    <Heading2>{info.title}</Heading2>
                    <Paragraph numberOfLines={1} style={{marginTop: 8}}>{info.subtitle}</Paragraph>
                    <View style={{flex: 1, justifyContent: 'flex-end'}}>
                        <Heading2 style={styles.price}>{info.price}元</Heading2>
                    </View>

                </View>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        padding: scaleSize(40),
        backgroundColor: 'white',
    },
    logoImage: {
        width: scaleSize(670),
        height: scaleSize(300),
        borderRadius: 5,
    },
    bottomContainer: {
        flex: 1,
        paddingTop:scaleSize(20),
    },
    price: {
        color: color.primary,
        marginTop:8,
    }
})


export default CourseSceneCell
