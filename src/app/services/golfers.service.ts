import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service'; // your existing AuthService
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GolfersService {
  
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  async getGolfers(): Promise<any[]> {
    const currentUser = await firstValueFrom(this.authService.currentUser$);
    if (!currentUser) {
      throw new Error('User not logged in');
    }

    const token = await currentUser.getIdToken();

    return firstValueFrom(this.http.get<any[]>(
      'https://golfpadapi.mangomeadow-d0c5ffaa.uksouth.azurecontainerapps.io/golfers',
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`
        })
      }
    ));
  }
}
