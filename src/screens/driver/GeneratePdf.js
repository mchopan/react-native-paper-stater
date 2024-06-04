import React, { useState } from 'react';
import { View, Button, Alert, Platform, StyleSheet } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { PermissionsAndroid } from 'react-native';
import { checkAndroidPermission } from '../../../utils/checkAndroidPermission';

const GeneratePdf = () => {
    const [filePath, setFilePath] = useState('');

    // const checkPermission = async () => {
    //     if (Platform.OS === 'android') {
    //         checkAndroidPermission()
    //     } else return true;
    // };

    const createPDF = async () => {
        if (true) {
            let options = {
                html: `<!DOCTYPE html>
                <html>
                <head>
                    <title>Angad Deep Roadlines</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                        }
                        table {
                            border-collapse: collapse;
                            width: 100%;
                        }
                        th, td {
                            border: 1px solid black;
                            padding: 8px;
                            text-align: left;
                        }
                        th {
                            background-color: #ddd;
                        }
                    </style>
                </head>
                <body >
                <center>
                    <p style='text-align:center'>All disputes shall be settled at Jammu Jurisdiction</p>
                    <h4 style='text-align:center'> GRAMS : ADRI &nbsp;&nbsp;&nbsp; PAN : CSCPS1246N &nbsp;&nbsp;&nbsp; GSTIN : 01CSCPS1246N1ZP &nbsp;&nbsp;&nbsp; No. A 1684</h4>
                    <h1>ANGAD DEEP ROADLINES</h1>
                    <h3>FLEET OWNERS & TRANSPORT CONTRACTORS, CLEARING & FORWARDING AGENTS</h3>
                    <p>B.O: Shiva Colony, SIDCO Birpur Complex, Bari Brahmana, Samba (J&K)</p>
                    <p>Mobiles : 9149898208, 9796188416, 9596019343</p>
                    <h2>FULL TRUCK AVAILABLE FOR ALL OVER INDIA</h2>
                    <p>At Owner's Risk</p>
                    <p>Truck No.</p>
                    <table>
                        <tr>
                            <th>FROM</th>
                            <td></td>
                        </tr>
                        <tr>
                            <th>TO</th>
                            <td></td>
                        </tr>
                        <tr>
                            <th>Consignor's Name :</th>
                            <td></td>
                        </tr>
                        <tr>
                            <th>Address :</th>
                            <td></td>
                        </tr>
                        <tr>
                            <th>GSTIN:</th>
                            <td></td>
                        </tr>
                        <tr>
                            <th>Consignee's Name :</th>
                            <td></td>
                        </tr>
                        <tr>
                            <th>Address</th>
                            <td></td>
                        </tr>
                        <tr>
                            <th>GSTIN:</th>
                            <td></td>
                        </tr>
                        <tr>
                            <th>Bill No.</th>
                            <td></td>
                        </tr>
                        <tr>
                            <th>Date :</th>
                            <td></td>
                        </tr>
                    </table>
                    <table>
                        <tr>
                            <th>Package</th>
                            <th>DESCRIPTION</th>
                            <th>Value Rs.</th>
                            <th>P.</th>
                            <th>Weight</th>
                            <th>Weight</th>
                            <th>Rate</th>
                            <th>FREIGHT</th>
                            <th></th>
                        </tr>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th>Actual Kgs</th>
                            <th>Gms</th>
                            <th>Charged Kgs</th>
                            <th>Gms</th>
                            <th>Per</th>
                            <th>Kg</th>
                            <th>Paid</th>
                            <th>To-Pay</th>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>FREIGHT</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>HAMALI CH.</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>HALTAGE</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>PRIVATE</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>MARK</td>
                            <td></td>
                            <td>T O T A L</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>GST @ ........%</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>Grand Total</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>Advance</td>
                            <td></td>
                            <td>Balance</td>
                            <td></td>
                        </tr>
                    </table>
                    <p>Delivery From</p>
                    <p>1st White Copy: CONSIGNEE COPY, 2nd Pink Copy: Consignor Copy, 3rd Yellow Copy: DRIVER'S COPY, 4th Blue/Green Copy: Office Copy</p>
                    <p>Booked as Terms & Conditions Overleaf</p>
                    <p>Signature : ................................................</p>
                    </center/>
                </body>
                </html>`,
                fileName: 'sample',
                directory: 'Documents',
            };

            try {
                let file = await RNHTMLtoPDF.convert(options);
                setFilePath(file.filePath);
                Alert.alert('PDF created', `PDF has been saved to: ${file.filePath} `);
            } catch (error) {
                console.error(error);
                Alert.alert('Error', 'Failed to create PDF');
            }
        } else {
            Alert.alert('Permission Denied', 'Storage permission is required to create PDF');
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button title="Create PDF" onPress={createPDF} />
        </View>
    );
};

export default GeneratePdf;


const styles = StyleSheet.create({
    pdfContent: {
        backgroundColor: "yellow",
        padding: 20, // Add padding around content
    },
    heading: {
        fontSize: 24, // Adjust heading size
        marginBottom: 10, // Add margin below heading
    },
    paragraph: {
        lineHeight: 1.5, // Adjust line spacing
    },
});