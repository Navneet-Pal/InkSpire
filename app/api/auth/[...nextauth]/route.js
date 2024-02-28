import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import { dbConnect } from "@utils/database";
import User from '@models/user';

const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENTID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        })
    ],

    callbacks:{

        async session({session}){
            //store the user id from mongodb to session
            const sessionUser = await User.findOne({email:session.user.email});
            session.user.id = sessionUser._id.toString();
            return session;
        },

        async signIn({profile}){
            try {
                await dbConnect();

                //check if user already exists
                const userExists = await User.findOne({email:profile.email});

                //if not,create a new user in db
                if(!userExists){
                    await User.create({
                        email:profile.email,
                        username:profile.name.replace(" ","").toLowerCase(),
                        image:profile.picture,
                    });
                }
                console.log('bhai banda signin huha hai')
                return true;

            } catch (error) {
                console.log("Error checking if user exists: ", error.message);
                return false;
            }
        }
    }
})

export {handler as GET, handler as POST};