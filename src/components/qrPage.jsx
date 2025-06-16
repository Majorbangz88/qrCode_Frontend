import { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

function QRPage() {
    const [qrData, setQrData] = useState({
        url: '',
        qrCode: '',
        isLoading: true,
        error: null
    });

    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        const fetchQR = async () => {
            try {
                const response = await fetch(`${backendUrl}/api/qr`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setQrData(prev => ({
                    ...data,
                    isLoading: false,
                    error: null
                }));
            } catch (error) {
                setQrData(prev => ({
                    ...prev,
                    isLoading: false,
                    error: error.message
                }));
                console.error('Error fetching QR data:', error);
            }
        };

        fetchQR();
        const interval = setInterval(fetchQR, 10000);

        return () => clearInterval(interval);
    }, [backendUrl]);

    if (qrData.isLoading) {
        return <div>Loading QR code...</div>;
    }

    if (qrData.error) {
        return <div>Error: {qrData.error}</div>;
    }

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Scan this QR Code</h1>
            <div style={{ margin: '20px auto', padding: '20px', background: 'white' }}>
                <QRCodeSVG
                    value={qrData.url}
                    size={256}
                    level="H"
                    includeMargin={true}
                />
            </div>
            <p>URL: <a href={qrData.url} target="_blank" rel="noopener noreferrer">{qrData.url}</a></p>
            <p>QR code will automatically refresh in 10 seconds</p>
        </div>
    );
}

export default QRPage;