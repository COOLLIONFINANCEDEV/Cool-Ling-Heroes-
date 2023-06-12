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
    reduce: (body: {
      reducedAmount: number;
      investmentId: number;
    }): Promise<RESPONSELAYOUT> =>
      ApiService(ApiRoutes.Invest.Reduce, "post", body),
    checkUp: (body: {
      accepted: boolean;
      investmentId: number;
    }): Promise<RESPONSELAYOUT> =>
      ApiService(ApiRoutes.Invest.checkUp, "post", body),
    refund: (
      body:
        | {
            accepted: boolean;
            investmentId: number;
            refundProof: string;
            changeRequestId: number;
          }
        | {
            accepted: boolean;
            investmentId: number;
            refundProof: string;
            amount: number;
          }
    ): Promise<RESPONSELAYOUT> =>
      ApiService(ApiRoutes.Invest.refund, "post", body),
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
