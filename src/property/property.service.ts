import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PropertyEntity } from "src/entities/property.entity";
import { Repository } from "typeorm";
import { CreatePropertyDto } from "./dto/createProperty.dto";
import { CreatePropertyZodDto } from "./dto/createPropertyZod.dto";
import { UpdatePropertyDto } from "./dto/updateProperty.dto";
import { PaginationDto } from "./dto/pagination.dto";
import { DEFAULT_PAGE_SIZE } from "src/utils/constants";

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(PropertyEntity)
    private propertyRepo: Repository<PropertyEntity>,
  ) { }

  async findOne(id: number) {
    try {
      const findProperty = await this.propertyRepo.findOne({ where: { id } });
      if (!findProperty) throw new NotFoundException();
      return findProperty;
    } catch (error) {
      console.log(error);
    }
  }
  async findAll(query: PaginationDto) {
    try {
      return await this.propertyRepo.find({
        skip: query.skip,
        take: query.limit ?? DEFAULT_PAGE_SIZE,
      });
    } catch (error) {
      console.log(error);
    }
  }
  async create(dto: CreatePropertyZodDto) {
    try {
      const createProperty = await this.propertyRepo.save(dto);

      if (!createProperty) {
        return {
          status: false,
          message: "Property can not create",
        };
      } else {
        return {
          status: true,
          message: "Property create successfully",
        };
      }
    } catch (error) {
      console.log(error);
    }
  }
  async update(id: number, dto: UpdatePropertyDto) {
    try {
      const updateProperty = await this.propertyRepo.update({ id }, dto);
      if (updateProperty.affected === 0)
        throw new HttpException("Cannot update", HttpStatus.NOT_FOUND);
      return {
        message: "Update successful",
        status: HttpStatus.OK,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
