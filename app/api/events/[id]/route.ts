import { fileDelete, fileUpload } from "@/utils/fileHandler"
import getResponse from "@/utils/getResponse"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export async function PUT(req: Request,{params}:any) {
  const { id } = params
  const form = await req.formData()
  const caption = form.get('caption')
  if (!caption) return getResponse({}, 'Caption is required', 400)
  const image = form.get('image')
  let path = ''
  const event = await prisma.event.findUnique({
    where: {
      id: +id
    }
  })

  if (image !=='undefined' ) {
    await fileDelete(event?.image as string)
    path = await fileUpload(image as any)
  }
  const updatedEvent = await prisma.event.update({
    where: {
      id: +id
    },
    data: {
      caption: caption as string,
      image: path || event?.image
    }
  })
  return getResponse(updatedEvent, 'Event Updated Successfully', 200);
}
