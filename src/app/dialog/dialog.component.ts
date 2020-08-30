import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormsModule} from '@angular/forms';
//import {ErrorStateMatcher} from '@angular/material/core';

// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  @Input() value: string;
  @Input() showPrompt: boolean;
  @Input() placeholder: string;
  @Input() title: string;
  @Input() template: string;
  @Input() okText: string;
  @Input() cancelText: string;
  @Input() checked: false;
  @Output() valueEmitted = new EventEmitter<string>();
  @Input() deletingString = false;
  valueEntered = true;

  constructor() {
    this.okText = 'OK';
    this.cancelText = 'Cancel';
  }

  // nameFormControl = new FormControl('', [
  //   Validators.required
  // ]);

 // matcher = new MyErrorStateMatcher();
  ngOnInit(): void {

  }

  emitValue(value): void {
    
    if(value == null || value == '') {
      this.valueEntered = false;
    }
    this.valueEmitted.emit(value);
  }

}
