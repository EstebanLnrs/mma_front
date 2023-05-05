import { Component, Inject } from '@angular/core';
import { Organisation } from '../../models/organisation';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';

export interface OrganisationFormData {
  isCreateForm: boolean;
  organisation: Organisation;
}
@Component({
  selector: 'app-organisation-form',
  templateUrl: './organisation-form.component.html',
  styleUrls: ['./organisation-form.component.scss']
})

export class OrganisationFormComponent {
  constructor(public dialogRef: MatDialogRef<OrganisationFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrganisationFormData, private fb: FormBuilder) { }
  organisationForm = this.fb.group({
    id: [0, [Validators.required]],
    name: ['', [Validators.required]],
  });
}
