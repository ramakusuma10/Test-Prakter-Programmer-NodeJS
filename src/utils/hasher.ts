import bcrypt from 'bcrypt';
import { SALT_ROUND } from '../configs/config';

export class Hasher {
  static async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, Number(SALT_ROUND));
  }

  static async comparePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash)
}
}