import React from 'react';

const YogaStoryTemplate = ({ mode }) => {
    const yogaTypes = [
        {
          id: 'hatha',
          name: 'Hatha Yoga',
          img: 'src/assets/img/Hatha_yoga.jpg',
          description: 'A gentle introduction to basic yoga postures.',
          link: 'https://en.wikipedia.org/wiki/Hatha_yoga'
        },
        {
          id: 'vinyasa',
          name: 'Vinyasa Yoga',
          img: 'src/assets/img/Vinyasa_yoga.webp',
          description: 'A dynamic flow of postures synchronized with breath.',
          link: 'https://en.wikipedia.org/wiki/Vinyasa_Krama'
        },
        {
          id: 'ashtanga',
          name: 'Ashtanga Yoga',
          img: 'src/assets/img/Ashtanga_yoga.jpg',
          description: 'A structured, physically demanding sequence of poses.',
          link: 'https://en.wikipedia.org/wiki/Ashtanga_vinyasa_yoga'
        },
        {
          id: 'kundalini',
          name: 'Kundalini Yoga',
          img: 'src/assets/img/kundalini_yoga.webp',
          description: 'Focuses on awakening spiritual energy through movement.',
          link: 'https://en.wikipedia.org/wiki/Kundalini_yoga'
        },
        {
          id: 'yin',
          name: 'Yin Yoga',
          img: 'src/assets/img/yin_yoga.webp',
          description: 'Slow-paced yoga with deep stretching and relaxation.',
          link: 'https://en.wikipedia.org/wiki/Yin_Yoga'
        },
        {
          id: 'bikram',
          name: 'Bikram Yoga',
          img: 'src/assets/img/Bikram_yoga.jpg',
          description: 'A sequence of 26 poses performed in a heated room.',
          link: 'https://en.wikipedia.org/wiki/Bikram_Yoga'
        },
        {
          id: 'iyengar',
          name: 'Iyengar Yoga',
          img: 'src/assets/img/Iyengar_yoga.jpg',
          description: 'Focuses on precise alignment and use of props.',
          link: 'https://en.wikipedia.org/wiki/Iyengar_Yoga'
        },
        {
          id: 'power',
          name: 'Power Yoga',
          img: 'src/assets/img/poweryoga.webp',
          description: 'A high-intensity practice for strength and flexibility.',
          link: 'https://en.wikipedia.org/wiki/Power_Yoga'
        }
      ];
      

    return (
        <div className={`min-h-screen ${mode ? 'bg-black' : 'bg-white'} p-8`}>
            <div className="max-w-7xl mx-auto">
                <h1 className={`text-center text-4xl ${mode ? 'text-gold' : 'text-yellow-800'} tracking-wide font-ancient mb-8`}>
                    {('Types Of Yoga').toUpperCase()}
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {yogaTypes.map((yoga) => (
                        <div key={yoga.id} className="aspect-[9/16] ">
                            <div className={`${mode ? 'bg-black' : 'bg-white'} border border-gray-700 rounded-xl shadow-lg p-4 h-full relative overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out`}>
                                <div className="relative z-10 h-full flex flex-col justify-between">
                                    <div className="absolute top-0 right-0 w-20 h-20 translate-x-12 -translate-y-12">
                                        <div className={`w-full h-full ${mode ? 'bg-white' : 'bg-yellow-800'} rounded-full`} />
                                    </div>
                                    <div>
                                        <h3 className={`text-2xl font-bold ${mode ? 'text-gold' : 'text-yellow-800'} mb-2`}>
                                            {yoga.name}
                                        </h3>
                                        <p className={`text-sm ${mode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                                            {yoga.description}
                                        </p>
                                        {/* Set fixed height and center image */}
                                        <div className="w-full h-80  flex justify-center">
                                            <img src={yoga.img} alt={yoga.name} className="w-full h-full object-cover rounded-md" />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-4">
                                        <a href={yoga.link} className={`${mode ? 'bg-white text-black hover:bg-gray-300' : 'bg-black text-white hover:bg-gray-800'} px-4 py-1 rounded-full text-sm w-fit transition-colors`}>
                                            Read More
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default YogaStoryTemplate;
