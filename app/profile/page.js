"use client"

import Profile from "@components/Profile"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
    const {data:session} = useSession();
    const [myposts, setmyposts] = useState([]);
    const router = useRouter();
 
    const fetchpost=async()=>{
        
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data= await response.json();
   
        setmyposts(data);
    }
    
    useEffect(()=>{
        if(session?.user.id) fetchpost();
    },[session?.user.id]);

    const handleEdit = (post)=>{
      router.push(`/update-prompt?id=${post._id}`)
    }
    const handleDelete = async (post)=>{
      const confirmed = confirm("Are you sure you want to delete this prompt?");

      if(confirmed){
        try{
          await fetch(`/api/prompt/${post._id.toString()}`,{
            method:"DELETE",
          })

          const filteredPosts = myposts.filter((item) => item._id !== post._id);
          setmyposts(filteredPosts);
        }
        catch(error){
          console.log(error);
        }
      }
    }

  return (
    <Profile
        name='My'
        desc='Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination'
        data={myposts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        
    />
  )
}

export default page