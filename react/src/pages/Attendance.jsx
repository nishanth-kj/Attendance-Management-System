import { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Link } from 'react-router-dom';
import { Camera, ArrowLeft, CheckCircle, AlertTriangle } from 'lucide-react';
import api from '@/lib/api';
import { API_STATUS } from '@/constants';

const Attendance = () => {
    const webcamRef = useRef(null);
    const [isCapturing, setIsCapturing] = useState(false);
    const [result, setResult] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState('');

    const capture = useCallback(async () => {
        if (webcamRef.current) {
            setIsCapturing(true);
            setResult(null);
            setUserInfo(null);
            setError('');

            const imageSrc = webcamRef.current.getScreenshot();

            try {
                const data = await api.post('/attendance/mark/', { image: imageSrc });
                setResult(API_STATUS.SUCCESS);
                setUserInfo(data);
            } catch (err) {
                setResult(API_STATUS.ERROR);
                setError(err || 'No face detected or match found');
            } finally {
                setIsCapturing(false);
            }
        }
    }, [webcamRef]);

    return (
        <div className="min-h-[calc(100vh-64px)] bg-background py-12 transition-all">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link
                    to="/"
                    className="inline-flex items-center text-sm font-bold text-muted-foreground hover:text-foreground mb-6 gap-1 transition-colors"
                >
                    <ArrowLeft size={16} /> BACK TO HOME
                </Link>

                <div className="bg-card p-6 md:p-10 rounded-lg shadow-sm border border-border text-center">
                    <h1 className="text-4xl font-display font-light text-foreground mb-6">
                        Mark Attendance
                    </h1>

                    <div className="my-8 w-full max-w-2xl mx-auto overflow-hidden rounded-md bg-black border-4 border-secondary shadow-2xl relative">
                        <div className="absolute inset-0 border-[1px] border-primary/20 pointer-events-none z-10"></div>
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            className="w-full h-auto block"
                            videoConstraints={{ facingMode: "user" }}
                        />
                    </div>

                    {result && (
                        <div className={`mb-6 p-4 rounded-md border flex items-center justify-center gap-2 font-bold ${result === API_STATUS.SUCCESS
                            ? 'bg-primary/10 border-primary/20 text-primary'
                            : 'bg-destructive/10 border-destructive/20 text-destructive'
                            }`}>
                            {result === API_STATUS.SUCCESS ? <CheckCircle size={20} /> : <AlertTriangle size={20} />}
                            <span>
                                {result === API_STATUS.SUCCESS
                                    ? `Success! Attendance marked for ${userInfo?.name}`
                                    : error}
                            </span>
                        </div>
                    )}

                    <button
                        onClick={capture}
                        disabled={isCapturing}
                        className="min-w-[220px] flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-xl font-bold rounded-md hover:opacity-90 transition-all disabled:opacity-70 shadow-xl shadow-primary/20 mx-auto"
                    >
                        {isCapturing ? 'Processing...' : <><Camera size={24} /> Scan Face</>}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Attendance;
