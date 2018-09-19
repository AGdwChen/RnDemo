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

// var Progress = require('react-native-progress');
import Slider from "react-native-slider";

type Props = {
    onPlay: Function,
    onMenu: Function,
    onShare: Function,
    onPre: Function,
    onNext: Function,
    onValueChange:Function,
    activeOpacity: number,
    info: PropTypes.any,
    ossPath: string,
}

type State = {
    playing: boolean,
    indeterminate: boolean,
    canPlayPre: boolean,
    canPlayNext: boolean,
    duration: number,
    currentTime: number,
    locStart: string,
    locEnd: string,
}

class AudioPlayerBottom extends PureComponent<{}> {
    static defaultProps = {
        onPlay: () => {
        },
        onMenu: () => {
        },
        onShare: () => {
        },
        onPre: () => {
        },
        onNext: () => {
        },
        onValueChange:(value)=>{},

        disabled: false,
        activeOpacity: 0.8
    }

    constructor(props: Object) {
        super(props)
        this.state = {
            playing: false,
            canPlayPre: false,
            canPlayNext: true,
            duration: 0,
            currentTime: 0,
            locStart: "00:00",
            locEnd: "00:00",
        }
    }

    getInitialState() {
        return {
            progress: 0,
            indeterminate: true
        };
    }

    componentDidMount() {
    }

    timeCheck(s) {
        return s < 10 ? '0' + s : s;
    }

    componentWillReceiveProps(nextProps) {
        console.log("打印nextProps")
        let locStart = "00:00"
        let locEnd = "00:00"
        let progress = 0
        if (nextProps.duration > 0) {
            let duration = nextProps.duration;

            var maxMin = Math.floor(duration / 60);
            var maxSec = Math.floor(duration - 60 * maxMin);
            locEnd = this.timeCheck(maxMin) + ":" + this.timeCheck(maxSec);
        }

        if (nextProps.currentTime > 0) {
            let currentTime = nextProps.currentTime;

            var curMin = Math.floor(currentTime / 60);
            var curSec = Math.floor(currentTime - 60 * curMin);
            locStart = this.timeCheck(curMin) + ":" + this.timeCheck(curSec);
        }

        this.setState({
            playing: nextProps.playing,
            canPlayPre: nextProps.canPlayPre,
            canPlayNext: nextProps.canPlayNext,
            duration: nextProps.duration,
            currentTime: nextProps.currentTime,
            locStart: locStart,
            locEnd: locEnd,
        });
    }

