import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { LocalStrategy } from './strategies/local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { jwtStrategy } from './strategies/jwt.strategy';
import refreshJwtConfig from './config/refresh-jwt.config';
import { refreshJwtStrategy } from './strategies/refresh.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from './guards/roles/roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]),
  JwtModule.registerAsync(jwtConfig.asProvider()),
  ConfigModule.forFeature(jwtConfig),
  ConfigModule.forFeature(refreshJwtConfig),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    LocalStrategy,
    jwtStrategy,
    refreshJwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard //@useGuards(JwtAuthGuard) applied on all API endpoints
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ],
})
export class AuthModule { }
