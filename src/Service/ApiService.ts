import axios from "axios";
import FormatResponse, { RESPONSELAYOUT } from "../Helpers/FormatResponse";
import { dehashValue } from "../Helpers/Hash/HashValue";

const ApiService = (
  path: string,
  method: string,
  body: Object
): Promise<RESPONSELAYOUT> => {
  const accessTokenHash = localStorage.getItem("accessToken");
  let accessToken = "";
  if (accessTokenHash) {
    const value = dehashValue(accessTokenHash);
    if (value) {
      accessToken = value;
    }
  }
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

        if ((status === 401 && accessToken)) {
          localStorage.clear();
          window.location.href = "/login";
        } else {
          return error;
        }
      })
      .then((data) => {
        if (data) {
          const formatData: RESPONSELAYOUT = data;
          resolve(formatData);
        }
      });
  });
};

export default ApiService;
