import { BASE_URL } from "@/utils/appdata";
import { toaster } from "@/utils/commons";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

const AUTH_BASE_URL = `${BASE_URL}/auth`;

export function authenticatedLogin(username: string, password: string) {
  authFetch
    .post(`${AUTH_BASE_URL}/login`, {
      username: username,
      password: password,
    })
    .then((response) => {
      setToken(response.data);
      toast("Signed In", {
        description: "You have successfully signed in.",
        position: "top-right",
      });
      window.location.href = "/employees";
    });
}

export const authFetch = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

authFetch.interceptors.request.use(
  (request) => {
    if (getToken()) {
      request.headers.Authorization = `Bearer ${getToken()}`;
    }

    return request;
  },
    (error) => Promise.reject(error),
//   (error: AxiosError) => {
//     if (error.response) {
//       // The request was made and the server responded with a status code
//       // that falls out of the range of 2xx
//       console.log(error.response.data);
//       console.log(error.response.status);
//       console.log(error.response.headers);
//     } else if (error.request) {
//       // The request was made but no response was received
//       // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
//       // http.ClientRequest in node.js
//       console.log(error.request);
//     } else {
//       // Something happened in setting up the request that triggered an Error
//       console.log("Error", error.message);
//     }
//     console.log(error);
//     toaster(false, "Error Occured", `${error}`);
//   },
);

authFetch.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    console.log("AUTH_RES_ERROR: ", error.response);
    if (error.response) {
      const responseData = error.response.data as { message?: string };
      toaster(
        false,
        "Error Occured",
        responseData?.message || error.message || "Unknown error",
      );
    }
  },
);

function setToken(token: string) {
  localStorage.setItem("token", token);
}

function getToken() {
  return localStorage.getItem("token");
}

export function logout() {
  localStorage.clear();
}
