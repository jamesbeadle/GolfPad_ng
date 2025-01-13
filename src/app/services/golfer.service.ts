import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GolfersService {
  
  constructor(
    private http: HttpClient
  ) {}

  async getGolfers(): Promise<any[]> {
    return firstValueFrom(this.http.get<any[]>(`${environment.apiURL}/golfers`));
  }

  /*


  async getGolfers(): Promise<any[]> {
    const idToken = await this.afAuth.currentUser?.getIdToken(true);

    return firstValueFrom(this.http.get<any[]>(`${environment.apiURL}/golfers`, {
      headers: {
        Authorization: `Bearer ${idToken}`
      }
    }));
  }

  */

  checkUsernameAvailable(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.apiURL}/Golfers/CheckUsernameAvailable/${username}`);
  }

  async createProfile(profileData: any): Promise<any> {
    return firstValueFrom(
      this.http.post<any>(`${environment.apiURL}/golfers`, profileData)
    );  
  }

  async getGolferById(uid: string) : Promise<any> {
    return firstValueFrom(this.http.get<boolean>(`${environment.apiURL}/Golfers/GetGolferByUID/${uid}`));
  }

  async updateGolfer(golferId: string, data: any): Promise<any> {
    return firstValueFrom(
      this.http.put<any>(`${environment.apiURL}/golfers/${golferId}`, data)
    );
  }

  async uploadProfilePicture(golferId: string, file: File): Promise<string> {
    const formData = new FormData();
    formData.append('profilePicture', file);

    return firstValueFrom(
      this.http.post<{url: string}>(
        `${environment.apiURL}/golfers`, formData
      )
    ).then(response => response.url);
  }
}
