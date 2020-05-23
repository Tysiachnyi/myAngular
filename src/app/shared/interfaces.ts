export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface User {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}
