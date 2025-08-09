import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { CreatePropertyDto } from "./dto/createProperty.dto";
import { IdPramsDto } from "./dto/idPramsDto.dto";
import { ParseIdPipe } from "./pipes/parseIdPipe";
import { ZodValidationPipe } from "./pipes/zodValidationPipe";
import {
  createPropertySchema,
  CreatePropertyZodDto,
} from "./dto/createPropertyZod.dto";
import { RequestHeaders } from "./pipes/request-headers";
import { HeadersDto } from "./dto/headers.dto";
import { PropertyService } from "./property.service";
import { UpdatePropertyDto } from "./dto/updateProperty.dto";
import { PaginationDto } from "./dto/pagination.dto";

@Controller("property")
export class PropertyController {
  constructor(private propertyService: PropertyService) { }
  @Get()
  findAll(@Query() query: PaginationDto) {
    return this.propertyService.findAll(query);
  }

  @Get(":id")
  findOne(
    @Param("id", ParseIntPipe) id: number,
    @Query("sort", ParseBoolPipe) sort: boolean,
  ) {
    return this.propertyService.findOne(id);
  }

  @Post()
  // @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @UsePipes(new ZodValidationPipe(createPropertySchema))
  createProperty(
    // @Body(
    //   new ValidationPipe({
    //     forbidNonWhitelisted: true,
    //     whitelist: true,
    //     groups: ["create"],
    //     always: true,
    //   }),
    // )
    // createPropertyDto: CreatePropertyDto,
    // @Body() createPropertyDto: CreatePropertyDto,
    @Body() createPropertyZodDto: CreatePropertyZodDto,
  ) {
    return this.propertyService.create(createPropertyZodDto);
  }

  @Patch(":id")
  updateProperty(
    // @Param() { id }: IdPramsDto,
    @Param("id", ParseIdPipe) id,
    @Body() // new ValidationPipe({
    //   forbidNonWhitelisted: true,
    body //   whitelist: true,J
      //   groups: ["update"],
      //   always: true,
      // }),
      : UpdatePropertyDto,
    // @RequestHeaders(
    //   new ValidationPipe({ whitelist: true, validateCustomDecorators: true }),
    // )
    // @Headers("host")
    // headers: HeadersDto,
    @RequestHeaders(HeadersDto) headers: HeadersDto,
  ) {
    return this.propertyService.update(id, body);
  }
}
