import { inject, Injectable } from "@angular/core";
import { EpisodeFilterReq, EpisodePage, Episode } from "../models";
import { BaseApiService } from "./base.service";
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})

export class EpisodeService extends BaseApiService<Episode, EpisodePage, EpisodeFilterReq> {
  protected readonly endpoint = 'Episodes';

  constructor(http: HttpClient = inject(HttpClient)) {
    super(http);
  }
}
