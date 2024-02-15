import { User } from "./user";

export interface Post{
  id: number,
  user_id: number,
  photo: string;
  caption: string;
  created_at: string;
  updated_at: string;
}
export interface PostWithUser extends Post{
  user: User;
}

export interface PostWithUserAndLike extends PostWithUser{
  likes: User[];
}

export interface PostWithUserAndComment extends PostWithUser{
  comments: Comment[];
}

export interface PostWithUserAndLikeAndComment extends PostWithUserAndLike{
  comments: Comment[];
}

export interface PostWithEvent extends Post{
  events: Event;
}