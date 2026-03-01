import React, { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Dialog,
    DialogHeader,
    DialogFooter,
} from "@material-tailwind/react";

const QRCard = ({ title, description, image, year, qrValue, mode }) => {
    const [open, setOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const handleOpen = () => setOpen(!open);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile(); // initial
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <>
            <Dialog
                open={open}
                handler={handleOpen}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader className="text-yellow-700 text-center font-ancient">SCAN TO VIEW</DialogHeader>
                <div className="flex justify-center p-4">
                    {isMobile ? (
                        <a
                            href={qrValue}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline text-center"
                        >
                            Tap here to open the AR view
                        </a>
                    ) : (
                        <QRCodeCanvas value={qrValue} size={300} />
                    )}
                </div>
                <DialogFooter>
                    <Button variant="gradient" color="red" onClick={handleOpen}>
                        <span>Close</span>
                    </Button>
                </DialogFooter>
            </Dialog>

            <Card className={`w-full ${mode ? 'bg-black' : 'bg-white'} border border-gray-700 rounded-xl shadow-lg flex flex-col`}>
                <CardHeader shadow={false} floated={false} className="h-48 md:h-96">
                    <img
                        src={image}
                        alt="card-image"
                        className="h-full w-full object-cover"
                    />
                </CardHeader>
                <CardBody className="flex-grow">
                    <div className="mb-2 flex items-center justify-between">
                        <Typography color="blue-gray" className={`${mode ? 'text-gold' : 'text-yellow-800'} font-ancient text-sm`}>
                            {title}
                        </Typography>
                        <Typography color="blue-gray" className={`${mode ? 'text-gold' : 'text-yellow-800'} font-ancient text-xs`}>
                            {year}
                        </Typography>
                    </div>
                    <Typography
                        variant="small"
                        color="gray"
                        className={`font-normal text-sm ${mode ? 'text-gray-400' : 'text-gray-600'}`}
                    >
                        {description}
                    </Typography>
                </CardBody>
                <CardFooter className="mt-auto">
                    <Button
                        onClick={handleOpen}
                        variant={mode ? "gradient" : "text"}
                        fullWidth={true}
                        className={`${mode ? 'bg-blue-gray-900/10 text-blue-gray-100' : 'bg-gray-300 text-black'} hover:scale-105`}
                    >
                        ar view
                    </Button>
                </CardFooter>
            </Card>
        </>
    );
};

export default QRCard;
