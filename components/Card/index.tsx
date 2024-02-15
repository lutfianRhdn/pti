import React from "react";
import { Card as C, CardHeader, CardBody, Image } from "@nextui-org/react";
import { title as t ,subtitle as s} from "../primitives";

type CardProps = {
  title: string;
  subtitle: string;
  image: string;
  description?: string;
};
export const Card = ({ title, subtitle, image, description }: CardProps) => {
  return (
    <C className="py-4 px-2">
      <CardBody className="overflow-visible py-2 flex gap-5 flex-col">
        <div style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }} className="h-96 rounded-xl"></div>
        <div>
        <h1 className={t({ size: 'sm' })}>{title} </h1>
        <h2 className="text-xl">{subtitle}</h2>
        </div>
      <h5 className={s({})}>{description}</h5>
      </CardBody>
    </C> 
  );
}
