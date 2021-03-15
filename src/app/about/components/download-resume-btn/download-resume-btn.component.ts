import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-download-resume-btn',
  templateUrl: './download-resume-btn.component.html',
  styleUrls: ['./download-resume-btn.component.css']
})
export class DownloadResumeBtnComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  downloadMyResume() {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'assets/resume.pdf');
    link.setAttribute('download', `Omar-Fendri-Resume-03-2021.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}
