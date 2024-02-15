import getResponse from '@/utils/getResponse';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export const dynamic = 'force-dynamic'
export async function GET(req: Request,{params}:any) {
  const { email } = params
  const user = await prisma.user.findUnique({
    where: {
      email
    },
    include: {
      followers: true,
    }
  })
  return getResponse(user,"Successfully fetched user",200)
}
