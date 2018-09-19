/**
 * Copyright (c) 2017-present
 * All rights reserved.
 *
 * @flow
 */


import React, {PureComponent} from 'react'
import {StyleSheet, View, ScrollView, Text, WebView} from 'react-native'
import Sound from 'react-native-sound'

import AudioPlayerBottom from '../../widget/AudioPlayerBottom'
import AudioPlayerTop from '../../widget/AudioPlayerTop'

import SpacingView from '../../widget/SpacingView'

import {urlByAppendingParams} from "../../common/tool"
import api from "../../api"
import H5DisCode from "../../common/H5Discode"

import ActionSheetList from "../../widget/ActionSheetList"

type Props = {
    navigation: any,
}

type State = {
    playing: boolean,
    canPlayPre: boolean,
    canPlayNext: boolean,
    audioInfo: any,
    courseInfo: any,
    indexInfo: Array<any>,
    indexTitles: Array<string>,
    ossPath: string,
    currentIndex: number,
    player: any,
    playAudioUrl: string,
    duration: number,
    currentTime: number,
}

class CourseDetail extends PureComponent<Props> {

    static navigationOptions = ({navigation}: any) => ({
        headerTitle: (<Text style={{color: '#000000', fontSize: 18}}>果粒时刻</Text>),
        headerStyle: {backgroundColor: "white"},
    })

    constructor(props: Object) {
        super(props)
        Sound.setCategory('Playback', true); // true = mixWithOthers
        var timer1 = null;

        this.state = {
            playing: false,
            canPlayPre: false,
            canPlayNext: false,
            currentIndex: 0,
            player: undefined,
            playAudioUrl: undefined,
            duration: 0,
            currentTime: 0,
        }
        this.showAlertSelected = this.showAlertSelected.bind(this);
        this.callbackSelected = this.callbackSelected.bind(this);
    }

    showAlertSelected() {
        this.dialog.show("请选择", this.state.indexTitles, '#333333', this.callbackSelected);
    }

    // 回调
    callbackSelected(i) {
        console.log(i);
        this.setState({
            currentIndex: i
        });
        this.playIndex(i);
    }

    // 网络访问
    requestCourseInfo = async () => {

        let requestParams = {}
        requestParams["vid"] = this.props.navigation.state.params.courseInfo.id

        let url = urlByAppendingParams(api.xkInfo, requestParams)

        let response = await fetch(url)
        let json = await response.json()

        let ossPath = json.data.osspath
        let courseInfo = json.data.resultData

        this.setState({
            ossPath: ossPath,
            courseInfo: courseInfo
        })
    }

    //
    requestIndexInfo = async () => {
        let requestParams = {}
        requestParams["vid"] = this.props.navigation.state.params.courseInfo.id

        let url = urlByAppendingParams(api.xkLIndex, requestParams)

        let response = await fetch(url)
        let json = await response.json()

        let resultData = json.data.resultData;
        console.log(resultData);

        let titles = [];
        for (let i = 0; i < resultData.length; i++) {
            let item = resultData[i];
            let title = item.title;
            titles.push(title);
        }


        let canPlayNext = resultData.length > 1 ? true : false
        this.setState({
            indexInfo: resultData,
            indexTitles: titles,
            canPlayNext: canPlayNext
        })

        if (resultData.length > 0) {
            let indexItem = resultData[0];
            this.requestAudioInfo(indexItem.id)
        }
    }

    //
    requestAudioInfo = async (cid) => {
        let requestParams = {}
        requestParams["id"] = cid

        let url = urlByAppendingParams(api.xkLesson, requestParams)

        let response = await fetch(url)
        let json = await response.json()

        let resultData = json.data.resultData;

        let intro = resultData.intro.replace(/\<img/gi, '<img style="max-width:100%;height:auto"');
        intro = H5DisCode.strDiscode(intro);
        intro = H5DisCode.strDiscode(intro);

        let content = resultData.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto"');
        content = H5DisCode.strDiscode(content);
        content = H5DisCode.strDiscode(content);

        resultData["intro"] = intro;
        resultData["content"] = content;

        console.log(resultData);
        this.setState({
            audioInfo: resultData
        })
        if(this.state.playing)
        {
            let url = this.state.ossPath + resultData.voiceUrl;
            this.play(url);
        }

    }

    //
    componentWillMount() {
        this.requestCourseInfo()
        this.requestIndexInfo()
    }

    updatePlayer() {
        let duration = this.state.player.getDuration();
        this.state.player.getCurrentTime((seconds) => {
            console.log(seconds)
            if (seconds > 0) {
                this.setState({currentTime: seconds})
            }
        })
        if (duration > 0) {
            this.setState({duration: duration})
        }
        console.log('updatePlayer', duration);
    }

    startTimer() {
        this.timer1 = setInterval(
            () => {
                this.updatePlayer();
            },
            1000,
        );
    }

    endTimer() {
        this.timer1 && clearInterval(this.timer1);
    }

    play(url) {
        url = encodeURI(url)

        if (url == this.state.playAudioUrl) {
            // 相同文件
            if (this.state.playing) {
                console.log("pause");
                this.state.player.pause(() => {
                    this.setState({playing: false});
                });
                this.endTimer()
            }
            else {
                console.log("replay");

                this.state.player.play(() => {
                    this.state.player.release()
                    console.log('play end')
                    this.endTimer()

                    this.setState({
                        playing: false,
                        playAudioUrl: undefined,
                        player: undefined,
                    });
                });
                this.setState({playing: true});
                this.startTimer()
            }
        }
        else {
            // 不同文件
            if (this.state.player != undefined) {
                this.state.player.stop().release();
            }
            this.setState({playAudioUrl: url});

            const s = new Sound(url, null, (e) => {
                if (e) {
                    console.log(e);
                    return;
                }
                s.play(() => {
                    this.state.player.release()
                    console.log('play end')
                    this.endTimer()
                    this.setState({
                        playing: false,
                        playAudioUrl: undefined,
                        player: undefined,
                    });
                });
            })
            this.startTimer()
            this.setState({player: s, playing: true});
        }


        //
        // let duration = s.getDuration();
        // console.log('duration:',duration);
        //
        // s.getCurrentTime((seconds) => console.log('at:' + seconds));

    }

