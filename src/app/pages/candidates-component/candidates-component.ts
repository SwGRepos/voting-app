import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Candidate, VotingService } from '../../Services/voting.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-candidates-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './candidates-component.html',
  styleUrl: './candidates-component.css',
  standalone: true
})

export class CandidatesComponent implements OnInit {
  votingService = inject(VotingService);
  newCandidate: Partial<Candidate> = {};
  candidates$ = this.votingService.castedVotes$;
  ngOnInit() {
    this.votingService.getCandidates().subscribe();
  }

  addCandidate() {
    this.votingService.addCandidate(this.newCandidate).subscribe(
      {
        next: (res) => {
          this.newCandidate = {}
          this.votingService.getCandidates().subscribe();
          this.votingService.getcastedVote().subscribe();
          if (res.success)
            alert(res.message);
          else
            alert("Error Occured while adding Candidate.");
        },
        error: (error) => {
          this.newCandidate = {};
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