import { PrismaClient } from "@prisma/client"
import { getServerSession } from 'next-auth';
import getResponse from "@/utils/getResponse";
const prisma = new PrismaClient()
export const dynamic = 'force-dynamic'
export async function GET(req: Request,) {
  const session = await getServerSession()
  
  const {searchParams} = new URL(req.url);
  const email = searchParams.get("email");
  

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string  || email as string
    }
  })
  const posts = await prisma.post.findMany({
    where: {
      events: {
        some: {
          authorId: user?.id
        }
      }
    },
    include: {
      likes: true,
      comments: true,
      events: true
    }
  })

  // const events = await prisma.event.findMany({
  //   where: {
  //     authorId: user?.id
  //   },
  //   include: {
  //     likes: true,
  //     comments: true,
  //     author: true
  //   }
  // })
  return getResponse(posts, 'Events Fetched Successfully', 200);
}