import { Component, OnInit } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isWideScreen$: Observable<boolean> | undefined;
  isSmallScreen$: Observable<boolean> | undefined;

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.isWideScreen$ = this.breakpointObserver.observe(['(min-width: 1200px)']).pipe(map((({matches}) => matches)));
    this.isSmallScreen$ = this.breakpointObserver.observe(['(max-width: 576px)']).pipe(map((({matches}) => matches)));
  }
  downloadMyResume() {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'assets/resume.pdf');
    link.setAttribute('download', `Omar-Fendri-Resume.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}