    render() {
        let {onPlay, onMenu, onShare, onPre, onNext, onValueChange, activeOpacity} = this.props
        let imgUrl
        if (this.props.info != null) {
            imgUrl = this.props.ossPath + this.props.info.thumb
        }
        else {
            imgUrl = '../img/mine/gl2.png'
        }

        return (
            <View style={styles.container}>
                <Text numberOfLines={2}
                      style={styles.title}>{this.props.info != null ? this.props.info.title : ""}</Text>

                <Image style={styles.logoStyle}
                       source={this.props.info != null ? {uri: imgUrl} : require('../img/mine/gl.png')}></Image>

                <View style={styles.processView}>
                    {/*<Progress.Bar*/}
                    {/*style={styles.progress}*/}
                    {/*width={scaleSize(720)}*/}
                    {/*color={'#f6725b'}*/}
                    {/*progress={this.state.progress}*/}
                    {/*indeterminate={this.state.indeterminate}*/}
                    {/*/>*/}
                    {/*<View style={styles.slider}></View>*/}

                    <Slider style={styles.slider}
                            trackStyle={customStyles3.track}
                            thumbStyle={customStyles3.thumb}
                            minimumValue={0}
                            maximumValue={this.state.duration}
                            value={this.state.currentTime}
                            step={1}
                            minimumTrackTintColor='#eb6e1b'
                            onValueChange={(value)=>onValueChange(value)}
                    />
                    <View style={styles.sliderNum}>
                        <Text style={styles.sliderPostion}>{this.state.locStart}</Text>
                        <Text style={styles.sliderDur}>{this.state.locEnd}</Text>
                    </View>
                </View>

                <View style={styles.opBorder}>
                    <TouchableOpacity
                        onPress={onMenu}
                        activeOpacity={activeOpacity}
                        style={styles.bottomBtn}
                    >
                        <Image style={styles.btnMenu}
                               source={require('../img/class/audio_list.png')}/>
                        <Text style={styles.btnMenuTitle}>播放列表</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={onPre}
                        style={styles.bottomBtn}

                        disabled={!this.state.canPlayPre}
                        activeOpacity={activeOpacity}
                    >
                        <Image style={styles.btnPlayPre}
                               source={this.state.canPlayPre ? require('../img/class/play_pre.png') : require('../img/class/play_pre_not.png')}/>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={onPlay}
                        style={styles.bottomBtn}
                        activeOpacity={activeOpacity}
                    >
                        <Image style={styles.btnPlay}
                               source={this.state.playing ? require('../img/class/audio_pause.png') : require('../img/class/audio_play.png')}/>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={onNext}
                        style={styles.bottomBtn}
                        disabled={!this.state.canPlayNext}
                        activeOpacity={activeOpacity}
                    >
                        <Image style={styles.btnPlayNext}
                               source={this.state.canPlayNext ? require('../img/class/play_next.png') : require('../img/class/play_next_not.png')}/>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={onShare}
                        style={styles.bottomBtn}
                        activeOpacity={activeOpacity}
                    >
                        <Image style={styles.btnShare}
                               source={require('../img/class/audio_share.png')}/>
                        <Text style={styles.btnShareTitle}>分享</Text>
                    </TouchableOpacity>

                </View>

            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: "center",
        backgroundColor: "#ffffff",
        justifyContent: 'center'
    },
    title: {
        marginTop: 20,
        fontSize: 18,
        marginLeft: 14,
        maxWidth: scaleSize(360),
    },
    logoStyle: {
        width: scaleSize(486),
        height: scaleSize(486),
        resizeMode: 'stretch',
        marginTop: 40
    },
    processView: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 40,
        marginBottom: 20,
    },
    slider: {
        width: scaleSize(670),
    },
    // progress: {
    //     top: scaleSize(16),
    //     height: 1,
    //     borderWidth: 0,
    //     backgroundColor: color.gray,
    //     borderColor: '#f6725b',
    // },
    // slider: {
    //     width: scaleSize(14),
    //     height: scaleSize(32),
    //     backgroundColor: '#f6725b',
    //     borderRadius: scaleSize(7),
    //
    // },
    sliderNum: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    sliderPostion: {
        color: '#f6725b',
        fontSize: 12
    },
    sliderDur: {
        color: '#f6725b',
        fontSize: 12
    },
    opBorder: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    bottomBtn: {
        height: scaleSize(152),
        width: scaleSize(152),
        alignItems: 'center',
        justifyContent: 'center',
    },

    btnMenu: {
        resizeMode: 'stretch',
        height: scaleSize(42),
        width: scaleSize(47),
    },
    btnMenuTitle: {
        fontSize: 13,
        color: color.gray,
        marginTop: 8
    },
    btnPlayPre: {
        resizeMode: 'stretch',
        height: scaleSize(34),
        width: scaleSize(29),
    },
    btnPlay: {
        resizeMode: 'stretch',
        height: scaleSize(120),
        width: scaleSize(120),

    },
    btnPlayNext: {
        resizeMode: 'stretch',
        height: scaleSize(34),
        width: scaleSize(29),
    },
    btnShare: {
        resizeMode: 'stretch',
        height: scaleSize(44),
        width: scaleSize(44),
    },
    btnShareTitle: {
        fontSize: 13,
        color: color.gray,
        marginTop: 8
    }
})
var customStyles3 = StyleSheet.create({
    track: {
        height: 2,
        borderRadius: 5,
        backgroundColor: '#d0d0d0',
    },
    thumb: {
        width: 7,
        height: 16,
        borderRadius: 3.5,
        backgroundColor: '#eb6e1b',
    }
});

export default AudioPlayerBottom
