import Prompt from "@models/prompt";
import { dbConnect } from "@utils/database";

export const GET=async(request, {params} )=>{
    try {
        await dbConnect();
        const data = await Prompt.find({creator:params.id}).populate("creator")

        return new Response(JSON.stringify(data),{status:200});
    } catch (error) {
        return new Response("failed to get user posts",{status:500});
    }
}