export interface TokenUser {
  name: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  color: string;
  picture: string;
  sub: string;
  iat: number;
  exp: number;
}

export interface User {
  name: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  color: string;
  picture: string;
  id: string;
}
