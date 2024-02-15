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
  const post = await prisma.event.findUnique({
    where: { id: +id },

  })
  if (!post) return getResponse({}, "Event Not Found", 404);  
  const liked = await prisma.likeOnEvent.findFirst({
    where: {
      eventId: +id,
      userId: user?.id
    }
  })
  if(liked){
    await prisma.likeOnEvent.delete({
      where: {
        id: liked.id
      }
    })
  }
  else {
    await prisma.likeOnEvent.create({
      data: {
        eventId: +id,
        userId: user?.id ||0
      }
    })
  }
  return getResponse({}, 'Posts Liked Craeted Successfully', 200);
}