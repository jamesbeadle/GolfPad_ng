import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, AsyncValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of, timer } from 'rxjs';
import { GolfersService } from '../../services/golfer.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private golferService: GolfersService
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      username: [
        '', 
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
          Validators.pattern('^[A-Za-z0-9]+$')
        ],
        [this.usernameUniqueValidator()]
      ],
      firstName: [
        '', 
        [
          Validators.minLength(2),
          Validators.maxLength(20)
        ]
      ],
      lastName: [
        '', 
        [
          Validators.minLength(2),
          Validators.maxLength(20)
        ]
      ],
      handicap: [
        '', 
        [
          Validators.pattern('^\\d+(\\.\\d{1})?$')
        ]
      ],
      homeGolfClub: ['']
    });
  }

  usernameUniqueValidator(): AsyncValidatorFn {
    
    return (control: AbstractControl) => {
      if (!control.value) {
        return of(null);
      }
      console.log("control.value")
      console.log(control.value)
      return timer(500).pipe(
        switchMap(() => this.golferService.checkUsernameAvailable(control.value)),
        map(isAvailable => (isAvailable ? null : { usernameTaken: true })),
        catchError(() => of(null)) 
      );
    };
  }

  async onSubmit() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }
    this.isSubmitting = true;

    const formValue = this.profileForm.value;

    let profileCreateResult = await this.golferService.createProfile(formValue);
    
    console.log(profileCreateResult)

  }
}
