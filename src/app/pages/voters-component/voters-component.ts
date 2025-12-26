import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Voter, VotingService } from '../../Services/voting.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-voters-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './voters-component.html',
  styleUrl: './voters-component.css',
  standalone: true
})

export class VotersComponent implements OnInit {

  newVoter: Partial<Voter> = {};
  votingService = inject(VotingService);
  voters$ = this.votingService.voters$;

  ngOnInit() {
    this.votingService.getVoters().subscribe();
  }

  addVoter() {
    this.votingService.addVoter(this.newVoter).subscribe({
      next: (res) => {
        console.log('Voter Added:', res);
        this.newVoter = {};
        this.votingService.getVoters().subscribe();
        if (res.success)
          alert(res.message);
        else
          alert("Error Occured while adding voter.");
      },
      error: (error) => {
        this.newVoter = {};
        if (!error.error.success) {
          alert(error.error.message);
        }
        else {
          alert('An error occurred: ' + error.message);
        }
      }
    });
  }
}

