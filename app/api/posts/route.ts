import getNasaPicture from '@/utils/getNasaPicture';
import getResponse from '@/utils/getResponse';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export const dynamic = 'force-dynamic'
export async function GET(req: Request,) {
  const posts = await prisma.post.findMany({
    include: {
      likes: true,
      comments: true,
      events: true
    },
    orderBy: {
      created_at: 'desc'
    }
  })
  return getResponse(posts, 'Posts Fetched Successfully', 200);
}

export async function POST(req: Request,) {
  const nasa = await getNasaPicture(new Date().toISOString().split('T')[0])
  const posts = await prisma.post.create({
    data: {title:nasa.title,caption:nasa.explanation,image:nasa.hdurl,published:true}
  })
  return getResponse(posts, 'Posts Craeted Successfully', 200);
}