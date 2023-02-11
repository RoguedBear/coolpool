export function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export function isFirefox() {
  return navigator.userAgent.indexOf("Firefox") !== -1;
}

export let QRFormat = {
  current_millis: Date.now(),
  // device: { app_version: "1.92", name: "SM-A315F", os_version: "31" },
  module: {
    details: {
      shop_id: "-1",
      auto_approval_status: "false",
      coupon_code: "51329",
      order_id: "-1",
    },
    sub_type: "reminder_coupon_code",
    type: "reminders",
  },
  user: {
    college_id: 136,
    id: 234224,
    name: "Darth Vader",
    user_type: "student",
  },
  version: 2,
};
