import React from 'react';
import QRCard from './AugmentatedCard';

const AugmentedHolder = (props) => {
  const modals = [
    {
      id: 'card_1',
      title: 'One-Faced Linga (Ekamukhalinga)',
      description: 'One-Faced Linga (Ekamukhalinga), 600s–700s. Eastern India, Bihar, Medieval period, Pala dynasty. Chloritic schist; overall: 83.8 cm (33 in.). The Cleveland Museum of Art, John L. Severance Fund 1973.73',
      image: 'src/assets/img/pic1.png',
      year: '6th-7th century CE',
      qrValue: 'https://playcanv.as/b/50bfe5b2',
    },
    {
      id: 'card_2',
      title: 'Buddha (Earth Witness)',
      year: '9th-10th century CE',
      description: 'Buddha Calling on Earth to Witness, 800s. Northeastern India, Bihar, Tetravan, Pala Period (750-1197). Chloritic schist; overall: 94 cm (37 in.). The Cleveland Museum of Art, Dudley P. Allen Fund 1935.146',
      image: 'src/assets/img/pic2.png',
      qrValue: 'https://playcanv.as/b/94b30944',
    },
    {
      id: 'card_3',
      title: 'Bodhisattva of Compassion',
      description: 'Bodhisattva of Compassion as Lokeshvara the Sky Flyer (Khasarpana), late 1000s. Eastern India, Bihar, Pala dynasty, reign of Ramapala (reign 1078/79–at least 1130). Kaolinite with traces of pigment; overall: 7.7 cm (3 1/16 in.). The Cleveland Museum of Art, The Severance and Greta Millikin Purchase Fund 1991.155',
      image: 'src/assets/img/pic3.png',
      year: '9th-12th century CE',
      qrValue: 'https://playcanv.as/b/aa3955aa',
    },
    {
      id: 'card_4',
      title: 'Nataraja(Lord of Dance)',
      description: 'Nataraja, Shiva as the Lord of Dance, 1000s. South India, Tamil Nadu, Chola period (900-1200s). Bronze; overall: 113 x 102 x 30 cm (44 1/2 x 40 3/16 x 11 13/16 in.); base: 35 x 24 cm (13 3/4 x 9 7/16 in.). The Cleveland Museum of Art, Purchase from the J. H. Wade Fund 1930.331',
      image: 'src/assets/img/pic4.png',
      year: '5th century CE',
      qrValue: 'https://playcanv.as/b/914364bb',
    },
    {
      id: 'card_5',
      title: 'Somaskanda',
      description: 'Shiva and his wife Uma sit next to each other on double lotus pedestals, between them a residual remnant of their small child, Skanda, now missing from the magnificent bronze. The standard format—known as Somaskanda—arose as early as the 6th century in temples from Tamil Nadu',
      image: 'src/assets/img/pic5.png',
      year: '6th-12th century CE',
      qrValue: 'https://playcanv.as/b/aa3955aa',
    },
    {
      id: 'card_6',
      title: 'Column base',
      description: 'This stone base, carved with a series of dancing female figures, would have supported a temple column. It is of a type seen in the Jain temples at Mt Abu, and Ranakpur where deeply-cut tracery styles of sculpture are found.',
      image: 'src/assets/img/pic6.png',
      year: '11th century AD ',
      qrValue: 'https://playcanv.as/b/9b6e9983',
    },
  ];
  
  return (

    <div className={`min-h-screen ${props.mode  ? 'bg-black' : 'bg-white'} p-8`}>
    <div className="max-w-7xl mx-auto">
        <h1 className={`text-center text-4xl ${props.mode  ? 'text-gold' : 'text-yellow-800'} tracking-wide font-ancient mb-8`}>
            {('Into ancient india (AR) ').toUpperCase()}
        </h1>

    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 ${props.mode ? 'bg-black':'bg-white'}`}>
    
  { modals.map((modal)=>( <QRCard 
        key={modal.id}
        title= {modal.title}
        image={modal.image}
        description={modal.description}
        qrValue={modal.qrValue}
        year={modal.year}
        mode={props.mode}
      />
  ))}    
    </div>
    </div>
    </div>
  );
};

export default AugmentedHolder;
