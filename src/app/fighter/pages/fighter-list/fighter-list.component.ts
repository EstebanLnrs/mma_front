import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Fighter } from '../../models/fighter';
import { FighterService } from '../../services/fighter.service';
import { MatDialog } from '@angular/material/dialog';
import { GenericPopupComponent } from 'src/app/shared/components/generic-popup/generic-popup.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FighterFormComponent } from '../../components/fighter-form/fighter-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fighter-list',
  templateUrl: './fighter-list.component.html',
  styleUrls: ['./fighter-list.component.scss']
})

export class FighterListComponent implements OnInit, OnDestroy {

  fighters$!: Observable<Fighter[]>;
  displayedColumns: string[] = ['firstName', 'surname', 'lastName', 'organisation', 'dateOfBirth', 'update', 'delete'];



  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private fighterService: FighterService, private dialog: MatDialog, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.fighters$ = this.fighterService.get();
  }
  openFighterForm(fighter?: Fighter) {
    const dialogRef = this.dialog.open(FighterFormComponent, {
      height: '85%',
      width: '60%',
      data: {
        isCreateForm: fighter ? false : true,
        fighter: fighter ? fighter : undefined
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
          this.fighterService.delete(id)
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
  showFighterDetails(id: number) {
    this.router.navigate(['/fighters/' + id])
  }

}
