'use client'
import React, { useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import fetchApi from "@/utils/fetchApi";
import { PostComponent } from "./postComponent";
import { Avatar, Button, Card, CardBody, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, useDisclosure } from "@nextui-org/react";
import { CardComment } from "./comment";

type CardProps = {
  image: string;
  date: string;
  id: number
  type?: 'event' | 'post'
  caption?: string
  name?: string
  author_id?: string
  author_image?: string
  author_name?: string
  handleDelete?: (id: number) => void | Promise<void>
  handlePopUpEdit?: (e: any, id: number) => void | Promise<void>
  isLiked?: boolean
  like_count: number
  comment_count: number
  event_count?: number
  author_email?: string
};
export const CardPost = (props: CardProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { type, id } = props
  const [isLiked, setIsLiked] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(props.like_count)
  const [comments, setComments] = React.useState([])
  const [commentText, setCommentText] = React.useState('')
  const { data: session } = useSession()

  const handleLike = async () => {
    const likeUrl = type == 'event' ? `/events/${id}/like` : `/posts/${id}/like`
    await fetchApi(likeUrl, 'POST')
    setIsLiked(!isLiked)
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)
  }
  const handlePopuUpComment = async (e: any, id: number) => {
    console.log('comment', id)
    const comments = await fetchApi(type == 'event' ? `/events/${id}/comment` : `/posts/${id}/comments`, 'GET')
    const commentsData = comments.data
    console.log(commentsData)
    setComments(commentsData)
    onOpenChange()
  }
  const handleComment = async (e: any) => {
    e.preventDefault()
    const commentUrl = type == 'event' ? `/events/${id}/comment` : `/posts/${id}/comment`
    await fetchApi(commentUrl, 'POST', { text: commentText })
    setComments((prev: any) => [{ comment: { text: commentText, author: { name: session?.user?.name, image_profile: session?.user?.image } }, created_at: new Date() }, ...prev])
    setCommentText('')
  }
  return (
    <>
      {type != 'event' && (
        <Link href={`/post/${id}`} >
          <PostComponent handleLike={handleLike} isLiked={isLiked} {...props} />
        </Link>
      ) || (
        <PostComponent handleLike={handleLike} handlePopuUpComment={handlePopuUpComment} email={props.author_email} isLiked={isLiked} {...props} />
        )}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        size="4xl"
      >
        {/* login */}
        <ModalContent>
          {(onClose) => (
            <form>
              <>
                <ModalHeader className={`flex flex-col gap-1`}>
                  Comments Event
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-col gap-5 mt-8">
                    {session && (

                    <Card className="py-4 px-2 border">
                      <CardBody className="overflow-visible py-2 flex gap-5 flex-col">
                        <div className="flex gap-3 items-center">
                          <Avatar src={session?.user?.image_profile || ''} size="md" />
                          <div className="font-bold text-lg uppercase">{session?.user?.name}</div>
                        </div>
                        <div className=''>
                          <form className="flex flex-col gap-2">

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

                              <Button onClick={handleComment} variant="flat" color="primary"> Send </Button>
                            </div>
                          </form>

                        </div>
                      </CardBody>
                      </Card>
                    )}

                    {comments?.map(( comment : any) => (
                      <CardComment key={comment?.id} user={{
                        name: comment?.author?.name,
                        image: comment?.author?.image_profile
                      }} text={comment?.text} created_at={comment?.created_at} />
                    ))}
                  </div>
                </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="flat" onPress={onOpenChange}>
            Close
          </Button>
        </ModalFooter>
              
              </>
            </form>

          )}
        </ModalContent>
      </Modal>
    </>
  );
}
