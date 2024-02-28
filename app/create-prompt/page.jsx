"use client"
import Form from '@components/Form'
import React, { useState } from 'react'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CreatePrompt = () => {
    const router = useRouter();
    const { data: session } = useSession();
    
    const [post, setPost]= useState({prompt:"",tag:""});
    const [submitting,setSubmitting]=useState(false);

    const createPrompt = async(e)=>{
        e.preventDefault();
        setSubmitting(true);
       
        try {
            console.log(post)
            console.log(session?.user.id)
            const response = await fetch("/api/prompt/new",{
                method:"POST",
                body: JSON.stringify({
                    prompt:post.prompt,
                    userId: session?.user.id,
                    tag: post.tag,    
                }),
                
            });
            if (response.ok) {
                router.push("/");
            }
            setSubmitting(false);
        } 
        catch (error) {
            console.log(error);
        }
    }

  return (
    <Form 
        type={"Create"}
        post={post}
        setPost={setPost}
        submitting={submitting}
        submitHandler={createPrompt}
    
    />
  )
}

export default CreatePrompt;