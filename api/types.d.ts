export interface IUser {
  username: string;
  password: string;
  displayName: string;
  token: string;
  avatar: string | null;
  role: string;
  googleID?: string;
}

export interface IPhoto {
  user: string;
  image: string;
  name: string;
}
