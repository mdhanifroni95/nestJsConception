import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { PropertyEntity } from "./entities/property.entity";

export const pgConfig: PostgresConnectionOptions = {
  //do not put this here, inserted env file
  url: "postgresql://neondb_owner:npg_V7KHuFgo8WIk@ep-summer-rain-afpu0455-pooler.c-2.us-west-2.aws.neon.tech/nestJs_db?sslmode=require&channel_binding=require",
  type: "postgres",
  port: 3306,
  entities: [__dirname + "/**/*.entity{.ts,.js}"],
  synchronize: true, // it is help to development mode but production mode highly discress true, synchronize false because accidentally one column remove table this column information distroy permanently
};
