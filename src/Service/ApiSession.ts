import ApiRoutes from "./ApiRoutes";
import ApiService from "./ApiService";

const ApiSession = {
  auth: {
    register: (method: "GET" | "POST" | "PUT" | "DELETE", body: object) =>
      ApiService(ApiRoutes.auth.register, method, body),
  },
};

export default ApiSession;
