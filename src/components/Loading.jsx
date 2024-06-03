import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native-paper'

const Loading = ({ position, height, size }) => {
    return (
        <View style={{

            height: height || "100%", width: "100%", position: position || "absolute", justifyContent: "center", alignItems: "center",
        }}>
            <View style={{
                borderRadius: 10,
                width: 200,
                height: 200,
                // backgroundColor: Colors.secondary,
                // shadowColor: "#000",
                // shadowOffset: {
                //     width: 0,
                //     height: 2,
                // },
                // shadowOpacity: 0.25,
                // shadowRadius: 3.84,
                // elevation: 5,
                // opacity: 0.8,
                justifyContent: "center"
            }}>
                <ActivityIndicator size={size || 'large'} />
            </View>
        </View>
    )
}

export default Loading

const styles = StyleSheet.create({})