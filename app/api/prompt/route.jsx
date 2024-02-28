import Prompt from "@models/prompt";
import { dbConnect } from "@utils/database";

export const GET= async(req,res)=>{
    try {
        await dbConnect();
        const data = await Prompt.find({}).populate('creator');

        return new Response(JSON.stringify(data), {status:200})

    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
}