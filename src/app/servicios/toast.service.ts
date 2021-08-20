import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private matSnackBar: MatSnackBar) { }

  /**
   * Crea un 'toast' mediante @angular/material/snack-bar
   * @param msg 
   * @param flag 'success' | 'error' | 'info' | 'warning'
   * @param action string que aparece en el botton, valor opcional
   */
  public display(msg: string, flag: string, action: string = '') {
    const choice = {
      success: () => {
        this.matSnackBar.open(msg, action, {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass: "success-toast"
        });
      },
      error: () => {
        this.matSnackBar.open(msg, action, {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass: 'error-toast'
        });
      },
      info: () => {
        this.matSnackBar.open(msg, action, {
          duration: 2500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: 'info-toast'
        });
      },
      warning: () => {
        this.matSnackBar.open(msg, action, {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass: 'warning-toast'
        });
      },
      user: () => {
        this.matSnackBar.open(msg, action, {
          duration: 6000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'user-toast'
        });
      }
    };

    choice[flag]();
    
  }
}
