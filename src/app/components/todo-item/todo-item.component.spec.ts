/*import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoItemComponent } from './todo-item.component';
import { TodoService } from 'src/app/services/todo.service';

fdescribe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;
 // let service: TodoService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoItemComponent ],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
  //  service  = TestBed.inject(TodoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should initialize task details', () => {
  //   expect(component.todoTasks).toEqual(JSON.parse(service.getTodos()));
  // });

  // it('should open Create Task dialog when click on add', () => {
  //   let event = {
  //     currentTarget : {
  //       name: 'Todo List'
  //     }
  //   };
  //   component.todoDialog(event);
  //   expect(component.showDialog).toBeTrue();
  //   expect(component.okButtonText).toEqual('Create Task');
  //   expect(component.fieldValue).toEqual('');
  //   component.hideDialog();
  // });

  // it('should open Edit Task dialog when click on edit', () => {
  //   let event = {
  //     currentTarget : {
  //       name: 'Todo List'
  //     }
  //   };
  //   let todo = {
  //     title: 'NewName'
  //   }
  //   component.todoDialog(event, null ,todo);
  //   expect(component.showDialog).toBeTrue();
  //   expect(component.okButtonText).toEqual('Edit');
  //   expect(component.fieldValue).toEqual(todo.title);
  //   component.hideDialog();
  // });

  // it('should open Delete Task dialog when click on delete Icon', () => {
  //   let event = {
  //     currentTarget : {
  //       name: 'Todo List'
  //     }
  //   };
  //   let todo = {
  //     title: 'NewName'
  //   }
  //   component.confirmationTodoDialog(event, todo, 0);
  //   expect(component.showDialog).toBeTrue();
  //   expect(component.deleting).toBeTrue();
  //   expect(component.headString).toEqual('Delete Task');
  //   component.hideDialog();
  // });

  // it('should open Delete List dialog when click on delete icon of list', () => {
  //   let event = {
  //     currentTarget : {
  //       name: 'Todo List'
  //     }
  //   };
  //   component.confirmationTodoDialog(event, null, -1);
  //   expect(component.showDialog).toBeTrue();
  //   expect(component.deleting).toBeTrue();
  //   expect(component.headString).toEqual('Delete List');
  //   component.hideDialog();
  // });

  // it('should Delete List', () => {
  //   let event = {
  //     currentTarget : {
  //       name: 'TestList'
  //     }
  //   };
  //   let todoList = [{
  //     title: 'TestList',
  //     todo: [{
  //       title: 'demoTask'
  //     }]
  //   }];

  //   service.storeOnLocalStorage(todoList);
  //   expect(component.todoTasks).toEqual(service.getTodos);
  //   expect(component.todoTasks.includes(todoList[0])).toBeTrue();
  //   component.confirmationTodoDialog(event, null, -1);
  //   component.updateTodo(event.currentTarget.name);
  //   expect(component.showDialog).toBeTrue();
  //   expect(component.deleting).toBeTrue();
  //   expect(component.headString).toEqual('Delete List');
  //   expect(component.todoTasks.includes(todoList[0])).toBeFalse();
  //   component.hideDialog();
  // });
}); */
import { async, ComponentFixture, TestBed, inject  } from '@angular/core/testing';

import { TodoItemComponent } from './todo-item.component';
import { TodoService } from 'src/app/services/todo.service';

fdescribe('TodosComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;
  let service: TodoService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoItemComponent ],
      providers: [TodoService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
   // service  = TestBed.get(TodoService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize task details', async(inject([TodoService], (service: TodoService) => {
      expect(component.todoTasks).toEqual(JSON.parse(service.getTodos()));
  })));
});
