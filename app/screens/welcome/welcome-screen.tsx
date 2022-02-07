import AsyncStorage from '@react-native-async-storage/async-storage'
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import {
    FlatList,
    Image,
    ImageStyle,
    SafeAreaView,
    StatusBar,
    StyleSheet, Text, View,
    ViewStyle
} from "react-native"
import { TextInput, TouchableOpacity } from "react-native-gesture-handler"
import { ListItem } from "../../components"
import { NavigatorParamList } from "../../navigators"
import { color } from "../../theme"

interface dataProps {
    id: string;
    timeInSec: number;
    name: string;
    status: string;
}

export const WelcomeScreen: FC<StackScreenProps<NavigatorParamList, "welcome">> = observer(
    ({ navigation }) => {
        const [label, setLabel] = useState('')
        const [data, setData] = useState<dataProps[]>([])
        const asyncDataKey = 'dataArray'

        useEffect(() => {
            restorDataFromAsync()
        }, [data])

        const onAddPress = () => {
            let id
            if (label !== '') {
                id = label.split(' ').join('_') + '_' + label[Math.floor(Math.random() * label.length)]
                setData([...data, { id: id, timeInSec: 0, name: label, status: 'stop' }])
            }
            storeDataInAsync([...data, { id: id, timeInSec: 0, name: label, status: 'stop' }])
            setLabel('')
        }

        const onDelete = (index) => {
            data.splice(index, 1)
            setData(data)
            storeDataInAsync(data)
        }

        const storeDataInAsync = (newData) => {
            const stringifiedData = JSON.stringify(newData);

            AsyncStorage.setItem(asyncDataKey, stringifiedData).catch(err => {
                console.warn('Error while storing data in Async');
                console.warn(err);
            });
        };

        const restorDataFromAsync = () => {
            AsyncStorage.getItem(asyncDataKey)
                .then(stringifiedData => {
                    const parsedData = JSON.parse(stringifiedData);
                    if (!parsedData || typeof parsedData !== 'object') return;
                    setData(parsedData)
                })
                .catch(err => {
                    console.warn('Error while restoring data from async');
                    console.warn(err);
                });
        };

        return (
            <View testID="WelcomeScreen" style={styles.container}>
                <StatusBar barStyle='light-content' translucent backgroundColor={color.transparent} />
                <SafeAreaView>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Count Down</Text>
                    </View>
                    <View>
                        <View style={styles.topContainer}>
                            <View style={styles.inputView}>
                                <TextInput
                                    value={label}
                                    placeholder="Enter a label"
                                    placeholderTextColor={color.text}
                                    selectionColor={color.primary}
                                    style={styles.inputStyle}
                                    onChangeText={(text) => setLabel(text)}
                                />
                            </View>
                            <TouchableOpacity style={styles.addBtn} onPress={onAddPress}>
                                <Image source={require('../../../assets/images/plus.png')} style={styles.addImg} />
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            contentContainerStyle={styles.list}
                            data={data}
                            key={data.length}
                            extraData={data}
                            keyExtractor={(index) => String(index)}
                            renderItem={({ item, index }) => (
                                <ListItem
                                    key={item.id}
                                    item={item}
                                    onDelete={() => onDelete(index)}
                                />
                            )}
                        />
                    </View>
                </SafeAreaView>
            </View>
        )
    },
)

const styles = StyleSheet.create({
    addBtn: {
        height: 50,
        width: 50,
        backgroundColor: color.primary,
        borderRadius: 15,
        marginLeft: 10,
        justifyContent: 'center'
    } as ViewStyle,
    addImg: {
        width: 20,
        height: 20,
        alignSelf: 'center'
    } as ImageStyle,
    container: {
        backgroundColor: color.background,
        flex: 1,
        height: "100%"
    },
    header: {
        alignItems: 'center',
        paddingBottom: 25,
        paddingHorizontal: 0,
        paddingTop: 50,
        width: "100%"
    },
    headerText: {
        color: color.textHighLighted,
        fontSize: 18,
        letterSpacing: 1.5,
        lineHeight: 22
    },
    inputStyle: {
        color: color.textHighLighted,
        marginHorizontal: 10
    },
    inputView: {
        backgroundColor: color.backgroundLight,
        borderRadius: 15,
        flex: 1
    },
    list: {
        marginTop: 20,
        paddingHorizontal: 4
    },
    topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20
    } as ViewStyle
})
