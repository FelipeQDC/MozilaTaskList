import { Component,Input, Output, EventEmitter } from '@angular/core';
import { Users } from "../Users";
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  editando = false;
  @Input() Users: Users = new Users("","",false);
  @Output() removeUser = new EventEmitter();
  @Output() modificaUser = new EventEmitter();
}


