'use client';
import { Card } from "@/components/Card";
import DefaultLayout from "@/layouts/DefaultLayout";
import getNasaPicture from "@/utils/getNasaPicture";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Nassa() {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [image, setImage] = useState<string>('')
  const { data: session } = useSession()
  useEffect(() => {
    const user = session?.user as any
    if (!user) return
    // // console.log(session?.user)
    const date = new Date(user.birthday as any).toISOString().split('T')[0]
    getNasaPicture(date).then((res) => {
      setImage(res.hdurl)
      setTitle(res.title)
      setDescription(res.explanation)
    })


  }, [session?.user])
  return (
    <DefaultLayout>
      <Card image={image} title={'This is an Astronomy Picture based on your birthday!'} subtitle={title} description={description} />
      <Button as={Link} href="/home" className="mt-5 " color="danger" variant="shadow" >Explore further</Button>
    </DefaultLayout>
  );

}