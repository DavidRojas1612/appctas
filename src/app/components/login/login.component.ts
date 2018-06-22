import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { CognitoUser } from "amazon-cognito-identity-js";
import { SharedService } from "../../services/shared.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  usuario = {
    correo: null,
    password: null,
    logged: false
  };

  constructor(
    private _sharedService: SharedService,
    private _auth: AuthService,
    private _router: Router
  ) {}

  ngOnInit() {}

  login() {
    this._auth.signIn(this.usuario.correo, this.usuario.password).subscribe(
      result => {
        this._router.navigate(["/profile", result.username]);
      },
      error => {
        console.log(error);
      }
    );
  }
}
