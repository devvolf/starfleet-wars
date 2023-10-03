import { Component, OnInit } from '@angular/core';
import { MatchFacade } from 'src/app/states/match/match.facade';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss'],
})
export class MatchComponent implements OnInit {
  public matchNumber$ = this.matchFacade.matchNumber$;
  public players$ = this.matchFacade.players$;

  constructor(private matchFacade: MatchFacade) {}

  ngOnInit(): void {}

  public onFight(): void {
    this.matchFacade.resolveFight();
  }
}
