import React from 'react';
import Image from 'next/image';
import landingbackground from '../../public/holographic-rainbow2.jpg'
import ResourceTag from '../../components/ResourceTag';
import Link from 'next/link';

const FeaturedTopicsTags = [
  <ResourceTag key="1" name="Watercolor" type="medium" />,
  <ResourceTag key="2" name="Fish" type="topical" />,
  <ResourceTag key="3" name="Oil" type="medium" />,
  <ResourceTag key="4" name="Epilepsy" type="warning" />,
  <ResourceTag key="5" name="Graphite" type="medium" />,
  <ResourceTag key="6" name="Architecture" type="topical" />,
  <ResourceTag key="7" name="Project Hail Mary" type="topical" />,
  <ResourceTag key="8" name="Body Horror" type="warning" />,
];

export default function Home() {
  return <div>
    
    <div className="relative w-full overflow-hidden">
      <Image
        src={landingbackground}
        alt="Landing Page Background Graphic"
        className="w-full h-150"
      />

      <div className="text-5xl text-black absolute inset-0 flex flex-col items-center justify-center text-center">
        <p>Welcome to...</p>
        <h1 className="text-9xl font-londrina font-bold">Art 1O1</h1>
        <p>create &#x2022; learn &#x2022; share</p>
      </div>
    </div>

    <div className="w-full overflow-hidden flex flex-col items-center justify-center pt-16">
      <h1 className="text-6xl text-black">Featured Topics</h1>
      <p className="pt-2 text-2xl text-black">Here is a list of tags that our community members decide weekly should be focused.</p>
      
      <div className="flex flex-row flex-wrap pt-10 items-center justify-center">
        <div className="w-1/2 overflow-hidden py-6">
          <div className="relative flex overflow-x-hidden">
            <div className="animate-marquee flex">
              {[...FeaturedTopicsTags, ...FeaturedTopicsTags].map((tag, index) => (
                <div key={index} className="shrink-0 pr-4">
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row flex-wrap pt-0 items-center justify-center">
        <div className="w-1/2 overflow-hidden py-6">
          <div className="relative flex overflow-x-hidden">
            <div className="animate-marquee flex">
              {[...FeaturedTopicsTags, ...FeaturedTopicsTags].map((tag, index) => (
                <div key={index} className="shrink-0 pr-4">
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row flex-wrap pt-0 items-center justify-center">
        <div className="w-1/2 overflow-hidden py-6">
          <div className="relative flex overflow-x-hidden">
            <div className="animate-marquee flex">
              {[...FeaturedTopicsTags, ...FeaturedTopicsTags].map((tag, index) => (
                <div key={index} className="shrink-0 pr-4">
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>

    <div className="flex flex-row items-center justify-center pt-16 pr-16 pl-16 pb-20 m-10">
      <div className="w-1/2 flex flex-col items-center justify-center">
        <h1 className="text-6xl text-black">Join Us!</h1>
        <p className="pt-2 text-2xl text-black">Together we are a large community of artists striving to improve and share our skills. Join our moderated resource archive where you can post, learn, and share!</p>
      </div>
      <div className="w-1/2 flex flex-col items-center justify-center">
        <Link 
          className="w-5/6 mt-10 border-2 border-solid border-black rounded-lg p-4 bg-pink-100"
          href="../about">
          <h1 className="text-black">Learn More</h1>
        </Link>
        <Link 
          className="w-5/6 mt-10 border-2 border-solid border-black rounded-lg p-4 bg-blue-100"
          href="../account-management/signup">
          <h1 className="text-black">Sign Up</h1>
        </Link>
      </div>
    </div>
    
  </div>;
}