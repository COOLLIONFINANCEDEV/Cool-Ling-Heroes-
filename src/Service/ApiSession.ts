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
      term: number;
      proof: string;
    }): Promise<RESPONSELAYOUT> =>
      ApiService(ApiRoutes.Invest.Create, "post", body),
    list: (id: number): Promise<RESPONSELAYOUT> =>
      ApiService(ApiRoutes.Invest.List(id), "get", {}),
  },
  user: {
    update: (body: {
      full_name?: string;
      phone_number?: string;
      password?: string;
    }): Promise<RESPONSELAYOUT> =>
      ApiService(ApiRoutes.user.update, "put", body),
  },
};

export default ApiSession;
