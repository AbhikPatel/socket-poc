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
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
  }

  public onSubmit() {
    if (this.loginGroup.valid) {
      this._service.postLogin(this.loginGroup.value).subscribe((data) => {
        localStorage.setItem('token', data.token)
        let user = JSON.stringify(data.data.doc)
        localStorage.setItem('user', user)
        this._route.navigateByUrl('/chat')
      })
    }
  }

}
