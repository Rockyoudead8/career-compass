import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({
  id: "careeerCampus",
  name: "Career Campus",
  signingKey: process.env.INNGEST_SIGNING_KEY, 
  credentials: {
    gemini: {
      apiKey: process.env.GEMINI_API_KEY
    }
  }
});
