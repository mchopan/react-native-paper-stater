import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { Alert } from 'react-native';
import Toast from 'react-native-toast-message';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

export const createPDF = async ({ resData, user, setFilePath, loadDetails }) => {
    const driverData = resData.driverData || {};
    const bookingDate = new Date(loadDetails.selectDate).toLocaleDateString();
    const currentDate = new Date().toLocaleDateString();
    const biltyNo = `B${Date.now().toString().slice(-6)}`; // Generate 6-digit bilty number

    // Calculate freight charges (example - you can modify the logic)
    // const baseRate = loadDetails.freightRate; // Base rate per 100 km
    // const weightFactor = loadDetails.enterWeightKg / 100; // Rate multiplier based on weight
    // const estimatedAmount = baseRate * weightFactor;

    // Define main data sections
    const consignmentDetails = [
        ['Bilty No.', biltyNo],
        ['Date', bookingDate],
        ['From', loadDetails.pickUpCityLocation],
        ['To', loadDetails.dropCityLocation],
        ['Vehicle No.', driverData.vehicleRegistrationNumber],
        ['Vehicle Type', loadDetails.selectVehicleType]
    ];

    const goodsDetails = [
        ['Type of Goods', loadDetails.selectGoodsType],
        ['Weight (Ton)', loadDetails.enterWeightKg],
        ['Payment Mode', loadDetails.advancePayment]
    ];

    const chargesDetails = [
        ['Freight Charges', `₹${loadDetails.freightRate}`],
        ['Loading Charges', 'To Pay'],
        ['Unloading Charges', 'To Pay'],
        ['Total Amount', `₹${loadDetails.freightRate} excluding loading and unloading charges`]
    ];

    // Helper function to create table
    const createTable = (rows) => rows
        .map(([label, value]) => `
            <tr>
                <th>${label}</th>
                <td>${value || ''}</td>
            </tr>
        `).join('');

    let options = {
        html: `<!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; font-size: 12px; }
                table { 
                    border-collapse: collapse;
                    width: 100%;
                    margin-bottom: 15px;
                }
                th, td {
                    border: 1px solid black;
                    padding: 5px;
                    text-align: left;
                }
                th { 
                    background-color: #f0f0f0;
                    width: 40%;
                }
                .header { text-align: center; margin: 10px 0; }
                .footer { 
                    margin-top: 20px;
                    display: flex;
                    justify-content: space-between;
                }
                .company-title {
                    font-size: 24px;
                    font-weight: bold;
                    margin: 5px 0;
                }
                .section-title {
                    font-weight: bold;
                    margin: 10px 0 5px 0;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="company-title">ANGAD DEEP ROADLINES</div>
                <div>GSTIN: 01CSCPS1246N1ZP</div>
                <div>B.O: Shiva Colony, SIDCO Birpur Complex, Bari Brahmana, Samba (J&K)</div>
                <div>Contact: 9149898208, 9796188416</div>
            </div>

            <div class="section-title">CONSIGNMENT DETAILS</div>
            <table>${createTable(consignmentDetails)}</table>

            <div class="section-title">GOODS DETAILS</div>
            <table>${createTable(goodsDetails)}</table>

            <div class="section-title">CHARGES</div>
            <table>${createTable(chargesDetails)}</table>

            <div class="footer">
                <div>
                    <p>Driver: ${driverData.name || ''}</p>
                    <p>Phone: ${driverData.phoneNumber || ''}</p>
                </div>
                <div>
                    <p>Authorized Signatory</p>
                    <br/>
                    _________________
                </div>
            </div>

            <div style="font-size: 10px; text-align: center; margin-top: 20px;">
                <p>This is a computer generated bilty and does not require physical signature</p>
                <p>All disputes subject to Jammu jurisdiction</p>
            </div>
        </body>
        </html>`,
        fileName: `bilty_${biltyNo}_${Date.now()}`,
        directory: 'Documents',
    };

    try {
        let file = await RNHTMLtoPDF.convert(options);
        setFilePath(file.filePath);
        Toast.show({
            type: 'success',
            text1: 'Bilty Generated',
            text2: `Saved as: ${file.filePath}`
        });
    } catch (error) {
        console.error(error);
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Failed to generate bilty'
        });
    }
};
