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
  golfer: any = null;
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
            // Alphanumeric only
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
      const value = await this.golferService.getGolferById(userId);
      this.golfer = value;

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
          homeGolfClub: this.golfer.homeGolfClub || ''
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
    const mappedValue: any = {
      username: fv.username,
      firstName: fv.firstName === '' ? null : fv.firstName,
      lastName:  fv.lastName  === '' ? null : fv.lastName,
      handicap:  fv.handicap  === '' ? null : Number(fv.handicap),
      homeGolfClub: fv.homeGolfClub === '' ? null : fv.homeGolfClub
    };

    try {
      if (isEdit && this.golfer) {
        this.golfer = { ...this.golfer, ...mappedValue };
        await this.golferService.updateGolfer(this.golfer.id, this.golfer);
        this.closeEditModal();
      } else {
        const createdGolfer = await this.golferService.createProfile(mappedValue);
        if (createdGolfer) {
          this.golfer = createdGolfer;
        } else {
          this.authService.currentUser$.subscribe(async user => {
            if (user) {
              await this.loadGolfer(user.uid);
            }
          });
        }
      }
    } catch (err) {
      console.error(err);
    }

    this.saving = false;
    this.isSubmitting = false;
  }

  async onFileSelect(event: {file: File, preview: string}) {
    try {
      if (!this.golfer?.id) {
        console.error('No golfer ID found');
        return;
      }

      this.saving = true;
      this.golferPicture = event.preview;
      
      const uploadedUrl = await this.golferService.uploadProfilePicture(this.golfer.id, event.file);
      this.golferPicture = uploadedUrl;
      
      this.golfer = {
        ...this.golfer,
        profilePicture: this.golferPicture
      };
      await this.golferService.updateGolfer(this.golfer.id, this.golfer);
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      this.golferPicture = null;
    } finally {
      this.saving = false;
      this.closeImageEditModal();
    }
  }
}
