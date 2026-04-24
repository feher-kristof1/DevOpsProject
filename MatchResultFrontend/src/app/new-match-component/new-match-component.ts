import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-new-match-component',
  imports: [FormsModule],
  templateUrl: './new-match-component.html',
  styleUrl: './new-match-component.css',
})
export class NewMatchComponent {
  homeTeam: string = '';
  awayTeam: string = '';
  homeScore: number = 0;
  awayScore: number = 0;

  constructor(private http: HttpClient, private dialog:MatDialog) {}

  newMatch(){
    this.http.post('/api/matches', {
      homeTeam: this.homeTeam,
      awayTeam: this.awayTeam,
      homeScore: this.homeScore,
      awayScore: this.awayScore
    });
    console.log('Match recorded');
    this.dialog.closeAll();
  }
}
