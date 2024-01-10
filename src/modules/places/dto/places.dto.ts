import { IsNotEmpty, MinLength } from 'class-validator';

export class PlacesDto {
  @IsNotEmpty()
  @MinLength(4)
  readonly name: string;

  @IsNotEmpty()
  readonly city: string;

  @IsNotEmpty()
  readonly state: string;
}
