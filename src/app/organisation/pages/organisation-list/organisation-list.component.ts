import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Organisation } from '../../models/organisation';
import { OrganisationService } from '../../services/organisation.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenericPopupComponent } from 'src/app/shared/components/generic-popup/generic-popup.component';
import { OrganisationFormComponent } from '../../components/organisation-form/organisation-form.component';

@Component({
  selector: 'app-organisation-list',
  templateUrl: './organisation-list.component.html',
  styleUrls: ['./organisation-list.component.scss']
})
export class OrganisationListComponent implements OnInit, OnDestroy {
  organisations$!: Observable<Organisation[]>;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private organisationService: OrganisationService, private dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.organisations$ = this.organisationService.get();
  }
  openStudentForm(organisation?: Organisation) {
    const dialogRef = this.dialog.open(OrganisationFormComponent, {
      height: '85%',
      width: '60%',
      data: {
        isCreateForm: organisation ? false : true,
        organisation: organisation ? organisation : undefined
      }
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result) {
          this.fetchData();
        }
      });
  }

  delete(id: number) {
    const ref = this.dialog.open(GenericPopupComponent, {
      data: {
        title: 'Confirmation de suppression',
        message: 'êtes-vous sûr de vouloir supprimer cet étudiant ?',
        typeMessage: 'none',
        yesButtonVisible: true,
        noButtonVisible: true,
        cancelButtonVisible: false,
        defaultButton: 'No',
        yesButtonLabel: 'Oui',
        noButtonLabel: 'Non',
      },
    })

    ref.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result) {
          this.organisationService.delete(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(result => {
              this._snackBar.open(result, '', {
                duration: 2000,
                panelClass: ['bg-success']
              });
              this.fetchData();
            });
        }
      });
  }
}
