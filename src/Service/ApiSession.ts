import { RESPONSELAYOUT } from "../Helpers/FormatResponse";
import ApiRoutes from "./ApiRoutes";
import ApiService from "./ApiService";

const ApiSession = {
  auth: {
    register: (body: {
      email: string;
      phone_number: string;
      password: string;
    }): Promise<RESPONSELAYOUT> =>
      ApiService(ApiRoutes.auth.register, "post", body),
    connect: (
      body:
        | {
            email: string;
            password: string;
          }
        | { magicLink: string }
    ): Promise<RESPONSELAYOUT> =>
      ApiService(ApiRoutes.auth.connect, "post", body),
    connectWithLink: (body: { magicLink: string }): Promise<RESPONSELAYOUT> =>
      ApiService(ApiRoutes.auth.connect, "post", body),
    RefreshToken: (body: {
      access_token: string;
      refresh_token: string;
    }): Promise<RESPONSELAYOUT> =>
      ApiService(ApiRoutes.auth.refreshToken, "post", body),
  },
  invest: {
    create: (body: {
      amount: number;
      interet: number;
      month: number;
      img: string;
    }): Promise<RESPONSELAYOUT> =>
      ApiService(ApiRoutes.Invest.Create, "post", body),
    list: (): Promise<RESPONSELAYOUT> =>
      ApiService(ApiRoutes.Invest.List, "post", {}),
  },
};

export default ApiSession;
