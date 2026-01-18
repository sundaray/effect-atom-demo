export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  company: {
    name: string;
    title: string;
  };
}

export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}
