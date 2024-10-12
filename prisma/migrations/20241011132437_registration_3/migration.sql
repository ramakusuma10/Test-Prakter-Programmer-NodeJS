/*
  Warnings:

  - Made the column `profil_image` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "profil_image" SET NOT NULL;
