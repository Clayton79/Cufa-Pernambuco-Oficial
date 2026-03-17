import jwt from 'jsonwebtoken';
import { config } from '../config';
import { UserPublic } from '../models';

export function generateToken(user: UserPublic): string {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    config.jwtSecret,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { expiresIn: config.jwtExpiresIn } as any
  );
}

export function verifyToken(token: string): jwt.JwtPayload | null {
  try {
    return jwt.verify(token, config.jwtSecret) as jwt.JwtPayload;
  } catch {
    return null;
  }
}
