-- CreateTable
CREATE TABLE "Banner" (
    "id" SERIAL NOT NULL,
    "banner_name" TEXT NOT NULL,
    "banner_image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Banner_pkey" PRIMARY KEY ("id")
);
