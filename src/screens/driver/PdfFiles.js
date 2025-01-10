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
                    setPdfFiles(pdfFiles.reverse());
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

    const formatFileName = (fileName) => {
        // Remove 'transport_receipt_' prefix
        const timestamp = fileName.replace('transport_receipt_', '').replace('.pdf', '');
        // Convert timestamp to Date object
        const date = new Date(parseInt(timestamp));
        return {
            title: 'Transport Receipt',
            datetime: date.toLocaleString() // Format: "1/10/2024, 12:34:56 PM"
        };
    };

    const renderItem = ({ item }) => {
        const fileInfo = formatFileName(item.name);
        return (
            <View style={styles.itemContainer}>
                <TouchableOpacity
                    style={styles.touchable}
                    onPress={() => openFile(item.path)}
                >
                    <View style={styles.fileInfo}>
                        <Image
                            style={styles.image}
                            source={require('../../assets/pdficon.png')}
                        />
                        <View style={styles.textContainer}>
                            <Text style={styles.fileName} numberOfLines={1}>
                                {fileInfo.title}
                            </Text>
                            <Text style={styles.fileDate}>
                                {fileInfo.datetime}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <IconButton
                    icon="share"
                    iconColor={Colors.primary}
                    size={24}
                    style={styles.shareButton}
                    onPress={() => onShare(item.path)}
                />
            </View>
        );
    };

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
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    touchable: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
    },
    fileInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        height: 40,
        width: 40,
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
    },
    fileName: {
        fontSize: 16,
        color: '#333333',
        fontWeight: '600',
        marginBottom: 4,
    },
    fileDate: {
        fontSize: 13,
        color: '#666666',
        fontWeight: '400',
    },
    shareButton: {
        marginRight: 8,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
    },
});

export default PdfFiles;
