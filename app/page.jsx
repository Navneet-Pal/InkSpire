import Feed from '@components/Feed'
import React from 'react'

const Home = () => {
  return (
    <div className='w-full flex-center flex-col'>

      <h1 className='head_text text-center'>
        Discover & share
        <br className='max-md:hidden'/>
        <span className='orange_gradient text-center'> AI-Powered Prompts</span>
      </h1>

      <p className='desc text-center'>
        InkSpire is an open-source AI prompting tool for modern world to discover, create and share creative prompts
      </p> 

      <Feed/>

    </div>
  )
}

export default Home