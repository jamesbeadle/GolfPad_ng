import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { GetAllGolfersDTO } from '../requests/golfer/get-all-golfers';
import { UpdateGolferDTO } from '../commands/golfer/update-golfer';
import { CreateGolferDTO } from '../commands/golfer/create-golfer-';

@Injectable({
  providedIn: 'root'
})
export class GolfersService {
  
  constructor(
    private http: HttpClient
  ) {}

  async getGolfers(): Promise<any[]> {
    let dto: GetAllGolfersDTO = {
      searchTerm: '', 
      page: 1, 
      homeCourseFilterId: 0
    };
  
    return firstValueFrom(this.http.get<any[]>(`${environment.apiURL}/golfers`, {
      params: dto
    }));
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

  async createGolfer(golferId: string, dto: CreateGolferDTO): Promise<any> {
    try {
      return await firstValueFrom(
        this.http.post<any>(`${environment.apiURL}/golfers`, dto)
      );
    } catch (error: any) {
      if (error.status === 400 || error.status === 404) {
        return null;
      }
      throw error;
    }
  }
  async getGolferById(uid: string): Promise<any> {
    try {
      return await firstValueFrom(
        this.http.get<any>(`${environment.apiURL}/Golfers/GetGolferByUID/${uid}`)
      );
    } catch (error: any) {
      if (error.status === 400 || error.status === 404) {
        return null;
      }
      throw error;
    }
  }
  
  async updateGolfer(golferId: string, data: UpdateGolferDTO): Promise<any> {
    console.log(`${environment.apiURL}/golfers/${golferId}`)
    console.log(data)
    return firstValueFrom(
      this.http.put<any>(`${environment.apiURL}/golfers/${golferId}`, data)
    );
  }
}
