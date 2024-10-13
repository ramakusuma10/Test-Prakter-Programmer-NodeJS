import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class bannerService {
  async getAllBanners() {
    const banners = await prisma.$queryRaw `
          SELECT banner_name, banner_image, description
          FROM "Banner"
        `;
    return banners;
  }
}

export default new bannerService();
