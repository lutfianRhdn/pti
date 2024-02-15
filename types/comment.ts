import { Post } from "./post";
import { User } from "./user";

export interface Comment{
  id: number,
  user_id: number,
  comment: string;
  created_at: string;
  updated_at: string;
}

export interface CommentWithUser extends Comment{
  user: User;
}

export interface CommentWithPost extends Comment{
  post: Post;
}

export interface CommentWithUserAndPost extends CommentWithUser{
  post: Post;
}
export interface CommentWithUserAndPostAndLike extends CommentWithUserAndPost{
  likes: User[];
}
export interface CommentWithUserAndPostAndLikeAndComment extends CommentWithUserAndPostAndLike{
  comments: Comment[];
}
export interface CommentWithUserAndPostAndLikeAndCommentAndEvent extends CommentWithUserAndPostAndLikeAndComment{
  events: Event[];
}
export interface CommentWithUserAndPostAndLikeAndCommentAndEventAndUser extends CommentWithUserAndPostAndLikeAndCommentAndEvent{
  user: User;
}