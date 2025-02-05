import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './GuruHolder.css';

gsap.registerPlugin(ScrollTrigger);

const cardData = [
  {
    id: 'card_1',
    title: 'Aryabhata (476-550 CE)',
    description: 'Aryabhata was one of the greatest mathematicians and astronomers of ancient India. He introduced the concept of zero and calculated the value of pi. He also accurately estimated the Earth’s rotation period and laid the foundation for algebra and trigonometry.',
    image: 'https://i.pinimg.com/736x/ed/5e/44/ed5e4459a084522b9f1e9dda65287722.jpg',
  },
  {
    id: 'card_2',
    title: 'Charaka (2nd century CE)',
    description: 'Charaka is regarded as the father of Indian medicine and authored the "Charaka Samhita," a comprehensive text on Ayurveda. This work provided insights into diagnostics, treatment methods, and the importance of holistic healing in medicine.',
    image: 'https://i.pinimg.com/736x/c2/98/f7/c298f7886847f02d9d3e0ad2fa4f9c70.jpg',
  },
  {
    id: 'card_3',
    title: 'Sushruta (6th century BCE)',
    description: 'Sushruta is celebrated as the father of surgery and the author of the "Sushruta Samhita." This ancient text describes various surgical techniques, including cataract surgery, reconstructive methods, and the use of surgical instruments.',
    image: '/Sushruta.jpeg',
  },
  {
    id: 'card_4',
    title: 'Bhaskara I (600-680 CE)',
    description: 'Bhaskara I expanded on Aryabhata’s theories and introduced sine functions in trigonometry. His works, such as "Mahabhaskariya," contain detailed observations on planetary motions and eclipses, marking significant advancements in astronomy.',
    image: 'src/assets/img/Bhaskara.jpg',
  },
  {
    id: 'card_5',
    title: 'Patanjali (2nd century BCE)',
    description: 'Patanjali compiled the "Yoga Sutras," a foundational text for yoga philosophy. He also contributed to Sanskrit grammar through his work on Panini’s "Ashtadhyayi." His teachings continue to influence both linguistic studies and modern wellness practices.',
    image: 'src/assets/img/Patanjali.webp',
  },
  {
    id: 'card_6',
    title: 'Varahamihira (505-587 CE)',
    description: 'Varahamihira authored the "Brihat Samhita," an encyclopedic text covering astronomy, astrology, architecture, and weather science. His contributions significantly advanced Indian astronomy and predictive sciences.',
    image: 'src/assets/img/Varahamihira.jpeg',
  },
  {
    id: 'card_7',
    title: 'Panini (6th-4th century BCE)',
    description: 'Panini, a linguistic scholar, authored the "Ashtadhyayi," a detailed text on Sanskrit grammar. His work laid the foundation for modern linguistics by defining rules for phonetics and morphology, preserving Sanskrit for generations.',
    image: 'src/assets/img/Panini.webp',
  },
  {
    id: 'card_8',
    title: 'Brahmagupta (598-668 CE)',
    description: 'Brahmagupta introduced rules for zero and negative numbers and explained methods for solving quadratic equations. His work, "Brahmasphutasiddhanta," also explored planetary motion and solar eclipses, influencing mathematics and astronomy.',
    image: 'src/assets/img/brahmagupta.webp',
  },
  {
    id: 'card_9',
    title: 'Kanada (6th century BCE)',
    description: 'Kanada, the founder of the Vaisheshika school of philosophy, proposed an early atomic theory of matter. He suggested that all matter is composed of indivisible particles called "anus," bridging science and spirituality in his philosophy.',
    image: 'src/assets/img/Kanada.webp',
  },
  {
    id: 'card_10',
    title: 'Nagarjuna (150-250 CE)',
    description: 'Nagarjuna, a chemist and alchemist, explored the transformative properties of metals in his text "Rasaratnakara." He made significant advancements in metallurgy and medical chemistry, influencing both science and spiritual traditions.',
    image: 'src/assets/img/Nagarjuna.jpeg',
  },
];


const GuruHolder = ({mode}) => {
  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current.forEach((cardEl, index) => {
      gsap.fromTo(
        cardEl,
        {
          opacity: 0,
          scale: 0.8,
          y: 100,
          rotationX: 45,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotationX: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardEl,
            start: 'top bottom-=100',
            end: 'top center',
            scrub: 1,
          },
        }
      );

      gsap.to(cardEl.querySelector('figure img'), {
        scale: 1.2,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: cardEl,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });
  }, []);

  return (
    <>
      <header className={`${mode ? 'bg-black' : 'bg-white'} p-10 border-t-2 border-gray-600`}>
        <div className="text-center py-16">
          <h1 className={`text-center text-4xl ${mode ? 'text-gold' : 'text-yellow-800'} tracking-wide font-ancient`}>{('Gurus That Shape India').toUpperCase()}</h1>
        </div>
      </header>

      <main className={`${mode ? 'bg-black' : 'bg-white'} p-10`}>
      <ul
  id="cards"
  className=" relative grid grid-cols-1 max-w-4xl mx-auto gap-[4vw] py-8 px-4"
>
  {cardData.map((card, index) => (
    <li
      key={card.id}
      className="sticky top-[calc(var(--index)*1em)] perspective-1000"
      ref={(el) => (cardsRef.current[index] = el)}
      style={{
        '--index': index + 1,
        '--card-color': card.color,
      }}
    >
      <div className={`grid grid-cols-2 ${mode ? 'bg-black' : 'bg-white'} border border-gray-700 rounded-xl overflow-hidden shadow-lg transition-all`}>
        <div
          className={`flex flex-col justify-center p-8`}
          
        >
          <h2 className={`text-2xl tracking-wide font-ancient mb-4 ${mode ? 'text-gold' : 'text-yellow-800'}`}>{card.title}</h2>
          <p className="mb-6 opacity-90">{card.description}</p>
          <p
      
            className="inline-block bg-white bg-opacity-20 text-white px-6 py-3 rounded-lg transition"
          >
         
          </p>
        </div>
        <figure className="overflow-hidden w-full h-96">
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-full object-cover transition-transform"
          />
        </figure>
      </div>
    </li>
  ))}
</ul>

      </main>
    </>
  );
}

export default GuruHolder;
