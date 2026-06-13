import bcrypt from 'bcryptjs';

export class PinProtection {
  // Hash PIN for storage
  static async hashPin(pin: string): Promise<string> {
    return bcrypt.hash(pin, 10);
  }

  // Verify PIN
  static async verifyPin(pin: string, hashedPin: string): Promise<boolean> {
    return bcrypt.compare(pin, hashedPin);
  }

  // Validate PIN format (4-6 digits)
  static isValidPin(pin: string): boolean {
    return /^\d{4,6}$/.test(pin);
  }
}
