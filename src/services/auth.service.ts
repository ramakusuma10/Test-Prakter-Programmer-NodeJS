import { PrismaClient, Prisma } from "@prisma/client";
import { RegisterDTO } from "../dto/register.dto";
import { LoginValidator, RegisterValidator } from "../validator/validator";
import { Hasher } from "../utils/hasher";
import { User } from "../types/userType";
import { LoginDTO } from "../dto/login.dto";
import * as jwt from "jsonwebtoken";
import { SECRET_KEY } from "../configs/config";

const prisma = new PrismaClient();

class AuthService {
  async register(RegisterData: RegisterDTO) {
    // Validasi data di sini
    const validatedData = RegisterValidator.parse(RegisterData);

    const hashedPassword = await Hasher.hashPassword(validatedData.password);

    const existingUser: User[] =
      await prisma.$queryRaw `SELECT * FROM "User" WHERE email = ${validatedData.email}`;

    if (existingUser.length > 0) {
      throw new Error("Email Sudah Terdaftar");
    } else {
      const query = `
    INSERT INTO "User" (email, first_name, last_name, profile_image, password) 
    VALUES ($1, $2, $3, $4, $5)
  `;
      const result = await prisma.$queryRawUnsafe(
        query,
        validatedData.email,
        validatedData.first_name,
        validatedData.last_name,
        validatedData.profile_image,
        hashedPassword
      );
      return { email: validatedData.email };
    }
  }

  async loginUser(LoginData: LoginDTO) {
    const validatedData = LoginValidator.parse(LoginData);
    const { email, password } = validatedData;

    const user: User[] | null =
      await prisma.$queryRaw `SELECT * FROM "User" WHERE email = ${email}`;

    if (!user || user.length === 0) {
      throw new Error("Invalid credentials"); 
    }

    const isPasswordValid = await Hasher.comparePassword(
      password,
      user[0].password
    );
    if (!isPasswordValid) {
      throw new Error("Invalid credentials"); 
    }

    const token = jwt.sign(
      { id: user[0].id, email: user[0].email },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    return { token }; 
  }
}

export default new AuthService();
