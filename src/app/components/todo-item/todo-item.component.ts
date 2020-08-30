import { Component, OnInit, Input } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { TodoService } from 'src/app/services/todo.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
// import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  todoTasks = this.todoService.getTodos();
  @Input() checked : false;
  @Input() connectedList = [];
  showDialog = false;
  editingTodo: any = null;
  fieldValue = '';
  deleting = false;
  deleteList = false;
  title =  'MyTodo 1';
  okButtonText = 'Create task';
  targetList = '';
  index = -1;
  currentTarget = '';
  deletingString = false;
  headString ='New Task';
  duplicate =  false;
  closeResult ='';
  mymodal: any = null;
  mySubscription: any;
  constructor(private todoService: TodoService, private modalService: NgbModal) { 
    this.todoTasks = this.todoService.getTodos();
    console.log("In constructor connectedList: ", this.connectedList);

    // this.router.routeReuseStrategy.shouldReuseRoute = function () {
    //   return false;
    // };
    // this.mySubscription = this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     this.router.navigated = false;
    //     window.scrollTo(0, 0);
    //   }
    // });
  }

  ngOnInit(): void {
    this.todoTasks = this.todoService.getTodos();
    console.log("connectedList: ", this.connectedList);
  }

  // ngOnDestroy() {
  //   if (this.mySubscription) {
  //     this.mySubscription.unsubscribe();
  //   }
  // }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
  // open(content) {
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }
  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return  `with: ${reason}`;
  //   }
  // }

  todoDialog(event, modal = null, todo = null): void {

    this.targetList = event.currentTarget.name;
    this.okButtonText = 'Create task';
    this.fieldValue = '';
    this.headString = 'New Task';
    this.editingTodo = todo;
    if (modal) {
      this.mymodal = modal;
    }
    if (todo) {
      this.fieldValue = todo.title;
      this.headString = 'Edit task';
      this.okButtonText = 'Edit';
    }
    this.showDialog = true;
  }

  confirmationTodoDialog(event, todo = null, index: number): void {
    this.okButtonText = 'Delete';
    this.fieldValue = 'Do you want to delete ' + todo.title;
    if(index > -1) {
      this.deleting = true;
      this.deletingString = true;
      this.headString = 'Delete Task';
    } else {
      this.deleteList = true;
      this.deletingString = true;
      this.headString = 'Delete List'
    }
    this.currentTarget = event.currentTarget.name;
    this.showDialog = true;
    this.index = index;
  }

  editTodoList(event, todoList) {
    this.targetList = event.currentTarget.name;
    this.fieldValue = this.targetList;
    this.editingTodo = todoList;
    this.okButtonText = 'Edit List Name';
    this.showDialog = true;
  }

  removeList(): void {
    for(var i = 0; i <this.todoTasks.length; i++)
    {
      if (this.todoTasks[i].title == this.currentTarget) 
      {
          this.todoTasks.splice(i, 1);
      }
      this.deleteList = false;
    }
    this.todoService.storeOnLocalStorage(this.todoTasks);
  }

  dropSide(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.todoTasks, event.previousIndex, event.currentIndex);
  }

  remove(index: number): void {
    for(var i = 0; i <this.todoTasks.length; i++)
    {
      if (this.todoTasks[i].title == this.currentTarget) 
      {
          this.todoTasks[i].todo.splice(index, 1);
      }
      console.log(this.todoTasks[i]);
    }
    this.todoService.storeOnLocalStorage(this.todoTasks);
    this.deleting = false;
  }

  updateTodo(title): void {
    if (title) {
      title = title.trim();
      if (this.deleteList) {
        this.removeList();
      }
      else if (this.deleting) {
         this.remove(this.index);
      } else if (this.editingTodo) {
        this.editTodo(title);
      } else if (this.duplicate){
        console.log('Duplicate');
      }
      else {
        this.addTodo(title, this.targetList);
      }
    }
    this.hideDialog();
  }
  addTodo(title, listTitle): void {
    const todo = {id : 3, title: title, completed: false};
    let existing = false;
    for(var i = 0; i <this.todoTasks.length; i++)
    {
      if (this.todoTasks[i].title == listTitle) 
      {
        for(var j = 0; j <this.todoTasks[i].todo.length; j++){

          if(this.todoTasks[i].todo[j].title === todo.title){
            existing = true;
            break;
          }
        }
        if (!existing) {
          this.todoTasks[i].todo.push(todo);
          break;
        }
      }
      console.log(this.todoTasks[i]);
    }

    if(existing) {
      this.todoService.open(this.mymodal);
    } else {
      this.todoService.storeOnLocalStorage(this.todoTasks);
    }
  }

  hideDialog(): void {
    this.showDialog = false;
    this.editingTodo = null;
    this.deletingString = false;
    this.deleteList = false;
    this.index = -1;
    this.deleting = false;
    this.fieldValue = null;
    this.duplicate = false;
    this.todoTasks = this.todoService.getTodos();
  }

  editTodo(title): void {
    let existing = false;
    if(this.fieldValue !== title){
      if (this.todoTasks) {
        for (var i = 0; i < this.todoTasks.length; i++)
        {
          if (this.todoTasks[i].title == title)
          {
            existing = true;
            break;
          } else {
            for(var j = 0; j <this.todoTasks[i].todo.length; j++){
  
              if (this.todoTasks[i].todo[j].title === title){
                existing = true;
                break;
              }
            }
          }
        }
        if (!existing) {
          for (let i = 0; i < this.todoTasks.length; i++)
          {
            if (this.todoTasks[i].title == this.editingTodo.title) 
            {
              this.todoTasks[i].title = title;
              break;
            } else {
              for( let j = 0; j <this.todoTasks[i].todo.length; j++){
                if (this.todoTasks[i].todo[j].title === this.editingTodo.title) {
                  this.todoTasks[i].todo[j].title = title;
                  break;
                }
              }
            }
          }
          this.todoService.storeOnLocalStorage(this.todoTasks);
        }
        else {
          this.todoService.open(this.mymodal);
        }
      }
    }
    
  }
}
