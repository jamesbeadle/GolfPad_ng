import { Injectable } from '@angular/core';
import { RealtimeChannel, User } from '@supabase/supabase-js';
import { BehaviorSubject, first, Observable, skipWhile } from 'rxjs';
import { SupabaseService } from './supabase.service';

export interface Profile {
  user_id: string;
  photo_url: string;
  email: string;
  first_name: string;
  last_name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _$user = new BehaviorSubject<User | null | undefined>(undefined);
  $user = this._$user.pipe(skipWhile(_ => typeof _ === 'undefined')) as Observable<User | null>;
  private user_id?: string;

  private _$profile = new BehaviorSubject<Profile | null | undefined>(undefined);
  $profile = this._$profile.pipe(skipWhile(_ => typeof _ === 'undefined')) as Observable<Profile | null>;
  private profile_subscription?: RealtimeChannel;


  constructor(private supabase: SupabaseService) {
    this.supabase.client.auth.getUser().then(({ data, error }) => {
      this._$user.next(data && data.user && !error ? data.user : null);
  
      this.supabase.client.auth.onAuthStateChange((event, session) => {
        this._$user.next(session?.user ?? null);
      });
    });

    this.$user.subscribe(user => {
      if (user) {
        if (user.id !== this.user_id) {
          const user_id = user.id;
          this.user_id = user_id;
    
          this.supabase
            .client
            .from('profiles')
            .select('*')
            .match({ user_id })
            .single()
            .then(res => {
              
              this._$profile.next(res.data ?? null);
    
              this.profile_subscription = this.supabase
                .client
                .channel('public:profiles')
                .on('postgres_changes', {
                  event: '*',
                  schema: 'public',
                  table: 'profiles',
                  filter: 'user_id=eq.' + user.id
                }, (payload: any) => {
                
                  this._$profile.next(payload.new);
                  
                })
                .subscribe()
    
            })
        }
      }
      else {
        this._$profile.next(null);
        delete this.user_id;
        if (this.profile_subscription) {
          this.supabase.client.removeChannel(this.profile_subscription).then(res => {
            console.log('Removed profile channel subscription with status: ', res);
          });
        }
      }
    })
    
  
  }

  signInWithGoogle() {
    return new Promise<void>((resolve, reject) => {
  
      this._$profile.next(undefined);
      this.supabase.client.auth.signInWithOAuth({ provider: 'google' })
        .then(({ data, error }) => {
          if (error || !data) reject('Error connecting google auth');
          this.$profile.pipe(first()).subscribe(() => {
            resolve();
          });
        })
    })
  }
  
  logout() {
    return this.supabase.client.auth.signOut()
  }
  

}
