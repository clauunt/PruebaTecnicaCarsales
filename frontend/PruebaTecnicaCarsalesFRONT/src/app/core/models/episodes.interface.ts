import { ApiResponse, PaginationFilter } from "./apiResponse.interface";
import { Character } from "./characters.interface";

export interface Episode {
  id: number;
  name: string;
  airDate?: Date;
  episode?: string;
  charactersList?: Character[];
  url?: string;
}

export interface EpisodeFilterReq extends PaginationFilter {
  name?: string;
  episode?: string;
}

export interface EpisodePage extends ApiResponse<Episode> {}
