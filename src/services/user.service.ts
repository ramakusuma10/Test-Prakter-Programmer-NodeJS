import { PrismaClient, Prisma } from "@prisma/client";
import { User } from "../types/userType";
import { ImageDTO, UserDTO } from "../dto/user.dto";
import { UserValidator } from "../validator/validator";

const prisma = new PrismaClient();

class UserService {
  async getProfile(userId: number) {
    // Ambil data profil user dari database menggunakan userId
    const user = await prisma.$queryRaw<
      User[]
    >`SELECT email, first_name, last_name, profile_image FROM "User" WHERE id = ${userId}`;

    if (!user || user.length === 0) {
      throw new Error("User tidak ditemukan");
    }

    return user[0];
  }

  async updateProfile(userData: UserDTO) {
    const validatedData = UserValidator.parse(userData);
    const id = userData.id
    const updatedUser = await prisma.$queryRaw <User[]>`
      UPDATE "User"
      SET first_name = ${validatedData.first_name}, last_name = ${validatedData.last_name}
      WHERE id = ${id}
      RETURNING email, first_name, last_name, profile_image;
    `

    if (!updatedUser || updatedUser.length === 0) {
      throw new Error("User tidak ditemukan atau update gagal");
    }

    return updatedUser[0];
  }

  async updateProfileImage(userData: ImageDTO) {
    const {id,profile_image} = userData
    const updatedUser = await prisma.$queryRaw <User[]>`
      UPDATE "User" 
      SET profile_image = ${profile_image}
      WHERE id = ${id} 
      RETURNING email, first_name, last_name, profile_image`

    if (!updatedUser || updatedUser.length === 0) {
      throw new Error("User tidak ditemukan atau update gagal");
    }

    return updatedUser[0];
  }

  async getBalance(userId: number) {
    const result = await prisma.$queryRaw <User[]> `
      SELECT balance FROM "User" WHERE id = ${userId}
    `;
    
    if (result.length > 0) {
      return result[0].balance;
    } else {
      throw new Error('User not found');
    }
  }
}

export default new UserService();
