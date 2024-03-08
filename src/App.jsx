import React from 'react';
import AddPost from './components/AddPost.jsx';
import ListingPosts from './components/ListingPosts.jsx';
import Header from './components/Header.jsx';
import './App.css';

const App = () => {
  return (
    <>
      <Header />
      <div className='container mx-auto'>
        <h1 className='welcome-message'>
          Welcome to the blog website of <strong className='text-[#454141]'>ad<strong className='text-[#313030]'>cash</strong></strong>
        </h1>
        <div>
          <AddPost />
          <ListingPosts />
        </div>
      </div>
      <div className="bg-[#ffb32c] text-center py-20 text-xl">
        <p className="text-center font-bold text-white py-3">
          © 2024 Copyright :  <strong className='text-purple-900'> <a href="https://adcash.com/" target="_blank">adcash.com</a></strong>
        </p>
        <p className='text-white font-bold'>Site by<strong className='text-purple-900'> <a href="https://www.linkedin.com/in/eldaniz-akbarzade-60791b179/" target="_blank"><i>Eldaniz Akbarzade</i></a> </strong></p>
      </div>
    </>
  );
};

export default App;
