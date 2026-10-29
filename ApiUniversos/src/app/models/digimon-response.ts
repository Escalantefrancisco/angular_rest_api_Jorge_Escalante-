
import { Digimon } from './digimon';

export interface DigimonResponse {
  content: Digimon[];

  pageable: {
    currentPage: number;
    elementsOnPage: number;
    totalElements: number;
    totalPages: number;
    previousPage?: string;
    nextPage?: string;
  };
}
