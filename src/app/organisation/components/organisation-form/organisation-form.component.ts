import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Organisation } from '../../models/organisation';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrganisationService } from '../../services/organisation.service';
import { Subject, takeUntil } from 'rxjs';

export interface OrganisationFormData {
  isCreateForm: boolean;
  organisation: Organisation;
}
@Component({
  selector: 'app-organisation-form',
  templateUrl: './organisation-form.component.html',
  styleUrls: ['./organisation-form.component.scss']
})

export class OrganisationFormComponent implements OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(public dialogRef: MatDialogRef<OrganisationFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrganisationFormData, private fb: FormBuilder,
    private organisationService: OrganisationService,
    private _snackBar: MatSnackBar,
  ) {
    if (!data.isCreateForm) {
      this.organisationForm.patchValue(data.organisation);
    }
  }
  organisationForm = this.fb.group({
    id: [0, [Validators.required]],
    name: ['', [Validators.required]],
  });

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  setOrganisationForm(organisation: Organisation) {
    this.organisationForm.setValue({
      id: organisation.id,
      name: organisation.name
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
    if (this.organisationForm.valid) {
      if (this.data.isCreateForm) {
        this.organisationForm.value.id = Date.now() + Math.random();
        this.organisationService.create(this.organisationForm.value as Organisation)
          .pipe(takeUntil(this.destroy$))
          .subscribe(result => {
            this._snackBar.open(result, '', {
              duration: 2000,
              panelClass: ['bg-success']
            });

            this.dialogRef.close(true);
          });
      } else {
        this.organisationService.update(this.organisationForm.value as Organisation)
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