    playIndex(index) {
        let selectItem = this.state.indexInfo[index];
        let cid = selectItem.id;
        this.requestAudioInfo(cid)
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.content}>
                    <AudioPlayerTop onPlay={() => {
                        let url = this.state.ossPath + this.state.audioInfo.voiceUrl;
                        this.play(url);
                    }}
                                    onMenu={() => {
                                        this.showAlertSelected();
                                    }}
                                    onShare={() => {
                                        // console.log('onShare');

                                    }}
                                    onPre={() => {
                                        // console.log('onPre');
                                        let currentIndex = this.state.currentIndex;
                                        if (currentIndex > 0) {
                                            let preIndex = currentIndex - 1;
                                            this.playIndex(preIndex);
                                            this.setState({currentIndex:preIndex});

                                            if (preIndex==this.state.indexInfo.length-1)
                                            {
                                                this.setState({canPlayNext:false});
                                            }
                                            else if (preIndex < this.state.indexInfo.length-1)
                                            {
                                                this.setState({canPlayNext:true});
                                            }
                                            if (preIndex >0)
                                            {
                                                this.setState({canPlayPre:true});
                                            }
                                            else
                                            {
                                                this.setState({canPlayPre:false});

                                            }
                                        }

                                    }}
                                    onNext={() => {
                                        console.log('onNext');
                                        let length = this.state.indexTitles.length;
                                        if (this.state.currentIndex < length-1) {
                                            let nextIndex = this.state.currentIndex +1;
                                            this.playIndex(nextIndex);
                                            this.setState({currentIndex:nextIndex});
                                             if (nextIndex==length-1)
                                             {
                                                 this.setState({canPlayNext:false});
                                             }
                                             if (nextIndex >0)
                                             {
                                                 this.setState({canPlayPre:true});
                                             }
                                        }
                                    }}
                                    onValueChange={(value) => {
                                        console.log(value);
                                        this.state.player.setCurrentTime(value);
                                    }}
                                    info={this.state.audioInfo}
                                    ossPath={this.state.ossPath}
                                    playing={this.state.playing}
                                    canPlayNext={this.state.canPlayNext}
                                    canPlayPre={this.state.canPlayPre}
                                    duration={this.state.duration}
                                    currentTime={this.state.currentTime}>

                    </AudioPlayerTop>
                    <SpacingView/>

                    <View style={{height: this.state.introHeight}}>
                        <WebView
                            source={{
                                html: `<!DOCTYPE html>
                                       <html>
                                       <meta content="width=device-width, initial-scale=1" name="viewport" />
                                       <!--<style>p{text-align:justify !important;} p image{text-align:center !important;}</style>-->
                                       <body>${this.state.audioInfo != null ? this.state.audioInfo.intro : ''}
                                       <script>window.onload=function(){window.location.hash = 1;document.title = document.body.clientHeight;}</script>
                                       </body>
                                       </html>`,
                                baseUrl:''  //解决中文乱码
                            }}
                            style={{flex: 1}}
                            bounces={false}
                            scrollEnabled={false}
                            automaticallyAdjustContentInsets={true}
                            contentInset={{top: 0, left: 0}}
                            onNavigationStateChange={(title) => {
                                if (title.title != undefined) {
                                    this.setState({
                                        introHeight: (parseInt(title.title) + 20)
                                    })
                                }
                            }}>
                        </WebView>
                    </View>
                    <SpacingView/>

                    <View style={{height: this.state.contentHeight}}>
                        <WebView
                            source={{
                                html: `<!DOCTYPE html>
                                       <html>
                                       <meta content="width=device-width, initial-scale=1" name="viewport" />
                                       <body>${this.state.audioInfo != null ? this.state.audioInfo.content : ""}
                                       <script>window.onload=function(){window.location.hash = 1;document.title = document.body.clientHeight;}</script>
                                       </body>
                                       </html>`,
                                baseUrl:''
                            }}
                            style={{flex: 1}}
                            bounces={false}
                            scrollEnabled={false}
                            automaticallyAdjustContentInsets={true}
                            contentInset={{top: 0, left: 0}}
                            onNavigationStateChange={(title) => {
                                if (title.title != undefined) {
                                    this.setState({
                                        contentHeight: (parseInt(title.title) + 20)
                                    })
                                }
                            }}>
                        </WebView>
                    </View>
                </ScrollView>
                <SpacingView/>
                <AudioPlayerBottom ossPath={this.state.ossPath}
                                   info={this.state.audioInfo}
                                   playing={this.state.playing}
                                   onplay={() => {
                                       let url = this.state.ossPath + this.state.audioInfo.voiceUrl;
                                       this.play(url);
                                   }}
                                   onMenu={() => {
                                       this.showAlertSelected();
                                   }}/>

                <ActionSheetList ref={(dialog) => {
                    this.dialog = dialog;
                }}/>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#0000ff'
    },
    content: {
        // marginBottom:scaleSize(120),
        backgroundColor: "#00ff00",
    },
    bottom: {
        height: 60,
    },

})

export default CourseDetail
