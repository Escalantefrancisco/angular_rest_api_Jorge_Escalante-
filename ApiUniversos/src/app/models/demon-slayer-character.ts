export interface CombatStyle {
  id: number;
  name: string;
  description: string;
  img: string;
}

export interface Affiliation {
  name: string;
  description: string;
}

export interface DemonSlayerCharacter {
  id: number;
  name: string;
  age: number | null;
  gender: string;
  race: string;
  description: string;
  img: string;
  quote: string;
  first_arc_appearance?: {
    name: string;
    description: string;
  };
  affiliation?: Affiliation;
  combat_style: CombatStyle[];
}

export interface DemonSlayerCharactersResponse {
  content: DemonSlayerCharacter[];
  pagination: {
    totalElements: number;
    elementsOnPage: number;
    currentPage: number;
    totalPages: number;
    previousPage: string;
    nextPage: string;
  };
}

export interface DemonSlayerCharacterResponse {
  content: DemonSlayerCharacter[];
}