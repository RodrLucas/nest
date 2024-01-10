import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  UseGuards,
  ForbiddenException,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PlacesService } from './places.service';
import { Places as PlacesEntity } from './places.entity';
import { PlacesDto } from './dto/places.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('places')
@ApiTags('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Get()
  async findAll() {
    return await this.placesService.findAll();
  }

  @Get('/find/:id')
  async findOne(@Param('id') id: number): Promise<PlacesEntity> {
    const place = await this.placesService.findOne(id);
    if (!place) {
      throw new NotFoundException("This Place doesn't exist");
    }
    return place;
  }

  @Get('/search')
  async filterByName(@Query('name') name: string): Promise<PlacesEntity> {
    const place = await this.placesService.findByName(name);
    if (!place) {
      throw new NotFoundException("This Place doesn't exist");
    }
    return place;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() place: PlacesDto): Promise<PlacesEntity> {
    const placeExist = await this.placesService.findByName(place.name);
    if (placeExist) {
      throw new ForbiddenException('This place already exist');
    }

    return await this.placesService.create(place);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() place: Partial<PlacesDto>,
  ): Promise<PlacesEntity> {
    const placeExist = await this.placesService.findByName(place.name);
    if (placeExist) {
      throw new ForbiddenException('This place already exist');
    }

    const { numberOfAffectedRows, updatedPlace } =
      await this.placesService.update(id, place);

    if (numberOfAffectedRows === 0) {
      throw new NotFoundException("This Place doesn't exist");
    }

    return updatedPlace;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: number) {
    const deleted = await this.placesService.delete(id);

    if (deleted === 0) {
      throw new NotFoundException("This Place doesn't exist");
    }

    return 'Successfully deleted';
  }
}
