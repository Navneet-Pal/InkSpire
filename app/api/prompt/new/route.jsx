import Prompt from "@models/prompt";
import { dbConnect } from "@utils/database";



export const POST = async(req)=>{
    try {
        await dbConnect();
        
        const {prompt,userId,tag} = await req.json();
        console.log(prompt)
      
        const newPrompt= new Prompt({
            creator:userId,
            prompt,
            tag
        });

        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt), { status: 201 })

    } catch (error) {
        return new Response("Failed to create a new prompt", { status: 500 });
    }

}