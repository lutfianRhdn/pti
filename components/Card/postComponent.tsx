'use client'
import React, { useEffect } from "react";
import { Card as C, CardHeader, CardBody, Image, CardFooter, user } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faEdit, faMessage, faPenToSquare, faThumbsUp, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { useSession } from "next-auth/react";
import fetchApi from "@/utils/fetchApi";
import Link from "next/link";

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
  like_count: number
  comment_count: number
  event_count?: number
  handleLike?: () => void | Promise<void>
  isLiked?: boolean
  handlePopuUpComment?: (e: any, id: number) => void | Promise<void>
  email?: string
};
export const PostComponent = ({ image, date, id, type, name, handlePopUpEdit, caption, handleLike, isLiked, author_id, author_image, author_name, handleDelete, like_count, comment_count, event_count, handlePopuUpComment, email }: CardProps) => {
  const { data: session } = useSession();
  return (
      <C className="py-4 px-2  hover:scale-105 ">
        <CardHeader className="flex items-center gap-5 justify-between">
          <Link className="flex items-center gap-2" href={'/profile/'+email}>
            <Image
              src={author_image}
              alt="user"
              width={40}
              height={40}
              className="rounded-full"
            />
            <p className="text-lg font-semibold">{author_name}</p>
          </Link>
          <div className="flex  gap-2">
            {type != 'event' && (

              <p className="text-gray-500 font-semibold">{new Date(date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            )}
            {session?.user?.id == author_id && handleDelete && (
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faPenToSquare} className="text-warning-400 text-xl hover:scale-125 duration-100" onClick={(e) => handlePopUpEdit && handlePopUpEdit(e, id)} />
                <FontAwesomeIcon icon={faTrashAlt} className="text-orange-400 text-xl hover:scale-125 duration-100" onClick={() => handleDelete(id)} />
              </div>
            )}
          </div>
        </CardHeader>
        <CardBody className="overflow-visible py-2 flex gap-5 flex-col">
          <div style={{
            backgroundImage: `url(${type == 'event' && process.env.NEXT_PUBLIC_BASE_URL + '/assets/images/' + image || image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }} className="h-96 rounded-xl flex  justify-end">

          </div>
          {type == 'event' && (
            <div className="bg-white backdrop-blur-sm rounded-bl-lg px-2">
              <p className="text-gray-800 font-semibold truncate">{caption}</p>
            </div>
          )}

        </CardBody>
        <CardFooter className="flex px-5 flex-col">
          <div>
            <div className="gap-10  flex items-center ">
            
              <div className={`flex items-center ` + (isLiked ? 'text-red-500' : '')} onClick={handleLike}>
                <FontAwesomeIcon icon={faThumbsUp} className={`font-bold `} size="lg" />
                <span> {like_count} Likes</span>
              </div>
            <div className="flex items-center" onClick={(e) =>handlePopuUpComment&&handlePopuUpComment(e,id)}>
                <FontAwesomeIcon icon={faMessage} />
                <span> {comment_count} coments</span>
              </div>
              {type != 'event' && (

                <div className="flex items-center">
                  <FontAwesomeIcon icon={faCalendarDays} />
                  <span> {event_count || 0} Events</span>
                </div>
              )}
            </div>
          </div>
        </CardFooter>
      </C>

  );
}
