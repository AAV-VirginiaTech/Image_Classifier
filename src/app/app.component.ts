import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, FormBuilder, FormArray, ValidatorFn, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  constructor(private formBuilder: FormBuilder) {}
  // *** PASTE FROM ImageList.py HERE ***
  imgPath = ['assets/images/test_blue.png', 'assets/images/test_crop.png', 'assets/images/test_three.png'];
  // ************************************
  imageNum = this.imgPath.length;
  dynamicForm: FormGroup;
  submitted = false;
  colors =  ['RED', 'ORANGE', 'YELLOW', 'GREEN', 'BLUE', 'PURPLE', 'BLACK', 'GREY', 'WHITE'];
  title = 'Image Classifier';
  shape = new Array(this.imageNum);
  shapeC = new Array(this.imageNum);
  letter = new Array(this.imageNum);
  letterC = new Array(this.imageNum);
  info = new Array(this.imageNum);
  ngOnInit(): void {
    this.dynamicForm = this.formBuilder.group({
      forms: new FormArray([])
    });
    for (let i = this.formFields.length; i < this.imageNum; i++) {
      this.formFields.push(this.formBuilder.group({
        shapeType: new FormControl('', [Validators.required, alphanumericValidator()]),
      shapeColor: new FormControl('', Validators.required),
      letterType: new FormControl('',
      [Validators.required, Validators.minLength(1), Validators.maxLength(1), alphanumericValidator()]),
      letterColor: new FormControl('', Validators.required)
      }));
    }
  }
  get formControls(): { [p: string]: AbstractControl } { return this.dynamicForm.controls; }
  get formFields(): FormArray { return this.formControls.forms as FormArray; }
  get classifyFormGroups(): FormGroup[] {return this.formFields.controls as FormGroup[]; }
  submitForm(): void {
    this.submitted = true;
    if (this.dynamicForm.invalid) {
      return;
    }
    for (let i = 0; i < this.classifyFormGroups.length; i++) {
      this.shape[i] = this.classifyFormGroups[i].get('shapeType').value;
      this.shapeC[i] = this.classifyFormGroups[i].get('shapeColor').value;
      this.letter[i] = this.classifyFormGroups[i].get('letterType').value;
      this.letterC[i] = this.classifyFormGroups[i].get('letterColor').value;
      let object;
      object = {
        mission: (i + 1),
        type: 'STANDARD',
        shape: this.shape[i],
        shape_color: this.shapeC[i],
        alphanumeric: this.letter[i],
        alphanumeric_color: this.letterC[i],
        autonomous: false
      };
      this.info[i] = JSON.stringify(object, null, 4);
    }
  }
}

export function alphanumericValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const allowed = (/^[a-z0-9]+$/i).test(control.value);
    return allowed ? null : {invalid: {value: control.value}} ;
  };
}
