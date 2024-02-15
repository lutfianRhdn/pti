import getResponse from '@/utils/getResponse';
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth';
const prisma = new PrismaClient()
export const dynamic = 'force-dynamic'
export async function POST(req: Request,{params}:any) {
  const { email } = params
  const session = await getServerSession()
  if (!session?.user) return getResponse(null, "Unauthorized", 401)
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })
  const me = await prisma.user.findUnique({
    where: {
      email: session?.user.email as string
    }
  })
  const follow = await prisma.userFollowers.findFirst({
    where: {
      followerId: me?.id,
      followingId: user?.id
    }
  })
  if (follow && me && user) {
    await prisma.userFollowers.delete({
      where: {
        followingId_followerId: {
          followerId: follow.followerId,
          followingId: follow.followingId
        }
      }
    })
    return getResponse(user,"Successfully unfollowed user",200)
  }

  await prisma.userFollowers.create({
    data: {
      follower: {
        connect: {
          email: session?.user.email as string 
        }
      },
      following: {
        connect: {
          email: email
        }
      }
    }
  })
  return getResponse(user,"Successfully fetched user",200)
}
