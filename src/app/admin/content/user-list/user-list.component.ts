import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  
  user:User[]=[];
  constructor(private userService : UserService , private formBuilder: FormBuilder,
    private toastrService:ToastrService){}

  ngOnInit(): void {
      this.getUser();
      this.UserDeleteForm();
  }

  UserDelete !: FormGroup;
  UserDeleteForm() {
    this.UserDelete = this.formBuilder.group({
      id:[""],
      username: [""],
      name : [""],
      surname : [""],
      mail : [""],
      isActive:[false] 

    })
 
  }
  
  delete() {
    if (this.UserDelete.valid) {
      let userModel = Object.assign({}, this.UserDelete.value)
      this.userService.add(userModel).subscribe(Response=>{
        this.toastrService.success("Başarılı")
        this.getUser();

      })
    }
    else{
      this.toastrService.error("Formunuz Eksik","Dikkat")
    }
  }

  getUser(){
    this.userService.getUser().subscribe(respone=>{
      this.user = respone;
      for (let index = 0; index < this.user.length; index++) {
        this.UserDelete.controls["id"].setValue(this.user[index].id);
        this.UserDelete.controls["username"].setValue(this.user[index].username);
        this.UserDelete.controls["name"].setValue(this.user[index].name);
        this.UserDelete.controls["surname"].setValue(this.user[index].surname);
        this.UserDelete.controls["mail"].setValue(this.user[index].mail);
      }
    })

  }
}
