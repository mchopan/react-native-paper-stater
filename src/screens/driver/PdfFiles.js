import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, PermissionsAndroid, Platform, Image } from 'react-native';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import { Colors } from '../../theme/colors';
import { IconButton } from 'react-native-paper';
import FileViewer from 'react-native-file-viewer';

async function requestStoragePermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
                title: "Storage Permission",
                message: "This app needs access to your storage to read files",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can read the storage");
        } else {
            console.log("Storage permission denied");
        }
    } catch (err) {
        console.warn(err);
    }
}

const PdfFiles = () => {
    const [pdfFiles, setPdfFiles] = useState([]);

    useEffect(() => {
        const getFiles = async () => {
            if (Platform.OS === 'android') {
                await requestStoragePermission();
            }
            const directoryPath = '/storage/emulated/0/Android/data/com.quickload/files/Documents';
            RNFS.readDir(directoryPath)
                .then((result) => {
                    const pdfFiles = result.filter(file => file.isFile() && file.name.endsWith('.pdf'));
                    setPdfFiles(pdfFiles);
                })
                .catch((err) => {
                    console.log(err.message, err.code);
                });
        };
        getFiles();
    }, []);

    const openFile = (filePath) => {
        FileViewer.open(filePath)
            .then(() => {
                console.log('File opened successfully');
            })
            .catch(error => {
                console.log('Error opening file:', error);
            });
    };

    const onShare = async (filePath) => {
        try {
            const shareOptions = {
                title: 'Share PDF',
                message: 'Check out this awesome PDF file:',
                url: `file://${filePath}`,
                type: 'application/pdf',
            };
            await Share.open(shareOptions);
        } catch (error) {
            console.log('Error sharing file:', error);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <TouchableOpacity
                style={styles.touchable}
                onPress={() => openFile(item.path)}
            >
                <View style={styles.item}>
                    <Text style={styles.text}>{item.name}</Text>
                </View>
                <View>
                    <Image style={styles.image} source={require('../../assets/pdficon.png')} />
                </View>
            </TouchableOpacity>
            <IconButton
                icon="share"
                iconColor={Colors.primary}
                size={30}
                onPress={() => onShare(item.path)}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={pdfFiles}
                keyExtractor={(item) => item.path}
                renderItem={renderItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    itemContainer: {
        flexDirection: "row",
        marginBottom: 10,
    },
    touchable: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 10,
        height: 60,
        width: "80%",
        backgroundColor: "#931b1b",
        padding: 10,
    },
    text: {
        fontSize: 16,
        color: "white"
    },
    image: {
        height: 20,
        width: 20,
    },
    shareButton: {
        marginTop: 5,
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    shareButtonText: {
        color: 'white',
        fontSize: 14,
    },
});

export default PdfFiles;
