import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, {params}) => {
    try {
        await connectToDB();
        const prompts = await Prompt.findById(params.id).populate('creator');

        if(!prompts) {
            return new Response("Prompt not found", { status: 404 });
        }

        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        console.error("Error fetching prompts:", error.message);
        return new Response("Failed to fetch all prompts", { status: 500 });
    }
} 

export const PATCH = async (request, {params}) => {
    const {prompt, tag} = await request.json();

    try{
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id);
        if(!existingPrompt) {
            return new Response("Prompt not found", { status: 404 });
        }

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), { status: 200 });
    }
    catch(error){
        console.error("Error updating prompt:", error.message);
        return new Response("Failed to update prompt", { status: 500 });
    }
}

export const DELETE = async (request, {params}) => {
    try {
        await connectToDB();
        await Prompt.findByIdAndDelete(params.id);
        return new Response("Prompt deleted successfully", { status: 200 });

    } catch (error) {
        return new Response("Failed to delete prompt", { status: 500 });
    }
}