import React from 'react';
import Sections from '../Sections/Sections';

const Banner = () => {
  return (
    <div className='banner'>
      <div className='container'>
        <h1 className='logo'>Spring Boot - React App</h1>
        <p>various demonstrations</p>
      </div>
    </div>
  );
};

const Home = () => {
  return (
  <div className='home-page'>
    <Banner />
    <Sections />
  </div>
  );
};

export default Home;
