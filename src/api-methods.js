// TODO: implement normal login first, then cahce it or do whatever i want to

import { issueLogout } from "./props";

function isEmail(email) {
  /*eslint no-useless-escape: "error"*/
  const email_re = "[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+";

  return String(email).toLowerCase().match(email_re);
}
export async function fetchAPI(endpoint) {
  let url = `${process.env.VUE_APP_SCHEME}://${process.env.VUE_APP_API_URL}${endpoint}`;
  console.log("fetching: " + url);
  let response = await fetch(url, {
    credentials: "omit",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; rv:103.0) Gecko/20100101 Firefox/103.0",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.5",
      "Auth-Token": localStorage.getItem("token"),
      "Upgrade-Insecure-Requests": "1",
      "Sec-Fetch-Dest": "document",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-Site": "none",
      "Sec-Fetch-User": "?1",
      "If-None-Match": 'W/"f5e-JRc5IzOP89pod3XJTn34FJCidaU"',
    },
    method: "GET",
    mode: "cors",
  });
  if (!response.ok) {
    console.error("error? " + response.status);
    if (response.status === 401) {
      console.warn("status code 401, token expired or something");
      issueLogout();
    }
    if (500 <= response.status) {
      throw { error: response.status };
    }
  }

  return await response.json();
}

export async function login(username, password) {
  let email = isEmail(username)?.[0];
  let registrationId = email ? null : username;
  let response = await fetch(
    `${process.env.VUE_APP_SCHEME}://${process.env.VUE_APP_API_URL}${process.env.VUE_APP_AUTH_ENDPOINT}`,
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Mobile Safari/537.36",
        Accept: "application/json",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
        // "Content-Length": "285",
        // "Referrer-Policy": "strict-origin-when-cross-origin",
        Pragma: "no-cache",
        "Cache-Control": "no-cache",
        Origin: "localhost",
        DNT: "1",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "cross-site",
        Referer: "https://hoppscotch.io/",
        Connection: "keep-alive",
        TE: "trailers",
      },

      body: JSON.stringify({
        email: email,
        password: password,
        registrationId: registrationId,
        phone: null,
        browser: "Chrome",
        ip: "118.185.21.138",
        operatingSystem: "Windows",
        deviceId: String(Math.floor(9e8 + Math.random() * 1e8)),
        deviceType: "BROWSER",
        rememberMe: false,
        loginTime: "2022-08-30 11:10:41",
      }),
      method: "POST",
      mode: "cors",
    }
  );

  return await response.json();
}
