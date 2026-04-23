import { ChangeDetectorRef, Component } from '@angular/core';
import { ResultService } from '../result-service';
import ResultModel from '../models/ResultModel';
import { MatDialog } from '@angular/material/dialog';
import { NewMatchComponent } from '../new-match-component/new-match-component';

@Component({
  selector: 'app-result-component',
  imports: [],
  templateUrl: './result-component.html',
  styleUrl: './result-component.css',
})
export class ResultComponent {
  constructor(private resultService: ResultService, private cdr:ChangeDetectorRef, private dialog: MatDialog) {}

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

  newMatch(){
    this.dialog.open(NewMatchComponent,{
        width: '400px',
        height: '300px'
        
    })
  }
}
