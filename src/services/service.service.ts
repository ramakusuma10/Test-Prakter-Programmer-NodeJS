import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class servicesService {
  async getAllServices() {
    const services = await prisma.$queryRaw `
      SELECT service_code, service_name, service_icon, service_tarif
      FROM "Service"
    `;
    return services;
  }
}

export default new servicesService();