import getResponse from '@/utils/getResponse';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export const dynamic = 'force-dynamic'
export async function GET(req: Request,{params}:any) {
  const {id} = params
  const post = await prisma.post.findUnique({
    where: { id: +id },
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
