/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { CardPost } from "@/components/Card/post";
import { title } from "@/components/primitives";
import fetchApi from "@/utils/fetchApi";
import { useEffect, useState } from "react";


export const Post = ({email}:any) => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetchApi(`/posts/liked?email=${email}`, 'GET').then((res) => {
      setPosts(res.data)
    })
  }, [email])
  return (
    <>
      <div className="bg-white w-full    rounded-lg px-10 py-5">
        <h1 className={title({ size: 'md' })}> My Events</h1>
        <div className="grid grid-cols-4 gap-5 mt-10">
          {posts.map((event: any) => (
            <CardPost
              key={event.id}
              comment_count={event.comments.length}
              date={event.created_at}
              id={event.id}
              image={event.image}
              like_count={event.likes.length}
              author_email={email}
            />
          ))}
        </div>
      </div>
    </>
  );
}
