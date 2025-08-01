import { IsInt, IsNumber, IsPositive, IsString, Length } from "class-validator";

export class CreatePropertyDto {
  @IsString()
  @Length(2, 10)
  name: string;

  @IsString()
  @Length(5, 10, { groups: ["create"] })
  @Length(2, 10, { groups: ["update"] })
  description: string;

  @IsInt()
  @IsPositive()
  area: number;
}
