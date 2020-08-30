import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'todo-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('todo-app');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.innerText).toBe('Task Management App add Theme');
  });

  it('should update variables for dialog box ', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app.okButtonText).toBe('Create task');
    expect(app.fieldValue).toBe('');
    expect(app.showDialog).toBeFalse();
    app.todoDialog();
    expect(app.okButtonText).toBe('Create List');
    expect(app.fieldValue).toBe('');
    expect(app.showDialog).toBeTrue();
  });

  it('should update variables in todoDialog for dialog box ', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app.okButtonText).toBe('Create task');
    expect(app.fieldValue).toBe('');
    expect(app.showDialog).toBeFalse();
    app.todoDialog();
    expect(app.okButtonText).toBe('Create List');
    expect(app.fieldValue).toBe('');
    expect(app.showDialog).toBeTrue();
  });

  it('should update variables in todoDialog with todo object for dialog box ', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app.okButtonText).toBe('Create task');
    expect(app.fieldValue).toBe('');
    expect(app.showDialog).toBeFalse();
    app.todoDialog({title: 'Pay bills'});
    expect(app.okButtonText).toBe('Edit task');
    expect(app.fieldValue).toBe('Pay bills');
    expect(app.showDialog).toBeTrue();
  });

  it('should take data from service ', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app.todoTasks).toEqual(app.todoService.getTodos());
    expect(app.connectedList).toEqual(['Inprogress', 'Done']);
  });

  it('should add new list data using updateTodo()  ', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    app.updateTodo('NewList');
    expect(app.todoTasks).toEqual([{title: 'Inprogress', todo: [{id: 1, title: 'Reading Novel', completed: false}, 
    {id: 2, title: 'Todo two', completed: false}]},
    {title: 'Done', todo: [{id: 1, title: 'Adding themes', completed: false},
    {id: 2, title: 'D2H Recharge', completed: false}]},
    {title: 'NewList', todo: []}]);
    expect(app.connectedList).toEqual(['Inprogress', 'Done', 'NewList']);
  });

  it('should not add new list if it already exists  ', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    app.updateTodo('Inprogress');
    expect(app.todoTasks).toEqual([{title: 'Inprogress', todo: [{id: 1, title: 'Reading Novel', completed: false}, 
    {id: 2, title: 'Todo two', completed: false}]},
    {title: 'Done', todo: [{id: 1, title: 'Adding themes', completed: false},
    {id: 2, title: 'D2H Recharge', completed: false}]}]);
    expect(app.connectedList).toEqual(['Inprogress', 'Done']);
  });

  it('hideDialog should have been called ', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    app.updateTodo('Inprogress');
    expect(app.fieldValue).toBeNull;
    expect(app.showDialog).toBeFalse;

  });
});
