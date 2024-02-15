'use client'
import { CardComment } from "@/components/Card/comment";
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/DefaultLayout";
import fetchApi from "@/utils/fetchApi";
import { faCalendarDays, faMessage, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button, Card, CardBody, Image, Textarea } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Tabs, Tab, Chip } from "@nextui-org/react";

import moment from "moment";
import { CommentTabs } from "./comment";
import { EventsTabs } from "./event";

export default function DetailPost() {
  const [isLiked, setIsLiked] = useState(false);
  const [post, setPost] = useState({}) as any
  const { data: session } = useSession()
  const [likeCount, setLikeCount] = useState(0)
  const [comments, setComments] = useState([]) as any[]
  const [events, setEvents] = useState([]) as any[]
  const [id, setId] = useState(0)
  useEffect(() => {
    fetchApi(`/posts/today`, "GET")
      .then((res: any) => {
        const liked = session?.user && res.data.likes.find((like: any) => like.userId === user.id) ? true : false
        setIsLiked(liked)
        setId(res.data.id)
        setLikeCount(res.data.likes.length)
        setComments(res.data.comments.reverse())
        setEvents(res.data.events.reverse())
        setPost(res.data)
      })
  }, [ session])
  const handleLike = async () => {
    await fetchApi(`/posts/${id}/like`, 'POST')
    isLiked ? setLikeCount(prev => prev - 1) : setLikeCount(prev => prev + 1)
    setIsLiked(!isLiked);
  }

  return (
    <DefaultLayout>
      <section className="bg-white px-5 py-4  rounded-md backdrop:m-6">
        <div className="flex  gap-8 ">
          <Image
            src={post.image}
            alt={post.title}
            className="h-96 min-w-[20rem]"
          />
          <div className="mt-5   flex flex-col justify-between">
            <div className="flex flex-col">
              <div className="flex justify-between items-center">

                <h1 className={title({ size: 'md', className: "text-wrap" })} >{post.title}</h1>
                <div>

                  <p className="text-bold px-3 py-1 rounded-full bg-gray-200"> {moment(post.created_at).format('dddd,D MMMM YYYY')} </p>
                </div>

              </div>
              <div className="text-wrap text-xl mt-3">
                {post.caption}
              </div>

            </div>
            <div className="text-xl mb-5">
              <div className="gap-10  flex items-center ">
                <div className={`flex items-center gap-2 ` + (isLiked ? 'text-red-500 font-bold' : '')} onClick={handleLike}>
                  <FontAwesomeIcon icon={faThumbsUp} className={`font-bold`} size="lg" />
                  <span> {likeCount} Likes</span>
                </div>
                <div className="flex items-center gap-2 ">
                  <FontAwesomeIcon icon={faMessage} />
                  <span> {post.comments?.length} coments</span>
                </div>
                <div className="flex items-center gap-2   ">
                  <FontAwesomeIcon icon={faCalendarDays} />
                  <span> {post.events?.length} Events</span>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className="flex w-full flex-col mt-5">
          <Tabs
            aria-label="Options"
            color="primary"
            variant="underlined"
            classNames={{
              tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
              cursor: "w-full bg-[#22d3ee]",
              tab: "max-w-fit px-0 h-12",
              tabContent: "group-data-[selected=true]:text-[#06b6d4]"
            }}
          >
            <Tab
              key="photos"
              title={
                <div className="flex items-center text-lg space-x-2">
                  <FontAwesomeIcon icon={faMessage} />
                  <span>Comments</span>
                </div>
              }
            >
              <CommentTabs comments={comments} id={id} setComments={setComments} user={session?.user} />
            </Tab>
            <Tab
              key="music"
              className="text-lg"
              title={
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon icon={faCalendarDays} />
                  <span>Events</span>
                </div>
              }
            >
              <EventsTabs events={events} post_id={id} />
            </Tab>

          </Tabs>
        </div>
      </section>
    </DefaultLayout>
  )
}

