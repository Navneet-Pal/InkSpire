"use client"
import Link from 'next/link'
import React from 'react'

const Form = ({ type, post, setPost, submitting, submitHandler }) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>

        <h1 className='head_text text-left blue_gradient'>
            {type} Post
        </h1>

        <p className='desc text-left max-w-md'>
            {type} and share amazing prompts with the world, and let your
            imagination run wild with any AI-powered platform
        </p>

        <form onSubmit={submitHandler} 
            className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
        >

            <label >
                <span className='font-satoshi font-semibold text-base text-gray-700'>Your AI Prompt</span>
                <textarea 
                    value={post.prompt}
                    onChange={(e)=> setPost({prompt:e.target.value, ...post })}
                    placeholder='Write your post here'
                    required
                    className='form_textarea '
                
                />

            </label>

            <label >
                <span className='font-satoshi font-semibold text-base text-gray-700'>
                    Tag <span className='text-sm font-normal'>
                        ( #product, #webdevelopment, #idea, etc.)
                    </span>
                </span>
                <textarea 
                    value={post.tag}
                    onChange={(e)=> setPost({...post, tag:e.target.value})}
                    placeholder='#tag'
                    required
                    className='form_textarea '
                
                />

            </label>

            <div className='flex-end mx-3 mb-5 gap-4'>
            
                <Link href='/' className='text-grey-500 text-sm'>
                    Cancel
                </Link>

                <button type='submit'
                    className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
                >
                    {submitting ? (`${type}ing...`):(type)}
                </button>
            
            </div>
        
        
        </form>
    
    </section>
  )
}

export default Form