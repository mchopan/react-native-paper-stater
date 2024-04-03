import { Image, Pressable, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Button, Text } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import { Colors } from '../theme/colors';

const CustomUpload = ({ label }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  // Function to handle attachment selection
  const handleAttach = async () => {
    try {
      const results = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      const file = results[0];
      setSelectedFile(file);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log(err);
      } else {
        console.log(err);
      }
    }
  };

  return <Pressable style={styles.Pressable} onPress={handleAttach}>
    <Text style={{ fontFamily: "GothicA1-Regular", fontSize: 14, fontWeight: "600", color: Colors.gray }}>{selectedFile ? selectedFile.name : label}</Text>
    <Image tintColor={Colors.primary} style={{ height: 20, width: 20 }} source={require("../assets/uploadicon.png")} />
  </Pressable>
};

export default CustomUpload;

const styles = StyleSheet.create({
  Pressable: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.gray
  }
});
