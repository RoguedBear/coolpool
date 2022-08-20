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
    console.error("error?");
  }

  return await response.json();
}
