import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  // Baca file JSON untuk Banner
  const bannerData = JSON.parse(fs.readFileSync(path.join(__dirname, 'banner.json'), 'utf-8'));
  for (const banner of bannerData.data) {
    await prisma.banner.create({
      data: {
        banner_name: banner.banner_name,
        banner_image: banner.banner_image,
        description: banner.description,
      },
    });
  }

  // Baca file JSON untuk Service
  const serviceData = JSON.parse(fs.readFileSync(path.join(__dirname, 'service.json'), 'utf-8'));
  for (const service of serviceData.data) {
    await prisma.service.create({
      data: {
        service_code: service.service_code,
        service_name: service.service_name,
        service_icon: service.service_icon,
        service_tarif: service.service_tarif,
      },
    });
  }

  console.log('Data Banner dan Service berhasil diinput.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });