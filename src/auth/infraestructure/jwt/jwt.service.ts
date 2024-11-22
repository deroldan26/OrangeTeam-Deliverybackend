import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  private readonly jwtSecret = process.env.JWT_SECRET;

    generateToken(payload: any): string {
        return jwt.sign(payload, this.jwtSecret, {
            expiresIn: process.env.JWT_EXPIRATION,
        });
    }

    verifyToken(token: string): any {
        try {
            return jwt.verify(token, this.jwtSecret);
        } catch (err) {
            throw new Error('Token inválido o expirado');
        }
    }
}
