export type User = {
  id: number; // atau tipe yang sesuai
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  balance: number;
  profile_image: string;
  // Tambahkan field lain sesuai kebutuhan
};
export type Service = {
  id: number; // atau tipe yang sesuai
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tarif: number;
};
