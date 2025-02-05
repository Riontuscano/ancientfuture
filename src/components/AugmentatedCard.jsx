import React, { useState } from 'react';
import { QRCodeSVG ,QRCodeCanvas } from 'qrcode.react';
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




const QRCard = ({ title, description, year, qrValue, mode }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);


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
                <DialogHeader className='text-yellow-700 text-center font-ancient'>SCAN TO VIEW</DialogHeader>
                <div className='flex justify-center'>

                <QRCodeCanvas value={"https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"} size={300} />
                </div>
                <DialogFooter>
                
                    <Button variant="gradient" color="red" onClick={handleOpen}>
                        <span>Close</span>
                    </Button>
                </DialogFooter>
            </Dialog>

            <Card className={`w-96 ${mode ? 'bg-black':'bg-white'} border border-gray-700 rounded-xl shadow-lg `}>
                <CardHeader shadow={false} floated={false} className="h-96">
                    <img
                        src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
                        alt="card-image"
                        className="h-full w-full object-cover"
                    />
                </CardHeader>
                <CardBody>
                    <div className="mb-2 flex items-center justify-between">
                        <Typography color="blue-gray" className={`font-medium ${mode ? 'text-gold':'text-yellow-800'} font-ancient`}>
                            {title}
                        </Typography>
                        <Typography color="blue-gray" className={`font-medium ${mode ? 'text-gold':'text-yellow-800'} font-ancient`}>
                            {year}
                        </Typography>
                    </div>
                    <Typography
                        variant="small"
                        color="gray"
                        className={`font-normal text-sm  ${mode ? 'text-gray-400' : 'text-gray-600'}`}
                    >
                        {description}
                    </Typography>
                </CardBody>
                <CardFooter className="pt-0">

                    <Button onClick={handleOpen} variant={`${mode ? "gradient" : "text"}`} fullWidth={true}
                        className={`${mode ? 'bg-blue-gray-900/10':"bg-gray-100"} ${mode ? "text-blue-gray-100 ": " text-black"}  hover:scale-105  `}
                    >
                       ar view
                    </Button>
                </CardFooter>
            </Card>
        </>

    );
};

export default QRCard;




// Usage Example
// import QRCard from './QRCard';
// <QRCard 
//   title="My QR Code"
//   description="Scan this QR code to access our platform."
//   qrValue="https://example.com" 
//   mode="dark" 
// />
