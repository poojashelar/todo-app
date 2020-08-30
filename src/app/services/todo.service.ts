import { Inject,  Injectable } from '@angular/core';
import { Todo } from '../models/Todo';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
// key that is used to access the data in local storageconst 

export class TodoService {
  n = 0;
  anotherTodolist = [];
  showDialog = false;
  editingTodo: any = null;
  fieldValue = '';
  todoList: any = {title: 'New List', todo: []};
  okButtonText = 'Create task';
  STORAGE_KEY = 'local_todolist';
  closeResult = '';

// todoTasks =  [{
//   title: 'Inprogress',
//   todo:  [
//     {
//       id: 1,
//       title: 'Reading Novel',
//       completed: false
//     },
//     {
//       id: 2,
//       title: 'Todo two',
//       completed: false
//     }
//   ]
// },
// {
//   title: 'Done',
//   todo:  [
//     {
//       id: 1,
//       title: 'Adding themes',
//       completed: false
//     },
//     {
//       id: 2,
//       title: 'D2H Recharge',
//       completed: false
//     }
//   ]
// }];

constructor(@Inject(LOCAL_STORAGE) private storage: StorageService, private modalService: NgbModal) {
 // this.storage.set(this.STORAGE_KEY, this.todoTasks);
 if (!this.storage.get(this.STORAGE_KEY)){
  this.storage.set(this.STORAGE_KEY, this.todoList);
}
  console.log(this.storage);
 }

public storeOnLocalStorage(todoTasks: {}[]): void {

 this.storage.set(this.STORAGE_KEY, todoTasks);
 console.log(this.storage.get(this.STORAGE_KEY) || 'LocaL storage is empty');
}

getTodos(): any{
  return this.storage.get(this.STORAGE_KEY);
}

open(content): void {
  this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}
private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}
}
