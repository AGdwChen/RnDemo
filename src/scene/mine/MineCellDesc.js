import React, {PureComponent} from 'react'
import {View, StyleSheet} from 'react-native'
import {Heading3, Paragraph} from '../../widget/Text'
import {color} from '../../widget'
import {setSpText,scaleSize} from '../../common/ScreenUtil'

type Props = {
    title: string,
    desc: string,
}

class MineCellBottom extends PureComponent<Props> {
    render() {
        console.log(scaleSize(40))
        return (
            <View style={styles.container}>
                <Heading3 style={styles.title}>{this.props.title}</Heading3>
                <Paragraph style={styles.desc}>{this.props.desc}</Paragraph>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        margin:20,
    },
    title: {
        color: color.khaki,
        fontSize: setSpText(16),
    },
    desc: {
        color: color.darkGray,
        fontSize: setSpText(14),
        marginTop:10,
        lineHeight:scaleSize(48),
    }

})


export default MineCellBottom
