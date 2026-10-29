
export interface Digimon {
  id: number;
  name: string;
  href?: string;
  image: string;

  levels?: { id: number; level: string }[];
  types?: { id: number; type: string }[];
  attributes?: { id: number; attribute: string }[];
  fields?: { id: number; field: string; image?: string }[];

  descriptions?: {
    origin: string;
    language: string;
    description: string;
  }[];

  skills?: {
    id: number;
    skill: string;
    translation?: string;
    description?: string;
  }[];

  priorEvolutions?: {
    id: number;
    digimon: string;
    condition?: string;
    url?: string;
  }[];

  nextEvolutions?: {
    id: number;
    digimon: string;
    condition?: string;
    url?: string;
  }[];
}
