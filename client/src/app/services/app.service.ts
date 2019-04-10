import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AppService {
  baseApiUrl: string = "http://localhost:8000/";
  constructor(private http: HttpClient) {}

  /**
   *
   * @param eamilId
   */
  public getAppDetails(appId: string): Observable<any> {
    const url = `${this.baseApiUrl}v1/graphql`;
    const graphQuery = {query: `{ appId(_id: "${appId}") { name _id email } }`};
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/graphql'
      })
    };
    return this.http.post<any>(url, JSON.stringify(graphQuery), httpOptions);
  }

  /**
   *
   * @param postData
   */
  public saveAppDetails(postData: any): Observable<any> {
    const url = `${this.baseApiUrl}v1/appid`;
    return this.http.post<any>(url, postData);
  }
}
