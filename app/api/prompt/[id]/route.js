import Prompt from "@models/prompt";
import { dbConnect } from "@utils/database";

export const GET=async(request,{params})=>{
   
    try {
        await dbConnect();
      
        const prompt= await Prompt.findById(params.id).populate("creator");
        if(!prompt) return new Response("prompt not found", {status:404});
        
        return new Response(JSON.stringify(prompt),{status:200});
    } 
    catch (error) {
        return new Response("Internal server Error",{status:500})
        
    }
}

export const PATCH = async (request,{params})=>{
   
    try {
        dbConnect();
        const {prompt,tag}=await request.json();

        const promptExists= await Prompt.findById(params.id);
        if(!promptExists) return new Response("prompt not found", {status:404});
        
        promptExists.prompt=prompt;
        promptExists.tag=tag;

        await promptExists.save();
        
        return new Response("Successfully updated the Prompts", { status: 200 });
    } 
    catch (error) {
        return new Response("Error Updating Prompt", { status: 500 });
    }
}

export const DELETE = async (req,{params})=>{
    try {
        await dbConnect();

        await Prompt.findByIdAndDelete(params.id);
        return new Response("Prompt deleted successfully", { status: 200 });
    } 
    catch (error) {
        return new Response("Error deleting prompt", { status: 500 });
    }
}