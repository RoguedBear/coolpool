import { parseJwt } from "@/utilities";

/**
 *
 * @param {function} data callback
 * @returns
 */
// eslint-disable-next-line
export function subscribeToLoggedIn(callback) {
  let f = (e) => {
    console.log(e);
    callback(e.detail);
  };
  window.addEventListener("cool-pool-user-login-change", f.bind(callback));
}

export function issueLogout() {
  window.dispatchEvent(
    new CustomEvent("cool-pool-user-login-change", {
      detail: {
        loggedIn: false,
      },
    })
  );
  localStorage.removeItem("logged_in");
  localStorage.removeItem("token");
  console.log("logout issued");
}

export function issueLogin(token) {
  localStorage.setItem("token", token);
  localStorage.setItem("logged_in", true);
  window.dispatchEvent(
    new CustomEvent("cool-pool-user-login-change", {
      detail: {
        loggedIn: true,
      },
    })
  );
  console.log("login issued");
}

export function isLoggedIn() {
  // first check if logged_in flag is set
  if (
    localStorage.getItem("logged_in") !== true &&
    localStorage.getItem("token") == null
  ) {
    return false;
  }
  let token = parseJwt(localStorage.token);
  if (token.exp < Date.now() / 1000) {
    return false;
  }

  return true;
}
