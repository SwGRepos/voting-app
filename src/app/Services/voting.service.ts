import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  statusCode: number;
}

export interface Candidate {
  id: number;
  name: string;
}

export interface Voter {
  id: number;
  name: string;
  hasVoted: boolean;
}

export interface CastingVote {
  voterId: number;
  voterName: string;
  candidateId: number;
  candidateName: string;
}

export interface GetCastingVote {

  name: string,
  votes: number
}

@Injectable({ providedIn: 'root' })
export class VotingService {
  private baseUrl = 'https://localhost:7008/api';
  private votersSource = new BehaviorSubject<Voter[]>([]);
  voters$ = this.votersSource.asObservable();

  private candidatesSource = new BehaviorSubject<Candidate[]>([]);
  candidates$ = this.candidatesSource.asObservable();

  private castedVotesSource = new BehaviorSubject<GetCastingVote[]>([]);
  castedVotes$ = this.castedVotesSource.asObservable();



  constructor(private http: HttpClient) { }

  getCandidates() {
    return this.http.get<any>(`${this.baseUrl}/candidate`).pipe(
      tap(res => {
        if (res.success && res.data) {
          const candidateArray = Array.isArray(res.data) ? res.data : [res.data];
          this.candidatesSource.next(candidateArray);
        }
      })
    );
  }
  getVoters() {
    return this.http.get<any>(`${this.baseUrl}/Voter`).pipe(
      tap(res => {
        if (res.success && res.data) {
          const voersArray = Array.isArray(res.data) ? res.data : [res.data];
          this.votersSource.next(voersArray);
        }
      })
    );
  }


  getcastedVote() {
    return this.http.get<any>(`${this.baseUrl}/castvoting`).pipe(
      tap(res => {
        if (res.success && res.data) {
          const castedArray = Array.isArray(res.data) ? res.data : [res.data];
          this.castedVotesSource.next(castedArray);
        }
      })
    );

  }

  addCandidate(candidate: Partial<Candidate>) {
    return this.http.post<ApiResponse<Candidate[]>>(`${this.baseUrl}/candidate`, candidate).pipe(
      tap(res => {
        if (res.success && res.data) {
          const candidateArray = Array.isArray(res.data) ? res.data : [res.data];
          this.candidatesSource.next(candidateArray);
        }
      })
    );
  }

  addVoter(voter: Partial<Voter>) {
    return this.http.post<ApiResponse<Voter[]>>(`${this.baseUrl}/Voter`, voter).pipe(
      tap(res => {
        if (res.success && res.data) {
          const votersArray = Array.isArray(res.data) ? res.data : [res.data];
          this.votersSource.next(votersArray);
        }
      })
    );
  }

  castVote(vote: CastingVote) {
    return this.http.post<ApiResponse<GetCastingVote[]>>(`${this.baseUrl}/castvoting`, vote).pipe(
      tap(res => {
        if (res.success && res.data) {
          const castedArray = Array.isArray(res.data) ? res.data : [res.data];
          this.castedVotesSource.next(castedArray);
        }
      })
    );
  }
}

