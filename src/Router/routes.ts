interface Routes {
  [key: string]: string;
}

const routes: Routes = {
  home: "/",
  login: "/login",
  register: "/register",
  notFound: "*",
  aboutUs:'#aboutUs',
};

export default routes;
  