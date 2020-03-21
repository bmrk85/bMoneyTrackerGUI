import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private snackBar: MatSnackBar) {
  }

  displaySuccessMessage(item?: string, length?) {
    if (item) {
      this.snackBar.open(`${item.charAt(0).toUpperCase() + item.slice(1)} successfully modified`, null, {
        duration: length ? length * 1000 : 2000
      })
    } else {
      this.snackBar.open('Success', null, {
        duration: length ? length * 1000 : 2000
      })
    }
  };

  displayErrorMessage(item?: string, length?) {
    if(item){
      this.snackBar.open(`Error modifying ${item}`, null, {
        duration: length ? length * 1000 : 2000
      })
    }else{
      this.snackBar.open(`Something went wrong`, null, {
        duration: length ? length * 1000 : 2000
      })
    }
  };

  displayCustomMessage(message: string, length?){
    this.snackBar.open(`${message}`, null, {
      duration: length ? length * 1000 : 2000
    })
  }


}
