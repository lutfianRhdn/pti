import { fileDelete, fileUpload } from '@/utils/fileHandler';
import getResponse from '@/utils/getResponse';
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth';
const prisma = new PrismaClient()
export const dynamic = 'force-dynamic'
export async function GET(req: Request,) {
  
}

export async function POST(req: Request,) {
  const form = await req.formData()
  const caption = form.get('caption')
  const post_id = form.get('post_id')
  
  if (!caption || !post_id) return getResponse({}, 'Caption and post_id are required', 400)
  
  const image = form.get('image')
  const path = await fileUpload(image as any)
  const session = await getServerSession();
  const { user: userSession } = session as any
  if(!userSession) return getResponse({}, 'Unauthorized', 401)
  const user = await prisma.user.findUnique({
    where: {
      email: userSession.email
    }
  })

  const event = await prisma.event.create({
    data: {
      caption: caption as string,
      image: path ,
      post: {
        connect: {
          id: +post_id
        }
      },
      author: {
        connect:{
          id: user?.id as number
        }
      }
    }
  })
  return getResponse(event, 'Event Created Successfully', 201);
} 

export async function DELETE(req: Request,) {
  const { id } = await req.json()
  const session = await getServerSession();
  const { user: userSession } = session as any
  if (!userSession) return getResponse({}, 'Unauthorized', 401)
  const user = await prisma.user.findUnique({
    where: {
      email: userSession.email
    }
  })
  const event = await prisma.event.findUnique({
    where: {
      id
    }
  })
  if (event?.authorId !== user?.id) return getResponse({}, 'Unauthorized', 401)
  await prisma.event.delete({
    where: {
      id
    }
  })
  fileDelete(event?.image as string)
  return getResponse({}, 'Event Deleted Successfully', 200);
}
