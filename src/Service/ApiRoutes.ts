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
    List: (id: number) => `/investment/`,
    Reduce: "/investment/reduce",
    checkUp: "/investment/check-up",
    refund: "/investment/change-check-up",
  },
};

export default ApiRoutes;
