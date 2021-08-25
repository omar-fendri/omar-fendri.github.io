import { Component, OnInit } from '@angular/core';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  isWideScreen$: Observable<boolean> | undefined;
  isSmallScreen$: Observable<boolean> | undefined;

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.isWideScreen$ = this.breakpointObserver.observe(['(min-width: 1200px)']).pipe(map((({matches}) => matches)));
    this.isSmallScreen$ = this.breakpointObserver.observe(['(max-width: 576px)']).pipe(map((({matches}) => matches)));
  }

}
