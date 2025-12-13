import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "@envs/environment";
import { ParamsUtils } from "../utils/params.utils";

export abstract class BaseApiService<T, TPage, TFilter> {
  protected constructor(protected readonly http: HttpClient) {}

  protected abstract readonly endpoint: string;

  protected get baseUrl(): string {
    return `${environment.apiUrl}/${this.endpoint}`;
  }


  public getPaginated(filter: TFilter): Observable<TPage> {
    const params = ParamsUtils.buildParams(filter);
    return this.http.get<TPage>(this.baseUrl, { params });
  }

  public getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${id}`);
  }
}
