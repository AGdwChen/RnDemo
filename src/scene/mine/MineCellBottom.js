import React, {PureComponent} from 'react'
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native'
import {Heading3} from '../../widget/Text'
import Separator from '../../widget/Separator'
import {screen, system} from '../../common'

type Props = {
    image?: any,
    title: string,
}

class MineCellBottom extends PureComponent<Props> {
    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.content]}>
                    <Image style={styles.icon} source={this.props.image}/>
                    <Heading3>{this.props.title}</Heading3>
                </View>
                <Separator style={styles.line}/>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    content: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    icon: {
        width: 37,
        height: 35,
        marginRight: 10,
    },
    line: {
        marginLeft: 20,
        marginRight: 20,
        width: screen.width - 40,
    },
})


export default MineCellBottom
