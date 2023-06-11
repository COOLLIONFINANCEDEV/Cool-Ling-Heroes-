const ApiRoutes = {
  auth: {
    register: "/auth/signup",
    connect: "/auth/login",
    refreshToken: "/auth/refresh-access",
  },
  user: {
    update: "/users",
  },
  Invest: {
    Create: "/investment/invest",
    List: (id: number) => `/investment/?id=${id}`,
  },
};

export default ApiRoutes;
