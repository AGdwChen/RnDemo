/**
 * Created by sybil052 on 2017/6/19.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableHighlight,
    Animated,
    Easing,
    Dimensions,
    Modal,
    TouchableOpacity,
    ScrollView,
    findNodeHandle,
    UIManager,
} from 'react-native';

const {width, height} = Dimensions.get('window');
const [aWidth] = [width - 20];
const [left, top] = [0, 0];
const [middleLeft] = [(width - aWidth) / 2];

export default class ActionSheetList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: new Animated.Value(0),
            opacity: new Animated.Value(0),
            title: "",
            hide: true,
            tipTextColor: '#333333',
            aHeight: height / 2,
            animationType: 'fade',
            modalVisible: false,
            transparent: true,
            selectIndex: 0,
        };
        this.entityList = [];//数据源
        this.callback = function () {
        };//回调方法
    }

    // layout(ref) {
    //     const handle = findNodeHandle(ref);
    //
    //     return new Promise((resolve) => {
    //         UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
    //             resolve({
    //                 x,
    //                 y,
    //                 width,
    //                 height,
    //                 pageX,
    //                 pageY
    //             });
    //         });
    //     });
    // }

    layout = (e) => {
        console.log('layout')
        console.log(e)
    }


    render() {
        if (this.state.hide) {
            return (<View/>)
        } else {
            return (
                <Modal
                    animationType={this.state.animationType}
                    transparent={this.state.transparent}
                    visible={this.state.modalVisible}
                    onRequestClose={this.hide.bind(this)}
                > <Animated.View style={styles.mask}>
                </Animated.View>

                    <Animated.View style={[
                        {
                            width: width,
                            height: this.state.aHeight,
                            left: 0,
                            marginBottom: 0,
                            alignItems: "center",
                            justifyContent: "space-between",
                        },
                        {
                            transform: [{
                                translateY: this.state.offset.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [height, height - this.state.aHeight]
                                }),
                            }]
                        }
                    ]}>
                        <View onLayout={({nativeEvent: e}) => this.layout(e)} style={styles.content}>
                            <View style={styles.tipTitleView}>
                                <Text style={styles.tipTitleText}>{this.state.title}</Text>
                            </View>
                            <ScrollView style={{paddingLeft: 20, paddingRight: 20}}>
                                {
                                    this.entityList.map((item, i) => this.renderItem(item, i))
                                }
                            </ScrollView>
                        </View>
                        <TouchableHighlight
                            style={styles.button}
                            underlayColor={'#f0f0f0'}
                            onPress={this.cancel.bind(this)}
                        >
                            <Text style={styles.buttonText}>取消</Text>
                        </TouchableHighlight>
                    </Animated.View>
                </Modal>
            );
        }
    }

    renderItem(item, i) {
        if (this.state.selectIndex == i) {
            return (
                <View style={styles.tipContentView} key={i + 100}>
                    <View style={{height: 0.5, backgroundColor: '#a9a9a9', width: (width - 40)}}/>
                    <TouchableOpacity
                        key={i}
                        onPress={this.choose.bind(this, i)}
                    >
                        <View style={{
                            width: width - 40,
                            height: 60,
                            backgroundColor: '#fff',
                            flexDirection:'row',
                            alignItems:'center',
                        }}>
                            <Image style={styles.arrow} source={require('../img/class/audio_curplay_index.png')}/>
                            <Text numberOfLines={2} style={{
                                color: "#ff0000",
                                fontSize: 17,
                                textAlign: "left",
                                lineHeight: 22,
                                width:width-68
                            }}>{item}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }
        else {
            return (
                <View style={styles.tipContentView} key={i + 100}>
                    <View style={{height: 0.5, backgroundColor: '#a9a9a9', width: (width - 40)}}/>
                    <TouchableOpacity
                        key={i}
                        onPress={this.choose.bind(this, i)}
                    >
                        <View style={styles.item}>
                            <Text numberOfLines={2} style={{
                                color: this.state.tipTextColor,
                                fontSize: 17,
                                textAlign: "left",
                                lineHeight: 22,
                            }}>{item}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearTimeout(this.timer);
        this.chooseTimer && clearTimeout(this.chooseTimer);
    }

    //显示动画
    in() {
        Animated.parallel([
            Animated.timing(
                this.state.opacity,
                {
                    easing: Easing.linear,//一个用于定义曲线的渐变函数
                    duration: 200,//动画持续的时间（单位是毫秒），默认为200。
                    toValue: 0.8,//动画的最终值
                }
            ),
            Animated.timing(
                this.state.offset,
                {
                    easing: Easing.linear,
                    duration: 200,
                    toValue: 1,
                }
            )
        ]).start();
    }

    hide() {
        this.setState({modalVisible: false});
    }

    //隐藏动画
    out() {
        Animated.parallel([
            Animated.timing(
                this.state.opacity,
                {
                    easing: Easing.linear,
                    duration: 200,
                    toValue: 0,
                }
            ),
            Animated.timing(
                this.state.offset,
                {
                    easing: Easing.linear,
                    duration: 200,
                    toValue: 0,
                }
            )
        ]).start((finished) => this.setState({hide: true, modalVisible: false}));
    }

    //取消
    cancel(event) {
        if (!this.state.hide) {
            this.out();
        }
    }

    //选择
    choose(i) {
        this.setState({selectIndex: i});
        if (!this.state.hide) {
            this.out();
            this.chooseTimer = setTimeout(() => {
                this.callback(i);
            }, 200);
        }
    }

    /**
     * 弹出控件，最多支持3个选项(包括取消)
     * titile: 标题
     * entityList：选择项数据   数组
     * tipTextColor: 字体颜色
     * callback：回调方法
     */
    show(title: string, entityList: Array, tipTextColor: string, callback: Object) {
        this.entityList = entityList;
        this.callback = callback;

        if (this.state.hide) {
            if (entityList && entityList.length > 0) {
                this.setState({title: title, hide: false, tipTextColor: tipTextColor, modalVisible: true}, this.in);
            }
        }
    }
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width: width,
        height: height,
        left: left,
        top: top,
        backgroundColor: '#ff0000'
    },
    mask: {
        justifyContent: "center",
        backgroundColor: "#000000",
        opacity: 0.3,
        position: "absolute",
        width: width,
        height: height,
        left: left,
        top: top,
    },
    // 提示标题
    tipTitleView: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        marginLeft: 10,
        marginRight: 10
    },
    // 提示文字
    tipTitleText: {
        color: "#999999",
        fontSize: 14,
    },
    // 分割线
    tipContentView: {
        width: width - 40,
        height: 56,
        backgroundColor: '#fff',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    item: {
        width: width - 40,
        height: 60,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    button: {
        height: 57,
        backgroundColor: '#fff',
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderColor: '#a9a9a9',
        borderWidth: 0.5
    },
    // 取消按钮
    buttonText: {
        fontSize: 17,
        color: "#0084ff",
        textAlign: "center",
    },
    content: {
        backgroundColor: '#fff',
        height: height / 2 - 57,
    },
    arrow: {
        width: 23,
        height: 23,
        marginRight: 5,
    },
});
