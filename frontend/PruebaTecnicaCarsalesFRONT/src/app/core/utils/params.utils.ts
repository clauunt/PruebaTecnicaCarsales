import { HttpParams } from "@angular/common/http";
import { CharacterFilterReq, EpisodeFilterReq } from "../models";

export class ParamsUtils {

  public static buildParams<T>(filter?: T): HttpParams {
    let params = new HttpParams();

    if (!filter) return params;

    for (const [key, value] of Object.entries(filter)) {
      if (value != null) {
        params = params.set(key, String(value));
      }
    }

    return params;
  }
}
