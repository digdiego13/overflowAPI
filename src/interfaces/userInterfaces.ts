interface User {
  name: string;
  classroom: string;
  token?: string;
}

interface UserDB extends User {
  id: number;
}

export { User, UserDB };
