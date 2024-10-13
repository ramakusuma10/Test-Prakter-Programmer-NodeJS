import { Request} from 'express';
import bannerService from '../services/banner.service';


class bannerController {
  async getBanners(req: Request, res: any) {
    try {
      const banners = await bannerService.getAllBanners();
      return res.status(200).json({
        status: 0,
        message: 'Sukses',
        data: banners,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Internal Server Error',
        data: null,
      });
    }
  }
}

export default new bannerController();