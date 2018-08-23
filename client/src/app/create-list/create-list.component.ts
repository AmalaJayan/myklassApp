import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import { ListService } from '../list.service';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.css']
})
export class CreateListComponent {

  createForm: FormGroup;
  time: object;

  constructor(private listService: ListService, private fb: FormBuilder, private router: Router) {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      description: '',
      date: '',
      status: ''
    });
  }

  addIssue(name, description, date, status) {
    this.listService.addList(name, description, date, this.time, status).subscribe(() => {
      
      this.router.navigate(['/list']);
    });
  }
  receiveMessage($event) {
    this.time = $event;
    console.log("Inside receive"+this.time);
  }

}
