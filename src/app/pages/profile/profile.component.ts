import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  AsyncValidatorFn,
  ReactiveFormsModule,
  ValidatorFn,
  ValidationErrors
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of, timer } from 'rxjs';

import { GolfersService } from '../../services/golfer.service';
import { AuthService } from '../../services/auth.service';
import { SimpleModalComponent } from "../../shared/simple-modal/simple-modal.component";
import { Router } from '@angular/router';
import { AddImageComponent } from '../../shared/add-image/add-image.component';
import { BrandTextComponent } from '../../shared/brand-text/brand-text.component';
import { GolferDTO } from '../../responses/golfer/golfer';
import { UpdateGolferDTO } from '../../commands/golfer/update-golfer';
import { CreateGolferDTO } from '../../commands/golfer/create-golfer-';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SimpleModalComponent,
    AddImageComponent,
    BrandTextComponent
  ],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  isLoading = true;
  profileForm!: FormGroup;
  isSubmitting = false;
  golfer: GolferDTO | null = null;
  originalUsername = '';
  showEditProfileModal = false;
  showEditProfilePicModal = false;
  saving = false;
  golferPicture: string | null = null;

  constructor(
    private fb: FormBuilder,
    private golferService: GolfersService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.authService.authInitialised$.subscribe(async initialised => {
      if (!initialised) return;


      this.authService.currentUser$.subscribe(async user => {

        if (!user) {
          this.router.navigate(['/']);
          return;
        }

        await this.loadGolfer(user.uid);
        this.isLoading = false;
  
      });
    });
  }

  initForm() {
    this.profileForm = this.fb.group({
      username: this.fb.control(
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
            Validators.pattern('^[A-Za-z0-9]+$')
          ],
          asyncValidators: [this.usernameUniqueValidator(this.originalUsername)],
          updateOn: 'blur'
        }
      ),
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
          Validators.pattern('^-?\\d+(\\.\\d{1})?$'),
          this.rangeValidator(-54, 54)
        ]
      ],
      homeGolfClub: ['']
    });
  }

  rangeValidator(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const val = parseFloat(control.value);
      if (isNaN(val)) return { rangeError: true };
      if (val < min || val > max) return { rangeError: true };
      return null;
    };
  }

  async loadGolfer(userId: string) {
    try {
      const golferResult = await this.golferService.getGolferById(userId);
      if(golferResult == null) {return}
      console.log(golferResult)
      this.golfer = golferResult;

      if (this.golfer) {
        this.originalUsername = this.golfer.username;
        this.profileForm.get('username')?.setAsyncValidators(
          this.usernameUniqueValidator(this.originalUsername)
        );
        this.profileForm.get('username')?.updateValueAndValidity();

        // Patch the form with existing golfer data
        this.profileForm.patchValue({
          username: this.golfer.username,
          handicap: this.golfer.handicap == null ? '' : this.golfer.handicap,
          firstName: this.golfer.firstName || '',
          lastName: this.golfer.lastName || '',
          homeGolfClub: this.golfer.homeGolfCourseId || ''
        });
      }
    } catch (error) {
      console.error('Error loading golfer:', error);
    }
  }

  openEditModal() {
    this.showEditProfileModal = true;
  }

  closeEditModal() {
    this.showEditProfileModal = false;
  }

  openImageEditModal() {
    this.showEditProfilePicModal = true;
  }

  closeImageEditModal() {
    this.showEditProfilePicModal = false;
  }

  usernameUniqueValidator(originalUsername: string): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value || control.value === originalUsername) {
        return of(null);
      }

      return timer(500).pipe(
        switchMap(() => this.golferService.checkUsernameAvailable(control.value)),
        map(isAvailable => (isAvailable ? null : { usernameTaken: true })),
        catchError(() => of(null))
      );
    };
  }

  async onSubmit(isEdit: boolean = false) {
    this.saving = true; 
    this.isSubmitting = true;
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      this.saving = false;
      this.isSubmitting = false;
      return;
    }

    this.isSubmitting = true;

    const fv = this.profileForm.value;

    console.log(fv);
    
    let dto: UpdateGolferDTO = {
      username: fv.username == '' || fv.username == this.golfer?.username ? null : fv.username,
      firstName: fv.firstName == '' ? null : fv.firstName,
      lastName:  fv.lastName == '' ? null : fv.lastName,
      handicap:  fv.handicap == '' ? null : Number(fv.handicap),
      homeCourseId: fv.homeCourseId == 0 ? null : fv.homeCourseId,
      profilePicture: null
    }

    try {
      if (isEdit && this.golfer) {
        this.authService.currentUser$.subscribe(async user => {
          await this.golferService.updateGolfer(user!.uid!, dto);
          this.closeEditModal();
        });
      } else {
        console.log(fv)
        let dto: CreateGolferDTO = {
          username: fv.username == '' || fv.username == this.golfer?.username ? null : fv.username,
          firstName: fv.firstName == '' ? null : fv.firstName,
          lastName:  fv.lastName == '' ? null : fv.lastName,
          handicap:  fv.handicap == '' ? null : Number(fv.handicap)
        };
        this.authService.currentUser$.subscribe(async user => {
          const createdGolfer = await this.golferService.createGolfer(user?.uid!, dto);
        if (createdGolfer) {
          this.golfer = createdGolfer;
        } else {
          this.authService.currentUser$.subscribe(async user => {
            if (user) {
              await this.loadGolfer(user.uid);
            }
          });
        }
        });
        
      }
    } catch (err) {
      console.error(err);
    }

    this.saving = false;
    this.isSubmitting = false;
  }

  async onFileSelect(event: {file: File, preview: string}) {
    try {
      if (!this.golfer) {
        console.error('No golfer found');
        return;
      }

      this.saving = true;
      this.golferPicture = event.preview;
      this.authService.currentUser$.subscribe(async user => {
        if (user) {
          let dto: UpdateGolferDTO = {
            username: null,
            firstName: null,
            lastName:  null,
            handicap:  null,
            homeCourseId: null,
            profilePicture: event.file
          }
          await this.golferService.updateGolfer(user.uid, dto);
        }
      });


      
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      this.golferPicture = null;
    } finally {
      this.saving = false;
      this.closeImageEditModal();
    }
  }
}
