import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingDashboard } from './voting-dashboard';

describe('VotingDashboard', () => {
  let component: VotingDashboard;
  let fixture: ComponentFixture<VotingDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VotingDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotingDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
