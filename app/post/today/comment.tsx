import { CardComment } from "@/components/Card/comment"
import { title } from "@/components/primitives"
import fetchApi from "@/utils/fetchApi"
import { Avatar, Button, Card, CardBody, Textarea } from "@nextui-org/react"
import { useState } from "react"
type CommentTabsProps = {
  user: any
  setComments: any
  comments: any
  id: any
}

export const CommentTabs = ({ user, setComments, comments, id }: CommentTabsProps) => {
  const [commentText, setCommentText] = useState('')
  const handleComment = async (e: any) => {
    e.preventDefault()
    await fetchApi(`/posts/${id}/comment`, 'POST', { text: commentText })
    setComments((prev: any) => [{ comment: { text: commentText, author: { name: user.name, image_profile: user?.image } }, created_at: new Date() }, ...prev])
    setCommentText('')
  }

  return (
    <div className="mt-5">
      <h1 className={title({ size: 'sm' })}>Comments</h1>
      <div className="flex flex-col gap-5 mt-8">
        <Card className="py-4 px-2 border">
          <CardBody className="overflow-visible py-2 flex gap-5 flex-col">
            <div className="flex gap-3 items-center">
              <Avatar src={user?.image || ''} size="md" />
              <div className="font-bold text-lg uppercase">{user?.name}</div>
            </div>
            <div className=''>
              <form onSubmit={handleComment} className="flex flex-col gap-2">

                <Textarea
                  label="Comment"
                  variant="bordered"
                  placeholder="Enter your comment"
                  disableAnimation
                  disableAutosize
                  classNames={{
                    input: "resize-y min-h-[40px]",
                  }}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <div>

                  <Button type="submit" variant="flat" color="primary"> Send </Button>
                </div>
              </form>

            </div>
          </CardBody>
        </Card>
        {comments?.map(({ comment }: any) => (
          <CardComment key={comment.id} user={{
            name: comment.author.name,
            image: comment.author.image_profile
          }} text={comment.text} created_at={comment.created_at} />
        ))}
      </div>

    </div>
  )
}