import { IsNumber, IsOptional, IsPositive } from "class-validator";

export class PaginationDto {
    @IsPositive()
    @IsOptional()
    @IsNumber()
    skip: number;

    @IsPositive()
    @IsOptional()
    @IsNumber()
    limit: number;
}