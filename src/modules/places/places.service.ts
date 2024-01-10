import { Injectable, Inject } from '@nestjs/common';
import { Places } from './places.entity';
import { PlacesDto } from './dto/places.dto';
import { PLACES_REPOSITORY } from '../../core/constants';
import { Op } from 'sequelize';

@Injectable()
export class PlacesService {
  constructor(
    @Inject(PLACES_REPOSITORY) private readonly placesRepository: typeof Places,
  ) {}

  create(place: PlacesDto): Promise<Places> {
    return this.placesRepository.create<Places>({ ...place });
  }

  findAll(): Promise<Places[]> {
    return this.placesRepository.findAll<Places>();
  }

  findOne(id: number): Promise<Places> {
    return this.placesRepository.findOne({
      where: { id },
    });
  }

  findByName(name: string): Promise<Places> {
    return this.placesRepository.findOne({
      where: { name: { [Op.iLike]: `%${name}%` } },
    });
  }

  delete(id: number) {
    return this.placesRepository.destroy({ where: { id } });
  }

  async update(id: number, data: Partial<Places>) {
    const [numberOfAffectedRows, [updatedPlace]] =
      await this.placesRepository.update(
        { ...data },
        { where: { id }, returning: true },
      );

    return { numberOfAffectedRows, updatedPlace };
  }
}
