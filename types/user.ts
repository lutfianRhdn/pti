export interface User{
  id: number,
  name: string,
  photo_profile: string;
  photo_banner: string;
  created_at: string;
  updated_at: string;
}


export interface UserWithPassword extends User{
  password: string;
}

export interface UserWithFollowing extends User{
  following: User[];
}
export interface UserWithFollower extends User{
  follower: User[];
}
export interface UserWithFollowingAndFollower extends User{
  following: User[];
  follower: User[];
}
