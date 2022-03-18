export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  [key: string]: unknown;
}

export interface Hipster {
  words: string[];
  sentence: string;
  [key: string]: unknown;
}

export interface HipstersAndUsers {
  hipsters: Hipster[];
  users: User[];
}

export interface HipsterUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  slogan: string;
}

export interface UserSocial {
  id: string;
  friends: string;
  enemies: string;
  frenemies: string;
}

export interface ExtractedData {
  users: User[];
  hipsters: Hipster[];
}

export interface TransformedData {
  hipsterUser: HipsterUser[];
  userSocial: UserSocial[];
}
