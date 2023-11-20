import { Node } from "gatsby";

export interface Letter extends Node {
  id: string;
  title: string;
  lead?: string;
  slug: string;
  url: string;
  published: boolean;
}

export interface Sponsor {
  id: string;
  title: string;
  slug: string;
  url: string;
  group: string;
  published: boolean;
  image: ImageDataLike;
}
