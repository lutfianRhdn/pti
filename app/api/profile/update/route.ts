import { fileUpload } from "@/utils/fileHandler"
import getResponse from "@/utils/getResponse"
import { getServerSession } from "next-auth"
import { PrismaClient } from "@prisma/client"
import { hashSync } from "bcrypt-ts"
const prisma = new PrismaClient()
export async function POST(req: Request,) {
  const form = await req.formData()
  const name = form.get('name')
  const birthday = form.get('birthday')
  const password = form.get('password')
  const image = form.get('image')
  let pathImage = ''
  const session = await getServerSession()
  if (image !== 'undefined') pathImage = await fileUpload(image as any)
  if (!session?.user) return getResponse({}, 'UnAuthorize', 401)
  const user = await prisma.user.findUnique({ where: { email: session.user.email as string } })
   if (!user) return getResponse({}, 'UnAuthorize', 401)
  const updatedUser = await prisma.user.update(
    {
      where: { id:user.id  },
      data: {
        name: name as string || user.name,
        birthday: new Date(birthday as string) || user.birthday,
        image_profile: pathImage || user.image_profile,
        password: hashSync(password as string)  ||user.password
      }
    },
  )
  return getResponse(updatedUser, 'Event Created Successfully', 201);
} 