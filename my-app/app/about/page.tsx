import Image from 'next/image';
import landingbackground from '../../public/holographic-rainbow2.jpg'
import artistsclipart from '../../public/clipart-artists.jpg'
import worldart from '../../public/world.jpg'


export default function About() {
  return <div>
    
    <div className="relative w-full overflow-hidden">
      <Image
        src={landingbackground}
        alt="Landing Page Background Graphic"
        className="w-full h-auto"
      />

      <div className="text-5xl text-black absolute inset-0 flex flex-col items-center justify-center text-center">
        <h1 className="text-9xl">About Us</h1>
        <p>ART 1O1</p>
      </div>
    </div>

    <div className="flex flex-row items-center justify-center">
      <div className="w-1/2 items-center justify-center">
        <h1>What is ART 1O1?</h1>
        <p>The 1O1 Project proposes a web app that functions as a resource-curation platform and organization tool for artists. Artists often have to sort through large amounts of content to find helpful material, while their saved resources remain scattered across different platforms. On this platform, users will be able to share resources that they have personally used and found helpful, as well as view recommended resources from other artists. Users will also be able to easily search through categories and tags to find high-quality resources suited to their proficiency and needs. Additionally, users can save their favorite resources to their accounts, keeping useful materials from different platforms all organized in one central location. User feedback on posts through likes and comments will also help highly-rated art resources stand out and support as many artists as possible.</p>
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <Image 
          src={worldart}
          alt="Clipart of the earth"
        />
      </div>
      
    </div>

    <div className="flex flex-row items-center justify-center">
      <div className="w-1/2 flex items-center justify-center">
        <Image 
          src={artistsclipart}
          alt="Clipart of artists learning"
        />
      </div>
      <div className="w-1/2 items-center justify-center">
        <h1>Our Mission</h1>
        <p>We want to connect artists with each other so we can all develop our skills. As artists we learn better together! Join our community of artists from all levels of experience in a single goal. To improve!</p>
      </div>
    </div>
    
  </div>;
}