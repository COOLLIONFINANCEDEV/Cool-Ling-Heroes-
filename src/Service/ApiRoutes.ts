const ApiRoutes = {
  auth: {
    register: "/auth/signup",
    connect: "/auth/login",
    refreshToken: "/auth/refresh-access",
    updatePassword: "/auth/update-password",
  },
  user: {
    update: "/users",
    list: "/users/",
  },
  Invest: {
    Create: "/investment/invest",
    List: (id: number) => `/investment/`,
    Reduce: "/investment/reduce",
    checkUp: "/investment/check-up",
    refund: "/investment/change-check-up",
    disable: "/investment/abort",
  },
  NewsLetter: {
    Create: "/newsletter/subscribe",
  },
  Annoucement: {
    Create: "/announcement",
    Update: "/announcement",
    List: "/announcement",
    Delete: (id: number) => `/announcement/${id}`,
  },
};

export default ApiRoutes;
