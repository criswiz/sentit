import type { NextApiRequest, NextApiResponse  } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export default  async function handler (
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST"){
        const session = await getServerSession( req, res , authOptions)
        if (!session) 
            return res.status(401).json({message: "Please sign in to make a post"})

        const title: string = req.body.title

        //Get User
        const prismaUser = await prisma.user.findUnique({
            where: {email: session?.user?.email as string}
        })

        if(title.length > 300)
            return res.status(403).json({message: "Post must be less than 300 characters"})
        if(!title.length)
            return res.status(403).json({message: "Post field cannot be empty"})

        
        //Create post
        try {
            if (prismaUser != null){
                const result = await prisma.post.create({
                    data: {
                        title,
                        userId: prismaUser.id,
                    }
                })
                res.status(200).json(result)
            }
        } catch (error) {
            res.status(403).json({err: "Error creating post"})
        }
    }

}
