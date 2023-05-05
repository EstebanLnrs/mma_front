import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Fighter } from '../../models/fighter';
import { Subject, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrganisationService } from 'src/app/organisation/services/organisation.service';
import { FighterService } from '../../services/fighter.service';
import { Organisation } from 'src/app/organisation/models/organisation';

export interface FighterFormData {
  isCreateForm: boolean;
  fighter: Fighter;
}

@Component({
  selector: 'app-fighter-form',
  templateUrl: './fighter-form.component.html',
  styleUrls: ['./fighter-form.component.scss']
})


export class FighterFormComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  organisations: Organisation[] = [];
  fighterForm = this.fb.group({
    id: [0, [Validators.required]],
    firstname: ['', [Validators.required]],
    surname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    organisation: [0, [Validators.required]],
    dateOfBirth: ['', [Validators.required]]
  });

  constructor(public dialogRef: MatDialogRef<FighterFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FighterFormData, private fb: FormBuilder,
    private fighterService: FighterService,
    private _snackBar: MatSnackBar,
    private organisationService: OrganisationService) {
    if (!data.isCreateForm) {
      this.fighterForm.patchValue(data.fighter);
    }
  }
  ngOnInit(): void {
    this.organisationService
      .get()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res) => {
          this.organisations = res;
        },
        (err) => {
          console.log('Error fetching organisations', err);
        }
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  setFighterForm(fighter: Fighter) {
    this.fighterForm.setValue({
      id: fighter.id,
      firstname: fighter.firstName,
      surname: fighter.surname,
      lastname: fighter.lastName,
      organisation: fighter.organisation,
      dateOfBirth: fighter.dateOfBirth
    });
  }

  get title() {
    if (this.data.isCreateForm) {
      return 'Formulaire de création';
    }
    return 'Formulaire de modification';
  }

  get submitBtnName() {
    if (this.data.isCreateForm) {
      return 'Ajouter';
    }
    return 'Modifier';
  }

  onSubmit() {
    if (this.fighterForm.valid) {
      this.fighterForm.value.dateOfBirth = new Date(this.fighterForm.value.dateOfBirth!).toISOString();
      if (this.data.isCreateForm) {
        this.fighterForm.value.id = Date.now() + Math.random();
        this.fighterService.create(this.fighterForm.value as Fighter)
          .pipe(takeUntil(this.destroy$))
          .subscribe(result => {
            this._snackBar.open(result, '', {
              duration: 2000,
              panelClass: ['bg-success']
            });

            this.dialogRef.close(true);
          });
      } else {
        this.fighterService.update(this.fighterForm.value as Fighter)
          .pipe(takeUntil(this.destroy$))
          .subscribe(result => {
            this._snackBar.open(result, '', {
              duration: 2000,
              panelClass: ['bg-success']
            });
            this.dialogRef.close(true);
          });
      }
    }
  }
}



