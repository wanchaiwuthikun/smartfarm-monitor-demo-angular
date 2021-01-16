import { Component, OnInit } from '@angular/core';
import {AuthenService} from '@app/core/services/authen/authen.service';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.sass']
})
export class ContentLayoutComponent implements OnInit {

  constructor(private authenService: AuthenService) { }

  ngOnInit(): void {
  }

  onSignOut(): void {
    this.authenService.signOut();

  }
}
