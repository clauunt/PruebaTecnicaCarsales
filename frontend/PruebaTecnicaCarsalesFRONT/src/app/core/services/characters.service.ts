import { inject, Injectable } from "@angular/core";
import { CharacterFilterReq, CharacterPage, Character } from "../models";
import { BaseApiService } from "./base.service";
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})

export class CharacterService extends BaseApiService<Character, CharacterPage, CharacterFilterReq> {
  protected readonly endpoint = 'Characters';

  constructor(http: HttpClient = inject(HttpClient)) {
    super(http);
  }
}
