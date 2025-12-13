import { ExecOptionsWithStringEncoding } from "child_process";
import { ApiResponse, PaginationFilter } from "./apiResponse.interface";

export interface Character {
  id: number;
  name?: string;
  location?: string;
  origin?: string
  status?: string;
  species?: string;
  gender?: string;
  image?: string;
  episode?: string[];
}

export interface CharacterFilterReq extends PaginationFilter {
  name?: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
}

export interface CharacterPage extends ApiResponse<Character> {}
