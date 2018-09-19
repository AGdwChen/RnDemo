import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import Separator from '../../widget/Separator'
import {color} from "../../widget";
import {screen} from "../../common";

type Props = {
    title: string,
}

class MineCellTop extends PureComponent<Props> {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity>
                    <View style={[styles.content, this.props.style]}>
                        <Text style={styles.title}>{this.props.title}</Text>
                        <View style={{flex: 1, backgroundColor: 'blue'}}/>

                        <Image style={styles.arrow} source={require('../../img/mine/go_icon.png')}/>
                    </View>
                    <Separator style={styles.line}/>
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: color.white,
    },
    title: {
        fontSize: 15,
        color: '#555555'
    },
    content: {
        height: 64,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    arrow: {
        width: 14,
        height: 14,
    },
    line: {
        marginLeft: 20,
        marginRight: 20,
        width: screen.width - 40,
    },
})


export default MineCellTop
