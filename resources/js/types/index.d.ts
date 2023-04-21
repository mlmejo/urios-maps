export interface Image {
  url: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  image: Image;
}

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>
> = T & {
  auth: {
    user: User;
  };
};

export type Establishment = {
  id?: number;
  name: string;
  description: string;
  location: string;
  image: Image | File | null;
  owner?: User;
};
