'use client'
import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const Feed = () => {
  

  const [prompts, setprompts] = useState([]);
  const [searchtext, setsearchtext] = useState("");
  const [searchedResults, setSearchedResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);

 
  const fetchPrompts= async()=>{
    const response = await fetch("/api/prompt");
    const data= await response.json();
    console.log(data)

    setprompts(data);
  }

  useEffect(()=>{
    fetchPrompts();
  },[]);

  const handleSearchChange = (e)=>{
    clearTimeout(searchTimeout);
    setsearchtext(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
    
  }

  const filterPrompts=(tagname)=>{
    const regex= new RegExp(tagname,"i");
    return prompts.filter( (item)=>
        regex.test(item.creator.username) ||
         regex.test(item.tag) ||
         regex.test(item.prompt)
        
      )
  }

  const handleTagClick=(tagname)=>{
    setsearchtext(tagname);
    const serachresult = filterPrompts(tagname);
    setSearchedResults(serachresult);
  }

  return (
    <div className="feed">

      <form className='relative w-full flex-center'>
        <input
          type="text"
          name="searchbar"
          placeholder="Search for a tag or a username"
          value={searchtext}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />

      </form>

      {
        searchtext ?(
          <div className='mt-16 prompt_layout'>
            {
              searchedResults.map((item)=>(
                <PromptCard key={item._id} item={item} handleTagClick={handleTagClick} />
              ))
            }
          </div>
        ):(
          <div className='mt-16 prompt_layout'>
            {
              prompts.map((item)=>(
                <PromptCard key={item._id} item={item} handleTagClick={handleTagClick} />
              ))
            }
          </div>
        )

      }

    </div>
  )
}

export default Feed