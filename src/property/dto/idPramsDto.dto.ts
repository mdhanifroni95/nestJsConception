import { IsNumber, IsPositive } from "class-validator";

export class IdPramsDto {
  @IsNumber()
  @IsPositive()
  id: number;
}
