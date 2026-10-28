export interface Character {
  id: number;
  name: string;
  image: string;
  ki?: string;
  maxKi?: string;
  race?: string;
  gender?: string;
  description?: string;
  affiliation?: string;
  originPlanet?: {
    id: number;
    name: string;
    image?: string;
    description?: string;
    isDestroyed?: boolean;
  };
  transformations?: {
    id: number;
    name: string;
    image: string;
    ki?: string;
  }[];
}