import type { Picture } from "./PictureModel";
import type { Response } from "./ResponseModel";

export interface Post {
  id: number;
  title: string;
  text: string;
  price: string;
  picsUrl: Picture[];
}

export type PostsResponse = Response<Post[]>;
