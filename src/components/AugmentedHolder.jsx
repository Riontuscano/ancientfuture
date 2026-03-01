import React from 'react';
import QRCard from './AugmentatedCard';
import { model } from 'mongoose';

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

  const modals2 = [
    {
      id: 'card_1',
      title: 'Rhino',
      description: 'Rhinoceroses are large, herbivorous mammals known for their thick skin and distinctive horns. They are found in Africa and Asia and are critically endangered due to poaching and habitat loss.',
      image: 'src/assets/img/rhino.jpeg',
      year: 'Prehistoric to Present',
      qrValue: 'https://playcanv.as/b/b031ee02',
    },
    {
      id: 'card_2',
      title: 'Giraffe',
      description: 'The giraffe is the tallest living terrestrial animal, recognized for its long neck and unique spotted coat. It inhabits African savannas, feeding on tree leaves using its long tongue.',
      image: 'src/assets/img/giraffe.jpg',
      year: 'Ancient to Present',
      qrValue: 'https://playcanv.as/b/cb0725eb',
    },
    {
      id: 'card_3',
      title: 'Cow',
      description: 'Cows are domesticated bovines that have been integral to agriculture for thousands of years, providing milk, meat, and labor. They are revered in various cultures, particularly in India.',
      image: 'src/assets/img/cow.jpg',
      year: 'Domesticated for Over 10,000 Years',
      qrValue: 'https://playcanv.as/b/c13e97b6',
    },
    {
      id: 'card_4',
      title: 'Banana Tree',
      description: 'The banana tree is a fast-growing tropical plant that produces bananas, one of the most widely consumed fruits in the world. Its leaves are also used for cooking and packaging food.',
      image: 'src/assets/img/banana.png',
      year: 'Cultivated for Over 7,000 Years',
      qrValue: 'https://playcanv.as/b/158eb55a',
    },
    {
      id: 'card_5',
      title: 'Pine Tree',
      description: 'Pine trees are evergreen conifers with needle-like leaves and woody cones. They are found across the globe and are commonly used for timber, resin, and as Christmas trees.',
      image: 'src/assets/img/pine.png',
      year: 'Ancient to Present',
      qrValue: 'https://playcanv.as/b/fe2b208d',
    },
    {
      id: 'card_6',
      title: 'Triceratops Baby Dinosaur',
      description: 'Triceratops was a large, herbivorous dinosaur from the Late Cretaceous period. Its three horns and frilled skull made it one of the most recognizable dinosaurs of its time.',
      image: 'src/assets/img/trice.jpg',
      year: '68-66 Million Years Ago',
      qrValue: 'https://playcanv.as/b/d3f3d747',
    },
    {
      id: 'card_7',
      title: 'Suchomimus',
      description: 'Suchomimus was a spinosaurid dinosaur that lived during the Early Cretaceous period. It had a long, crocodile-like snout, suggesting a diet that primarily consisted of fish.',
      image: 'src/assets/img/waterdino.jpg',
      year: '112 Million Years Ago',
      qrValue: 'https://playcanv.as/b/2decd32e',
    },
  ];


  return (

    <div className={`min-h-screen ${props.mode ? 'bg-black' : 'bg-white'} p-4 md:p-8 pt-20`}>
      <div className="max-w-7xl mx-auto">
        <h1 className={`text-center text-2xl md:text-4xl ${props.mode ? 'text-gold' : 'text-yellow-800'} tracking-wide font-ancient mb-6 md:mb-8`}>
          {('Into ancient india (AR) ').toUpperCase()}
        </h1>

        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 p-2 md:p-4 ${props.mode ? 'bg-black' : 'bg-white'}`}>

          {modals.map((modal) => (<QRCard
            key={modal.id}
            title={modal.title}
            image={modal.image}
            description={modal.description}
            qrValue={modal.qrValue}
            year={modal.year}
            mode={props.mode}
          />
          ))}
        </div>
        <h2 className={`text-center mt-12 md:mt-20 text-2xl md:text-4xl ${props.mode ? 'text-gold' : 'text-yellow-800'} tracking-wide font-ancient mb-6 md:mb-8`}>
          {('Animal Kingdom And Trees').toUpperCase()}
        </h2>

        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 p-2 md:p-4 ${props.mode ? 'bg-black' : 'bg-white'}`}>

          {modals2.map((modal) => (<QRCard
            key={modal.id}
            title={modal.title}
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
