import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '../jwt/jwt.service';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean {

        const request = context.switchToHttp().getRequest();
        const authorizationHeader = request.headers['authorization'];

        if (!authorizationHeader) {
            throw new UnauthorizedException('Token not provided');
        }

        const token = authorizationHeader.split(' ')[1];

        try {
            const decoded = this.jwtService.verifyToken(token);
            request.user = decoded;
            return true;
        } catch (err) {
            throw new UnauthorizedException('Token expired or invalid');
        }
    }

    extractTokenFromHeader(request: Request): string | null {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : null;
    }
    
}
