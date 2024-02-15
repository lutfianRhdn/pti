import getResponse from "@/utils/getResponse";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from 'next-auth';

const prisma = new PrismaClient();
export async function POST(req: Request,{params}:any) {
  const { id } = params
  
  const {text} = await req.json()
  console.log('test',text)
  const session = await getServerSession();
  if (!session) return getResponse({}, "Unauthorized", 401);
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email ||'' }
  })
  const post = await prisma.post.findUnique({
    where: { id: +id },
  })
  if (!post) return getResponse({}, "Post Not Found", 404);  
  const comment = await prisma.comment.create({
    data: {
      text,
      authorId: user?.id ||0,
    }
  })
  await prisma.commentsOnPosts.create({
    data: {
      postId: +id,
      commentId: comment.id
    }
  })
  return getResponse({}, 'Posts Comment Craeted Successfully', 200);
}