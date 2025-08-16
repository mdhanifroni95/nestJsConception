import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { AuthJwtPayload } from './types/auth-jwtPayload';

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jtwService: JwtService
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
		return this.jtwService.sign(payload)
	}
}
