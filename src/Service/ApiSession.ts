import { ICONNECT } from '../Components/Login/Connect';
import { RESPONSELAYOUT } from '../Helpers/FormatResponse';
import { UsersSeeds } from '../Seeds/ApiTest';
import ApiRoutes from './ApiRoutes';
import ApiService from './ApiService';

const ApiSession = {
  auth: {
    register: (body: {
      email: string;
      phone_number: string;
      password: string;
    }): Promise<RESPONSELAYOUT> =>
      ApiService(ApiRoutes.auth.register, 'post', body),
    fakeConnect: (credential: ICONNECT): Promise<RESPONSELAYOUT> => { 
      return new Promise((resolve, reject) => {
        const loggedUser = UsersSeeds.find(
          ({ email, password }) =>
            email.trim().toLowerCase() ===
              credential.email.trim().toLowerCase() &&
            password.trim().toLowerCase() ===
              credential.password.trim().toLowerCase()
        );

        if (!loggedUser)
          resolve({
            error: true,
            message: 'Invalid credential!',
            errors: [],
            data: [],
            metadata: {},
          });
        else {
          const access = {
            access_token: loggedUser.access_token,
            refresh_token: loggedUser.refresh_token,
          };
          resolve({
            error: false,
            message: 'Successfully logged !',
            data: [access],
            errors: [],
            metadata: {},
          });
        }
      });
    },
    connect: (
      body:
        | {
            email: string;
            password: string;
          }
        | { magicLink: string }
    ): Promise<RESPONSELAYOUT> =>
      ApiService(ApiRoutes.auth.connect, 'post', body),
    connectWithLink: (body: { magicLink: string }): Promise<RESPONSELAYOUT> =>
      ApiService(ApiRoutes.auth.connect, 'post', body),
    RefreshToken: (body: {
      access_token: string;
      refresh_token: string;
    }): Promise<RESPONSELAYOUT> =>
      ApiService(ApiRoutes.auth.refreshToken, 'post', body),
    UpdatePassword: (body: {
      password: string;
      newPassword: string;
    }): Promise<RESPONSELAYOUT> =>
      ApiService(ApiRoutes.auth.updatePassword, 'post', body),
  },
  invest: {
    create: (
      body:
        | {
            amount: number;
            term: number;
          }
        | { amount: number; term: number; investmentId: number; proof: string }
    ): Promise<RESPONSELAYOUT> =>
      ApiService(ApiRoutes.Invest.Create, 'post', body),

    list: (id: number): Promise<RESPONSELAYOUT> =>
      ApiService(ApiRoutes.Invest.List(id), 'get', {}),
    reduce: (body: {
      reducedAmount: number;
      investmentId: number;
    }): Promise<RESPONSELAYOUT> =>
      ApiService(ApiRoutes.Invest.Reduce, 'post', body),
    checkUp: (body: {
      accepted: boolean;
      investmentId: number;
    }): Promise<RESPONSELAYOUT> =>
      ApiService(ApiRoutes.Invest.checkUp, 'post', body),
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
      ApiService(ApiRoutes.Invest.refund, 'post', body),
    disable: (body: { investmentId: number }): Promise<RESPONSELAYOUT> =>
      ApiService(ApiRoutes.Invest.disable, 'post', body),
  },
  user: {
    update: (body: {
      full_name?: string;
      phone_number?: string;
      password?: string;
    }): Promise<RESPONSELAYOUT> =>
      ApiService(ApiRoutes.user.update, 'put', body),
    changeRole: (body: {
      role: string;
      user_id: number;
    }): Promise<RESPONSELAYOUT> =>
      ApiService(ApiRoutes.user.update, 'put', body),
    list: (): Promise<RESPONSELAYOUT> =>
      ApiService(ApiRoutes.user.list, 'get', {}),
  },
  newsLetter: {
    create: (body: { email: string }): Promise<RESPONSELAYOUT> =>
      ApiService(ApiRoutes.NewsLetter.Create, 'post', body),
  },
  annoucement: {
    create: (body: {
      title: string;
      status: boolean;
      image: string;
    }): Promise<RESPONSELAYOUT> =>
      ApiService(ApiRoutes.Annoucement.Create, 'post', body),
    update: (body: { id: number; status: boolean }): Promise<RESPONSELAYOUT> =>
      ApiService(ApiRoutes.Annoucement.Update, 'put', body),
    delete: (body: { AnnoucementId: number }): Promise<RESPONSELAYOUT> =>
      ApiService(
        ApiRoutes.Annoucement.Delete(body.AnnoucementId),
        'delete',
        {}
      ),
    list: (): Promise<RESPONSELAYOUT> =>
      ApiService(ApiRoutes.Annoucement.List, 'get', {}),
  },
};

export default ApiSession;
