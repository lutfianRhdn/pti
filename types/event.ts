import { Post } from "./post";
import { User } from "./user";

export interface Event{
  id: number,
  user_id: number,
  photo: string;
  caption: string;
  created_at: string;
  updated_at: string;
  post_id: number;
}
export interface EventWithUser extends Event{
  user: User;
}
export interface EventWithUserAndLike extends EventWithUser{
  likes: User[];
}
export interface EventWithUserAndComment extends EventWithUser{
  comments: Comment[];
}
export interface EventWithUserAndLikeAndComment extends EventWithUserAndLike{
  comments: Comment[];
}
export interface EventWithPost extends Event{
  post: Post;
}
