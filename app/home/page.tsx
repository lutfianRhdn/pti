'use client';
import { CardPost } from "@/components/Card/post";
import DefaultLayout from "@/layouts/DefaultLayout";
import fetchApi from "@/utils/fetchApi";
import { useEffect, useState } from "react";
export default function Post() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchApi('/posts', 'GET')
      .then((res) => {
        setPosts(res.data)
        setLoading(false)
      })
  }, [])

  return (
    <DefaultLayout>
      <div className=" grid grid-cols-4 gap-10 ">
        {posts.map((post: any) => (
          <CardPost key={post.id} id={post.id} like_count={post.likes.length} event_count={post.events.length} comment_count={post.comments.length} image={post.image} date={post.created_at} />
        ))}
      </div>
    </DefaultLayout>
  );
}