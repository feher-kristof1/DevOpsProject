import { ChangeDetectorRef, Component } from '@angular/core';
import { ResultService } from '../result-service';
import ResultModel from '../models/ResultModel';

@Component({
  selector: 'app-result-component',
  imports: [],
  templateUrl: './result-component.html',
  styleUrl: './result-component.css',
})
export class ResultComponent {
  constructor(private resultService: ResultService, private cdr:ChangeDetectorRef) {}

  results:ResultModel[] = [];

  ngOnInit() {
    this.resultService.getResults().subscribe({
      next: (data) => {
        this.results = data;
        this.cdr.detectChanges();
        console.log(this.results);
        
      }, 
      error: (err) => {
        alert('Error fetching results: ' + err.message);
      }
    });
  }
}
