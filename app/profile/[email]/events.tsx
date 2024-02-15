/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { CardPost } from "@/components/Card/post";
import { title } from "@/components/primitives";
import fetchApi from "@/utils/fetchApi";
import { useEffect, useState } from "react";


export const Events = ({email}:any) => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetchApi(`/events/my?email=${email}`, 'GET').then((res) => {
      setPosts(res.data)
    })
  }, [email])
  return (
    <>
      <div className="bg-white w-full    rounded-lg px-10 py-5">
        <h1 className={title({ size: 'md' })}> My Post Events</h1>
        <div className="grid grid-cols-4 gap-5 mt-10">
          {posts.map((posts: any) => (
            <CardPost
              key={posts.id}
              comment_count={posts.comments.length}
              date={posts.created_at}
              id={posts.id}
              image={posts.image}
              like_count={posts.likes.length}
              author_email={email}
            />
          ))}
        </div>
      </div>
    </>
  );
}
