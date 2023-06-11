interface Routes {
  [key: string]: string;
}

const routes: Routes = {
  home: "/",
  login: "login",
  register: "register",
  notFound: "*",
  aboutUs: "/#about",
  simulator: "/#simulator",
  howItWorks: "/#howitwork",
  contact: "https://wa.me/+2250506430832",
  videoChat: "https://meet.google.com/zkm-vbix-kxr",
  dashboard: "dashbaord",
  account:"account",
  setting:"settings"
};

export default routes;
