import React from 'react'
import { useState, useEffect } from 'react';
import Header from '../Components/Header';
import HeroCarousel from '../Components/HeroCarousel';
import FilterPane from '../Components/FilterPane';
import Cart from '../Components/Cart';
import FeatureProduct from '../Components/FeatureProduct';
import Footer from '../Components/Footer';
const Home = (props) => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-inter">
    <HeroCarousel />
     <FeatureProduct />
      / <Footer /> 
    </div>
  );
}

export default Home
