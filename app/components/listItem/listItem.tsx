import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TextInput, View, ViewStyle } from 'react-native'
import BackgroundTimer from "react-native-background-timer"
import { TouchableOpacity } from 'react-native-gesture-handler'
import { color } from '../../theme'

const startImg = (require('../../../assets/images/play.png'))
const stopImg = (require('../../../assets/images/pause.png'))
const deleteImg = (require('../../../assets/images/delete.png'))

export interface ListITemProps {
    item: any,
    onDelete: any
}

const ListItem = (props: ListITemProps) => {
    const { item, onDelete } = props
    const [seconds, setSeconds] = useState(0)
    const [input, setInput] = useState('')
    const [timerOn, setTimerOn] = useState(false)

    useEffect(() => {
        if (timerOn) startTimer();
        else BackgroundTimer.stopBackgroundTimer()
        return () => {
            BackgroundTimer.stopBackgroundTimer()
        }
    }, [timerOn])

    const startTimer = () => {
        BackgroundTimer.runBackgroundTimer(() => {
            setSeconds(secs => {
                if (secs > 0) return secs - 1
                else return 0
            })
            setInput('')
        }, 1000)
    }

    useEffect(() => {
        if (seconds === 0) {
            BackgroundTimer.stopBackgroundTimer()
            setTimerOn(false)
        }
    }, [seconds])

    const hrs = Math.floor(seconds / (60 * 60))
    const mins = Math.floor((seconds % (60 * 60)) / 60)
    const secs = Math.ceil((seconds % (60 * 60)) % 60)

    return (
        <View key={item.id}>
            <Text style={styles.labelText}>{item.name}</Text>
            <View style={styles.listContainer}>
                <View style={styles.inputView}>
                    <TextInput
                        value={input}
                        placeholder="Enter seconds"
                        placeholderTextColor={color.text}
                        keyboardType='number-pad'
                        selectionColor={color.primary}
                        style={styles.inputStyle}
                        onChangeText={(text) => { setInput(text); setSeconds(Number(text)) }}
                    />
                </View>
                <View style={[styles.flex, { alignItems: 'center' }]}>
                    <Text style={styles.lightText}>
                        {`${hrs.toString().padStart(2, '0')}:${mins.toString()
                            .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}
                    </Text>
                </View>
                <TouchableOpacity style={styles.btnStyle} onPress={() => setTimerOn(timerOn => !timerOn)}>
                    <Image source={timerOn ? stopImg : startImg} style={styles.imgStyle} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnStyle} onPress={onDelete}>
                    <Image source={deleteImg} style={styles.imgStyle} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default ListItem

const styles = StyleSheet.create({
    btnStyle: {
        alignItems: 'center',
        flex: 0.1
    },
    flex: {
        flex: 0.45,
    },
    imgStyle: {
        height: 24,
        marginLeft: 10,
        width: 24
    },
    inputStyle: {
        color: color.textHighLighted,
        marginHorizontal: 5,
        paddingVertical: 6
    },
    inputView: {
        borderColor: color.text,
        borderRadius: 12,
        borderWidth: 1,
        flex: 0.45
    },
    labelText: {
        color: color.textHighLighted,
        fontSize: 11,
        fontWeight: 'bold',
        marginTop: 10,
        paddingLeft: 10
    },
    lightText: {
        color: color.text,
        fontWeight: 'bold'
    },
    listContainer: {
        flexDirection: "row",
        padding: 10,
        flex: 1,
        backgroundColor: color.backgroundLight,
        borderRadius: 15,
        marginTop: 2,
        alignItems: 'center',
    } as ViewStyle,
})


