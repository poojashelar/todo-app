import { Component, OnInit, Input} from '@angular/core';
import { Todo } from '../../models/Todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})

export class TodosComponent implements OnInit {

  todoTasks: {};
  @Input() checked : false;
  @Input() connectedList = [];
  constructor(private todoService: TodoService) {
    this.todoTasks = this.todoService.getTodos();
   }

  ngOnInit(): void {
    this.todoTasks = this.todoService.getTodos();
  }
}
