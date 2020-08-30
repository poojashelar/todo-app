import { Component } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { ThemesService } from './services/themes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'todo-app';
  showDialog = false;
  editingTodo: any = null;
  fieldValue = '';
  todoList: any;
  okButtonText = 'Create task';
  todoTasks: any;
  color = 'accent';
  checked = false;
  connectedList = [];
  mymodal: any = null;

  constructor(public todoService: TodoService) {
    this.todoTasks = this.todoService.getTodos();
    if (this.todoTasks) {
      for (let list of this.todoTasks) {
        this.connectedList.push(list.title);
      }
    } else {
      this.todoTasks = [];
    }
  }

  todoDialog(modal = null, todo = null): void {
    this.okButtonText = 'Create List';
    this.fieldValue = '';
    this.editingTodo = todo;
    if (modal) {
      this.mymodal = modal;
    }
    if (todo) {
      this.fieldValue = todo.title;
      this.okButtonText = 'Edit';
    }
    this.showDialog = true;
  }

  updateTodo(title): void {
    if (title) {
      title = title.trim();
      this.addTodoList(title);
    }
    this.hideDialog();
  }

  addTodoList(title): void {
    let existing = false;
    this.todoTasks = this.todoService.getTodos();
    if (this.todoTasks) {
      for (var i = 0; i < this.todoTasks.length; i++) {
        if (this.todoTasks[i].title == title) {
          existing = true;
          break;
        }
      }
    }

    if (!existing) {
      this.todoTasks.push({ title: title, todo: [] });
      this.todoService.storeOnLocalStorage(this.todoTasks);
      this.todoTasks = this.todoService.getTodos();
      this.connectedList.push(title);
      window.location.href = window.location.href;
    } else {
      this.todoService.open(this.mymodal);
    }
  }

  hideDialog(): void {
    this.showDialog = false;
    this.editingTodo = null;
    this.fieldValue = null;
    this.todoTasks = this.todoService.getTodos();
  }
}
