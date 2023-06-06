import axios from "axios";
import FormatResponse from "../Helpers/FormatResponse";


const ApiService = (path: string, method: string, body: Object) => {
  const accessToken = localStorage.getItem("accessToken");
  const url = process.env.REACT_APP_API_URL + path;

  const options = {
    method,
    url,
    data: body ?? {},
    headers: {
      Authorization: "",
    },
  };

  if (accessToken) {
    options.headers.Authorization = `Bearer ${accessToken}`;
  }
  return new Promise((resolve, reject) => {
    axios(options)
      .then((datas) => {
        const data = FormatResponse(datas);
        resolve(data);
      })
      .catch(async (e) => {
        const status = e.response?.status;
        const error = FormatResponse(e.response);

        if ((status === 401 && accessToken) || status === 403) {
          localStorage.removeItem("accessToken");
          window.location.href = "/login";
        } else {
          return error;
        }
      })
      .then(resolve);
  });
};

export default ApiService;
