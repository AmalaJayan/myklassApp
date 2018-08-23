import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { List } from '../list';
import { ListService } from '../list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'appointment-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  list$: Observable<List[]>;
  role: boolean;

  constructor(private lists: ListService,private router: Router) { }

  ngOnInit() {
    this.list$ = this.lists.getLists();
    let roleName = localStorage.getItem("user_role");
    if(roleName === "admin")
      this.role = true;
  }
  create() {
    this.router.navigate(['create']);
  }
}
