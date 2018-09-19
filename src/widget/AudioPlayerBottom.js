/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan
 * @flow
 */


import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {View, Text, StyleSheet, TouchableOpacity, ViewPropTypes, Image} from 'react-native'
import {scaleSize} from '../common/ScreenUtil'

import color from './color'

type Props = {
    onPlay: Function,
    onMenu: Function,
    disabled: boolean,
    disabledMenu: boolean,
    activeOpacity: number,
    style: ViewPropTypes.style,
    info: PropTypes.any,
    ossPath:string
}

type State = {
    playing: boolean,
}

class AudioPlayerBottom extends PureComponent<{}> {
    static defaultProps = {
        onPlay: () => {
        },
        onMenu: () => {
        },
        disabled: false,
        disabledMenu: false,
        activeOpacity: 0.8
    }

    constructor(props: Object) {
        super(props)

        this.state = {
            playing: false,
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log("打印nextProps")
        this.setState({ playing: nextProps.playing});
    }

    render() {
        let {onPlay, onMenu, disabled, disabledMenu, activeOpacity} = this.props
        let imgUrl
        if (this.props.info != null) {
            imgUrl = this.props.ossPath + this.props.info.thumb
        }
        else {
            imgUrl = '../img/mine/gl2.png'
        }

        return (
            <View style={styles.container}>
                <Image style={styles.logoStyle}
                       source={this.props.info != null ? {uri: imgUrl} : require('../img/mine/gl2.png')}></Image>
                <Text numberOfLines={1} style={styles.title}>{this.props.info != null ?this.props.info.title:""}</Text>

                <View style={styles.opBorder}>
                    <TouchableOpacity
                        onPress={onPlay}
                        disabled={disabled}
                        activeOpacity={activeOpacity}
                    >
                        <Image style={styles.bottomBtn}
                               source={this.state.playing ? require('../img/class/audio_pause_btm.png') : require('../img/class/audio_play_btm.png')}/>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={onMenu}
                        disabled={disabledMenu}
                        activeOpacity={activeOpacity}
                    >
                        <Image style={styles.bottomBtn}
                               source={require('../img/class/audio_list_btm.png')}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        height: scaleSize(120),
        flexDirection: 'row',
        alignItems: "center",
        backgroundColor: "#ffffff",
        justifyContent: 'space-between',
        marginBottom:0
    },

    logoStyle: {
        width: scaleSize(160),
        height: scaleSize(120),
        resizeMode: 'stretch'
    },
    title: {
        fontSize: 16,
        marginLeft: 14,
        maxWidth: scaleSize(360),
    },
    opBorder: {
        flexDirection: 'row'
    },
    bottomBtn: {
        height: scaleSize(68),
        width: scaleSize(68),
        resizeMode: 'stretch',
        marginRight: 20,
    },
})


export default AudioPlayerBottom
