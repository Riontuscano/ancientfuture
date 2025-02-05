import React from 'react';
import QRCard from './AugmentatedCard';

const AugmentedHolder = (props) => {
  return (

    <div className={`min-h-screen ${props.mode  ? 'bg-black' : 'bg-white'} p-8`}>
    <div className="max-w-7xl mx-auto">
        <h1 className={`text-center text-4xl ${props.mode  ? 'text-gold' : 'text-yellow-800'} tracking-wide font-ancient mb-8`}>
            {('Into ancient india(AR) ').toUpperCase()}
        </h1>

    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 ${props.mode ? 'bg-black':'bg-white'}`}>
    
  { Array(6).fill(0).map((_,index)=>(   <QRCard 
        title="My QR Code"
        description="Scan this QR code to access our platform."
        qrValue="https://example.com" 
        mode= {props.mode}
        year = '1234'
      />
  ))}    
    </div>
    </div>
    </div>
  );
};

export default AugmentedHolder;
