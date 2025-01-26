import User from "@models/user"; // Pastikan path model benar
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const user = await User.findById(params.id);

        if (!user) {
            return new Response("User not found", { status: 404 });
        }

        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        console.error("Error fetching user:", error.message);
        return new Response("Failed to fetch user", { status: 500 });
    }
};
