import { Request, Response } from 'express';
import servicesService from '../services/service.service';


class serviceController {
  async getServices(req: Request, res: any) {
    try {

      const services = await servicesService.getAllServices();
      return res.status(200).json({
        status: 0,
        message: 'Sukses',
        data: services,
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
export default new serviceController()