import React from 'react';
import Image from 'next/image';
import landingbackground from '../../public/holographic-rainbow2.jpg'

export default function Home() {
  return <div>
    
    <div className="relative w-full overflow-hidden">
      <Image
        src={landingbackground}
        alt="Landing Page Background Graphic"
        className="w-full h-auto"
      />

      <div className="text-5xl text-black absolute inset-0 flex flex-col items-center justify-center text-center">
        <p >Welcome to...</p>
        <h1 className="text-9xl">Art 1O1</h1>
        <p>create &#x2022; learn &#x2022; share</p>
      </div>
    </div>

    <div className="flex flex-col items-center justify-center">
      <h1 className="text-9xl">Featured Topics</h1>
      <p>Here is a list of tags that our community members decide weekly should be focused.</p>
      <div></div>
    </div>

    <div className="flex flex-row items-center justify-center">
      <div className="w-1/2 flex flex-col items-center justify-center">
        <h1 className="text-9xl">Join Us!</h1>
        <p>Together we are a large community of artists striving to improve and share our skills. Join our moderated resource archive where you can post, learn, and share!</p>
      </div>
      <div className="w-1/2 flex flex-col items-center justify-center">
        <div className="border-2 border-solid border-black rounded-lg p-4">
          <h1>Learn More</h1>
        </div>
        <div className="border-2 border-solid border-black rounded-lg p-4">
          <h1>Sign-Up</h1>
        </div>
      </div>

    </div>
    
  </div>;
}