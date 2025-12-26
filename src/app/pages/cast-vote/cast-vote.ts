import { Component, inject, OnInit } from '@angular/core';
import { VotingService } from '../../Services/voting.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-cast-vote',
  imports: [FormsModule, CommonModule],
  templateUrl: './cast-vote.html',
  styleUrl: './cast-vote.css',
})

export class CastVote implements OnInit {

  selectedCandidateId = 0;
  selectedVoterId = 0;
  message = '';
  votingService = inject(VotingService);
  candidates$ = this.votingService.candidates$;
  voters$ = this.votingService.voters$;
  castedVotes$ = this.votingService.castedVotes$;

  ngOnInit() {
    this.votingService.getCandidates().subscribe();
    this.votingService.getVoters().subscribe();
    this.votingService.getcastedVote().subscribe();
  }

  castVote() {
    debugger;
    if (this.selectedCandidateId > 0 && this.selectedVoterId > 0) {

      let selectedCandidate$ = this.candidates$.pipe(
        map(candidates =>
          candidates.find(c => c.id == this.selectedCandidateId))
      );
      let selectedvoter$ = this.voters$.pipe(
        map(vtr =>
          vtr.find(c => c.id == this.selectedVoterId))
      );
      console.log(selectedCandidate$)
      console.log(selectedvoter$)
      combineLatest([selectedCandidate$, selectedvoter$]).subscribe(
        ([candid, votr]) => {
          debugger
          if (candid && votr) {
            const vote = {
              voterId: this.selectedVoterId,
              voterName: votr.name,
              candidateId: this.selectedCandidateId,
              candidateName: candid.name,
            };

            this.votingService.castVote(vote).subscribe(
              {
                next: (res) => {
                  console.log('Vote submitted:', res);
                  this.selectedCandidateId = 0;
                  this.selectedVoterId = 0;
                  this.votingService.getCandidates().subscribe();
                  this.votingService.getVoters().subscribe();
                  this.votingService.getcastedVote().subscribe();
                  if (res.success) {
                    alert(res.data);
                  }
                  else
                    alert("Error Occured while submitting vote.");
                },
                error: (error) => {
                  this.selectedCandidateId = 0;
                  this.selectedVoterId = 0;
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
      );
    }
  }
}