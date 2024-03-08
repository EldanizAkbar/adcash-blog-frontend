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
    </>
  );
};

export default App;
