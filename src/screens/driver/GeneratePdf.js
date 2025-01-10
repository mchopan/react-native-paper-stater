import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { Alert } from 'react-native';
import Toast from 'react-native-toast-message';

export const createPDF = async ({ resData, user, setFilePath, loadDetails }) => {
    // Extract driver data from resData
    const driverData = resData.driverData || {};

    // Format the date
    const bookingDate = new Date(loadDetails.selectDate).toLocaleDateString();
    const currentDate = new Date().toLocaleDateString();

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
        <body>
        <center style='margin:10'>
            <p style='text-align:center'>All disputes shall be settled at Jammu Jurisdiction</p>
            <h4 style='text-align:center'> GRAMS : ADRI &nbsp;&nbsp;&nbsp; PAN : CSCPS1246N &nbsp;&nbsp;&nbsp; GSTIN : 01CSCPS1246N1ZP &nbsp;&nbsp;&nbsp; No. A 1684</h4>
            <h1>ANGAD DEEP ROADLINES</h1>
            <h3>FLEET OWNERS & TRANSPORT CONTRACTORS, CLEARING & FORWARDING AGENTS</h3>
            <p>B.O: Shiva Colony, SIDCO Birpur Complex, Bari Brahmana, Samba (J&K)</p>
            <p>Mobiles : 9149898208, 9796188416, 9596019343</p>
            <h2>FULL TRUCK AVAILABLE FOR ALL OVER INDIA</h2>
            <p>At Owner's Risk</p>
            <p>Truck No. ${driverData.vehicleRegistrationNumber || ''}</p>
            <table>
                <tr>
                    <th>Driver Name</th>
                    <td>${driverData.name || ''}</td>
                </tr>
                <tr>
                    <th>Driver Phone</th>
                    <td>${driverData.phoneNumber || ''}</td>
                </tr>
                <tr>
                    <th>Dealer Phone</th>
                    <td>${loadDetails.dealerPhoneNumber || ''}</td>
                </tr>
                <tr>
                    <th>Vehicle Number</th>
                    <td>${driverData.vehicleRegistrationNumber || ''}</td>
                </tr>
                <tr>
                    <th>Vehicle Type</th>
                    <td>${loadDetails.selectVehicleType || ''}</td>
                </tr>
                <tr>
                    <th>Goods Type</th>
                    <td>${loadDetails.selectGoodsType || ''}</td>
                </tr>
                <tr>
                    <th>Weight (KG)</th>
                    <td>${loadDetails.enterWeightKg || ''}</td>
                </tr>
                <tr>
                    <th>Booking Date</th>
                    <td>${bookingDate}</td>
                </tr>
                <tr>
                    <th>Payment Mode</th>
                    <td>${loadDetails.advancePayment || ''}</td>
                </tr>
            </table>

            <h3>Journey Details</h3>
            <table>
                <tr>
                    <th>From Location</th>
                    <td>${loadDetails.pickUpCityLocation || ''}</td>
                </tr>
                <tr>
                    <th>To Location</th>
                    <td>${loadDetails.dropCityLocation || ''}</td>
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
                    <td></td>
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
            <p>Delivery From: ${loadDetails.pickUpCityLocation || ''} to ${loadDetails.dropCityLocation || ''}</p>
            <p>Delivery From</p>
            <p>1st White Copy: CONSIGNEE COPY, 2nd Pink Copy: Consignor Copy, 3rd Yellow Copy: DRIVER'S COPY, 4th Blue/Green Copy: Office Copy</p>
            <p>Booked as Terms & Conditions Overleaf</p>
            <p>Signature : ................................................</p>
            <p>Driver Details: ${driverData.name || ''} (${driverData.phoneNumber || ''})</p>
            <p>Vehicle: ${driverData.vehicleRegistrationNumber || ''}</p>
            <p>Generated on: ${currentDate}</p>
            </center>
        </body>
        </html>`,
        fileName: `transport_receipt_${Date.now()}`,
        directory: 'Documents',
    };

    try {
        let file = await RNHTMLtoPDF.convert(options);
        setFilePath(file.filePath);
        Toast.show({
            type: 'success',
            text1: 'PDF created',
            text2: `PDF has been saved to: ${file.filePath} `
        });
    } catch (error) {
        console.error(error);
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Failed to create PDF'
        });
    }
};
