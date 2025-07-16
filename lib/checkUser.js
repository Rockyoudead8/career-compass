import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";


export async function checkUser() {
    const user = await currentUser();
    if (!user) {
        return null; // User is not authenticated
    }

    // Check if the user exists in the database
    try {
        const dbUser = await db.user.findUnique({
            where: {
                clerkUserId: user.id
            },
        });

        if (!dbUser) {
            // If user does not exist, create a new user record
            return await db.user.create({
                data: {
                    clerkUserId: user.id,
                    email: user.emailAddresses[0].emailAddress || "",
                    name: user.fullName || "",
                    imageurl: user.imageUrl || "",
                },
            });
        }
        return dbUser; // Return existing user
    } catch (error) {
        console.error("Error checking user in database:", error);
        return null; // Return null if there's an error

    }


}