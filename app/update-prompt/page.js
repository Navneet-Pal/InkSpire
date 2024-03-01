"use client"
import Form from '@components/Form'
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import { useState,useEffect } from 'react';

const UpdatePrompt  = () => {

  const [post, setPost] = useState({ prompt: "", tag: "", });
  const [submitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams()
  const promptId = searchParams.get("id");

  useEffect(()=>{
    const getPromptDetails =async ()=>{
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      setPost({
        prompt:data.prompt,
        tag:data.tag,
      })
    }

    if (promptId) getPromptDetails();
  },[promptId]);

  const updatePrompt=async(e)=>{
    e.preventDefault();
    setIsSubmitting(true);
    if(!promptId) return alert("Missing PromptId!")

    try {
      
      const response = await fetch(`/api/prompt/${promptId}`,{
        method:"PATCH",
        body:JSON.stringify({
          prompt:post.prompt,
          tag:post.tag,
        }),
      });
      
      if(response.ok){
        router.push("/");
      }
    } 
    catch (error) {
      console.log(error);
    } finally{
      setIsSubmitting(false);
    }
  }

  return (
    <Form
      type={"Edit"}
      post={post}
      setPost={setPost}
      submitting={submitting}
      submitHandler={updatePrompt}
    />
  )
}

export default UpdatePrompt 