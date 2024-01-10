import { Places } from './places.entity';
import { PLACES_REPOSITORY } from '../../core/constants';

export const placesProviders = [
  {
    provide: PLACES_REPOSITORY,
    useValue: Places,
  },
];
