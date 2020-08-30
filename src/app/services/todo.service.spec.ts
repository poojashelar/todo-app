import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return Todo tasks data', () => {
    expect(service).toBeTruthy();
    expect(service.getTodos()).toEqual({ title: 'New List', todo: [  ] });
  });
});
