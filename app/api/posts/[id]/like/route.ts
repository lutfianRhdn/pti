import getResponse from "@/utils/getResponse";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from 'next-auth';

const prisma = new PrismaClient();
export async function POST(req: Request,{params}:any) {
  const { id } = params
  const session = await getServerSession();
  if (!session) return getResponse({}, "Unauthorized", 401);
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email ||'' }
  })
  const post = await prisma.post.findUnique({
    where: { id: +id },

  })
  if (!post) return getResponse({}, "Post Not Found", 404);  
  const liked = await prisma.likeOnPost.findFirst({
    where: {
      postId: +id,
      userId: user?.id
    }
  })
  if(liked){
    await prisma.likeOnPost.delete({
      where: {
        id: liked.id
      }
    })
  }
  else {
    await prisma.likeOnPost.create({
      data: {
        postId: +id,
        userId: user?.id ||0
      }
    })
  }
  return getResponse({}, 'Posts Liked Craeted Successfully', 200);
}