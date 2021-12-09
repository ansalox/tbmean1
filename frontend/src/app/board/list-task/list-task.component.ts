import { Component, OnInit } from '@angular/core';
import { BoardService } from '../../services/board.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css'],
})
export class ListTaskComponent implements OnInit {
  taskData: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;

  constructor(
    private _boardService: BoardService,
    private _snackBar: MatSnackBar
  ) {
    this.taskData = {};
  }

  ngOnInit(): void {
    this._boardService.listTask().subscribe({
      next: (v) => {
        this.taskData = v.taskList;
      },
      error: (e) => {
        this.message = e.error.message;
        this.openSnackBarError();
      },
    });
  }

  updateTask() {}

  deleteTask() {}

  openSnackBarSuccesfull() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackbarTrue'],
    });
  }
  openSnackBarError() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackbarFalse'],
    });
  }
}
