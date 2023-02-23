import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  public loginGroup: FormGroup;
  public usersData: any;

  constructor(
    private _fb: FormBuilder,
    private _route: Router,
    private _service: CommonService,
  ) {
    this.loginGroup = this._fb.group({
      name: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this._service.getUsers().subscribe((data) => this.usersData = data.data.doc)
  }

  public onSubmit() {
    let findUser = this.usersData.find((items:any) => items.first_name === this.loginGroup.value.name)
    if (findUser) {
      this._service.userName.next(findUser)
      this._route.navigateByUrl('/chat')
      localStorage.setItem('name', this.loginGroup.value.name)
    }else{
      alert('Invalid User')
    }
    
  }

}
