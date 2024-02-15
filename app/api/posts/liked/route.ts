import getResponse from '@/utils/getResponse';
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth';
const prisma = new PrismaClient()
export const dynamic = 'force-dynamic'
export async function GET(req: Request, { params }: any) {
  const session = await getServerSession()
  const {searchParams} = new URL(req.url);
  const email = searchParams.get("email");
  
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string  || email as string
    }
  })
  if (!user) return getResponse({}, 'Unauthorized', 401);
  const post = await prisma.post.findMany({
    where: { 
      likes: {
        some: {
          userId: user.id
        }
      },
     },
    include: {
      comments: true,
      events: true,
      likes: true,
    }
  })
  return getResponse(post, 'Posts Fetched Successfully', 200);
}
