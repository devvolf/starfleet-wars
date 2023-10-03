import { TestBed } from '@angular/core/testing';

import { MatchService } from './match.service';
import { Starship } from '../models/starship.model';

describe('MatchService', () => {
  let service: MatchService;

  beforeEach(() => {
    service = new MatchService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initializePlayers() return empty result if no starships provided', () => {
    // Arrange
    const starships = [] as Starship[];

    // Act
    const result = service.initializePlayers(starships);

    // Assert
    expect(result.length).toBe(0);
  });

  it('should initializePlayers() return two records with same starship if one starship provided', () => {
    // Arrange
    const starships = [
      {
        name: 'Test Starship',
        model: 'Test Model',
        starship_class: 'Test Class',
        cost_in_credits: 10000,
      },
    ] as Starship[];

    // Act
    const result = service.initializePlayers(starships);

    // Assert
    expect(result.length).toBe(2);
    expect(result[0].starship).toMatchObject(starships[0]);
    expect(result[0].starship).toMatchObject(result[1].starship);
  });

  it('should initializePlayers() return two records with different starships if at least two starships provided', () => {
    // Arrange
    const starships = [
      {
        name: 'Test Starship 1',
        model: 'Test Model 1',
        starship_class: 'Test Class 1',
        cost_in_credits: 10000,
      },
      {
        name: 'Test Starship 2',
        model: 'Test Model 2',
        starship_class: 'Test Class 2',
        cost_in_credits: 20000,
      },
    ] as Starship[];

    // Act
    const result = service.initializePlayers(starships);

    // Assert
    expect(result.length).toBe(2);
    expect(result[0].starship).toMatchObject(starships[0]);
    expect(result[1].starship).toMatchObject(starships[1]);
    expect(result[0].starship).not.toMatchObject(result[1].starship);
  });

  it('should resolveFight() return single winner when players starships do not match by power', () => {
    // Arrange
    const players = [
      {
        id: '0',
        name: 'Player 1',
        score: 0,
        starship: {
          name: 'Test Starship 1',
          model: 'Test Model 1',
          starship_class: 'Test Class 1',
          cost_in_credits: 10000,
        },
      },
      {
        id: '1',
        name: 'Player 2',
        score: 0,
        starship: {
          name: 'Test Starship 2',
          model: 'Test Model 2',
          starship_class: 'Test Class 2',
          cost_in_credits: 20000,
        },
      },
    ];

    // Act
    const [winners] = service.resolveFight(players);

    // Assert
    expect(winners.length).toBe(1);
  });

  it('should resolveFight() return two winners when players starships match by power', () => {
    // Arrange
    const players = [
      {
        id: '0',
        name: 'Player 1',
        score: 0,
        starship: {
          name: 'Test Starship 1',
          model: 'Test Model 1',
          starship_class: 'Test Class 1',
          cost_in_credits: 20000,
        },
      },
      {
        id: '1',
        name: 'Player 2',
        score: 0,
        starship: {
          name: 'Test Starship 2',
          model: 'Test Model 2',
          starship_class: 'Test Class 2',
          cost_in_credits: 20000,
        },
      },
    ];

    // Act
    const [winners] = service.resolveFight(players);

    // Assert
    expect(winners.length).toBe(2);
  });

  it('should resolveFight() return single winner with increased score when players starships do not match by power', () => {
    // Arrange
    const players = [
      {
        id: '0',
        name: 'Player 1',
        score: 0,
        starship: {
          name: 'Test Starship 1',
          model: 'Test Model 1',
          starship_class: 'Test Class 1',
          cost_in_credits: 10000,
        },
      },
      {
        id: '1',
        name: 'Player 2',
        score: 0,
        starship: {
          name: 'Test Starship 2',
          model: 'Test Model 2',
          starship_class: 'Test Class 2',
          cost_in_credits: 20000,
        },
      },
    ];

    // Act
    const [winners, newPlayers] = service.resolveFight(players);
    const losers = newPlayers.filter((it) => !winners.includes(it));

    // Assert
    expect(winners.length).toBe(1);
    expect(losers.length).toBe(1);
    expect(winners[0].score).toBe(1);
    expect(losers[0].score).toBe(0);
  });

  it('should resolveFight() return two winners with increased score when players starships match by power', () => {
    // Arrange
    const players = [
      {
        id: '0',
        name: 'Player 1',
        score: 0,
        starship: {
          name: 'Test Starship 1',
          model: 'Test Model 1',
          starship_class: 'Test Class 1',
          cost_in_credits: 20000,
        },
      },
      {
        id: '1',
        name: 'Player 2',
        score: 0,
        starship: {
          name: 'Test Starship 2',
          model: 'Test Model 2',
          starship_class: 'Test Class 2',
          cost_in_credits: 20000,
        },
      },
    ];

    // Act
    const [winners, newPlayers] = service.resolveFight(players);
    const losers = newPlayers.filter((it) => !winners.includes(it));

    // Assert
    expect(winners.length).toBe(2);
    expect(losers.length).toBe(0);
    expect(winners[0].score).toBe(1);
    expect(winners[1].score).toBe(1);
  });

  it('should resolveFight() return winning player when the other has ship of power unknown', () => {
    // Arrange
    const players = [
      {
        id: '0',
        name: 'Player 1',
        score: 0,
        starship: {
          name: 'Test Starship 1',
          model: 'Test Model 1',
          starship_class: 'Test Class 1',
          cost_in_credits: 20000,
        },
      },
      {
        id: '1',
        name: 'Player 2',
        score: 0,
        starship: {
          name: 'Test Starship 2',
          model: 'Test Model 2',
          starship_class: 'Test Class 2',
          cost_in_credits: 'unknown' as 'unknown',
        },
      },
    ];

    // Act
    const [winners] = service.resolveFight(players);

    // Assert
    expect(winners.length).toBe(1);
    expect(winners[0].id).toBe('0');
  });

  it('should resolveFight() return both players when both have ship of power unknown', () => {
    // Arrange
    const players = [
      {
        id: '0',
        name: 'Player 1',
        score: 0,
        starship: {
          name: 'Test Starship 1',
          model: 'Test Model 1',
          starship_class: 'Test Class 1',
          cost_in_credits: 'unknown' as 'unknown',
        },
      },
      {
        id: '1',
        name: 'Player 2',
        score: 0,
        starship: {
          name: 'Test Starship 2',
          model: 'Test Model 2',
          starship_class: 'Test Class 2',
          cost_in_credits: 'unknown' as 'unknown',
        },
      },
    ];

    // Act
    const [winners] = service.resolveFight(players);

    // Assert
    expect(winners.length).toBe(2);
  });
});
