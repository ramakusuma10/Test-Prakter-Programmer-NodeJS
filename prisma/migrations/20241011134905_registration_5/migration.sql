/*
  Warnings:

  - You are about to drop the column `profil_image` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "profil_image",
ADD COLUMN     "profile_image" TEXT;
