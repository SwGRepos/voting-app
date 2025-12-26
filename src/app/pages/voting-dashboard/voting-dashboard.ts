import { Component } from '@angular/core';
import { VotersComponent } from '../voters-component/voters-component';
import { CandidatesComponent } from '../candidates-component/candidates-component';

import { CastVote } from '../cast-vote/cast-vote';

@Component({
  selector: 'app-voting-dashboard',
  imports: [VotersComponent, CandidatesComponent, CastVote],
  templateUrl: './voting-dashboard.html',
  styleUrl: './voting-dashboard.css',
  standalone: true
})
export class VotingDashboard {

}
