interface Routes {
  [key: string]: string;
}

const routes: Routes = {
  home: "/",
  login: "/login",
  register: "/register",
  notFound: "*",
};

export default routes;
  