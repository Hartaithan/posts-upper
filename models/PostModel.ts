import type { Picture } from "./PictureModel";

export interface Post {
  id: number;
  title: string;
  text: string;
  price: string;
  picsUrl: Picture[];
}
