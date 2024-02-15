import getNasaPicture from '@/utils/getNasaPicture';
import getResponse from '@/utils/getResponse';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export const dynamic = 'force-dynamic'
export async function GET(req: Request,) {
  const nassaNow = await getNasaPicture()
  const nowPost = await prisma.post.findFirst({
    where: {
      created_at: {
        gte: new Date(new Date().setHours(0, 0, 0)),
      },
    }
  })
  if (!nowPost) await prisma.post.create({
    data: {
      title: nassaNow.title,
      image: nassaNow.hdurl,
      caption: nassaNow.explanation,      
    }
  })
  const post = await prisma.post.findFirst({
    where: { created_at: {
        gte: new Date(new Date().setHours(0, 0, 0)),
      }, },
    include: {
      comments: {
        select: {
          comment: {
            include:{ author: true, }
          },
        }
      },
      events: {
        include: {
          author: true,
          comments: true,
          likes: true
        }
      },
      likes:true,
    }
  })
  
  return getResponse(post, 'Posts Fetched Successfully', 200);
}
