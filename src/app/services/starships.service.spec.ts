import { of } from 'rxjs';
import { Page } from '../models/page.model';
import { Starship, StarshipPageItem } from '../models/starship.model';
import { StarshipsService } from './starships.service';
import { SwapiResponse } from '../models/response.model';

describe('StarshipsService', () => {
  let service: StarshipsService;
  let httpClient: any;

  beforeEach(() => {
    httpClient = {
      get: jest.fn(),
    };
    service = new StarshipsService(httpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getAll() call API with proper url', () => {
    // Arrange
    const response = {
      message: 'ok',
      total_records: 46,
      total_pages: 1,
      results: [
        {
          uid: 2,
          name: 'CR90 corvette',
          url: 'https://www.swapi.tech/api/starships/2',
        },
      ],
    } as Page<StarshipPageItem>;
    const url = 'https://www.swapi.tech/api/starships?page=1&limit=50';
    jest.spyOn(httpClient, 'get').mockReturnValue(of(response));

    // Act
    service.getAll();

    // Assert
    expect(httpClient.get).toBeCalledTimes(1);
    expect(httpClient.get).toHaveBeenCalledWith(url);
  });

  it('should getById() call API with proper url', () => {
    // Arrange
    const response = {
      message: 'ok',
      result: {
        properties: {
          name: 'CR90 corvette',
          model: 'CR90 corvette',
          starship_class: 'corvette',
          cost_in_credits: 3500000,
        },
      },
    } as SwapiResponse<Starship>;
    const id = 1;
    const url = `https://www.swapi.tech/api/starships/${id}`;
    jest.spyOn(httpClient, 'get').mockReturnValue(of(response));

    // Act
    service.getById(id);

    // Assert
    expect(httpClient.get).toBeCalledTimes(1);
    expect(httpClient.get).toHaveBeenCalledWith(url);
  });
});
