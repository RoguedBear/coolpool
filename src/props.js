import { parseJwt } from "@/utilities";

/**
 *
 * @param {*} data the variable to store the boolean flag to
 * @returns
 */
// eslint-disable-next-line
export function subscribeToLoggedIn(data) {
  let f = (e) => {
    console.log(e);
    data.loggedIn = e.detail.loggedIn;
  };
  window.addEventListener("cool-pool-user-login-change", f.bind(data));
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
