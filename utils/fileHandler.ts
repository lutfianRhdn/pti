import { unlink, writeFile } from "fs/promises"
import path from "path"
export const fileUpload = async (file: File) => {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const now = new Date().toISOString()
  const fileName =  now+'-'+file.name
  const path_file = path.join(process.cwd()+'/public/assets/images/',fileName)

  await writeFile(path_file, buffer)
  return fileName
}
export const fileDelete = async (file: string) => {
  const path_file = path.join(process.cwd(),'/public/assets/images/'  ,file)
  await unlink(path_file)
  return true
}