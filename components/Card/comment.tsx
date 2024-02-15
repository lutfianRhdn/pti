import React from "react";
import { Card as C, CardHeader, CardBody, Image, Avatar } from "@nextui-org/react";
import { title as t ,subtitle as s} from "../primitives";
import moment from "moment";

type CardProps = {
  user: {
    name: string,
    image: string,
  }
  text: string,
  created_at:string,
};
export const CardComment = ({ user, text,created_at }: CardProps) => {
  return (
    <C className="py-4 px-2 border">
      <CardBody className="overflow-visible py-2 flex gap-5 flex-col">
        <div className="flex gap-3 items-center">
          <Avatar src={user.image} size="md" />
          <div className="font-bold text-lg uppercase">{user.name}</div>
          <div className="text-gray-600 text-small">{moment(created_at).fromNow()}</div>
        </div>
      <div className={s({className:"ml-2"})}>{text}</div>
      </CardBody>
    </C> 
  );
}
