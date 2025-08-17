import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import refreshJwtConfig from './config/refresh-jwt.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jtwService: JwtService,
		@Inject(refreshJwtConfig.KEY) private refreshTokenJwtConfig: ConfigType<typeof refreshJwtConfig>
	) { }

	async validateUser(email: string, password: string) {
		const user = await this.userService.findByEmail(email);
		if (!user) throw new UnauthorizedException('User not found');
		const isPasswordMatch = await compare(password, user.password)
		if (!isPasswordMatch) throw new UnauthorizedException("Invalid Credentials");

		return user;
	}

	login(userId: number) {
		const payload: AuthJwtPayload = { sub: userId }
		const token = this.jtwService.sign(payload);
		const refreshToken = this.jtwService.sign(payload, this.refreshTokenJwtConfig);
		return { id: userId, token, refreshToken }
	}

	refreshToken(userId: number) {
		const payload: AuthJwtPayload = { sub: userId }
		const token = this.jtwService.sign(payload);
		return { id: userId, token }
	}
}
