"use client"
import { UserProfile } from "@clerk/nextjs";

export default function ProfilePage() {
    return (
        <div className="p-4 mx-auto pt-10 w-full flex justify-center items-center">
            <UserProfile />
        </div>
    );
}
