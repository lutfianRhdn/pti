import getResponse from '@/utils/getResponse';
import {hashSync} from 'bcrypt-ts';
import { PrismaClient } from '@prisma/client'
import getNasaPicture from '@/utils/getNasaPicture';
const prisma = new PrismaClient()
export const dynamic = 'force-dynamic'
export  async function POST(req:  Request, ) {
  const { email, password,birth_date,name }: any = await req.json()
  if (!email || !password) return getResponse(null, 'Email and Password is Required', 400);
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })
  if (user) return getResponse(null, 'User Already Exist', 404);
  const banner = await getNasaPicture(birth_date)
  
  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashSync(password, 10),
      name,
      image_banner: banner.hdurl,
      birthday:new Date(birth_date)
    }
  })
  return getResponse(newUser, 'User Created Successfully', 200);
}