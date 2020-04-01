import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service/user.service';
import { User } from '../../models/user';
import { MessageService } from '../../services/message-service/message.service';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category-service/category.service';
import { MatDialog } from '@angular/material';
import { EditCategoryModalComponent } from '../../modals/edit-category-modal/edit-category-modal.component';

@Component( {
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
} )
export class ProfileComponent implements OnInit {

  currentUser: User;

  constructor( private userService: UserService,
               private messageService: MessageService,
               private categoryService: CategoryService,
               public dialog: MatDialog, ) {
  }

  ngOnInit() {
    this.userService.getUser().subscribe( data => this.currentUser = data, () => this.messageService.displayErrorMessage() );
  }

  editCategory( c: Category ) {
    const dialogRef = this.dialog.open( EditCategoryModalComponent, {
        width: '32rem',
        data: c
      }
    );
    dialogRef.afterClosed().subscribe(data =>{
      if(!data.cancelled){
        this.categoryService.editCategory(data).subscribe(
          null,
          () => this.messageService.displayErrorMessage('category'),
          () => {
            this.messageService.displaySuccessMessage('category');
          }
        )
      }
    })
  }
}
