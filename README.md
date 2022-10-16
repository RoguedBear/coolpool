# Cool Pool ![](./public/img/icons/favicon-32x32.png)

> An alternative, simplistic, to-the-point front end to the application my
> university uses to display mess/food coupon codes

## Features

- Dark Mode ( OLED friendly :) )
- Simplistic, 1 tap access to mess codes
- Cyberpunk-ish neon glow (thanks @codeSpicer for the css 🙃)

## For running/developing locally

- You would need the following templated environment variable file
  `.env.development.local` and then tweak it according to your specific instanc.

  ```env
  NODE_ENV=development

  USE_PROXY=true
  VUE_APP_SCHEME=http
  VUE_APP_API_URL=localhost:3000

  VUE_APP_API_URL_FOR_PROXY=localhost:8080
  VUE_APP_PROXY_BACKEND_URL="<<YOUR COLLEGE SPECIFIC URL FOR THAT APP>>"

  VUE_APP_MESS_ENDPOINT=<<API endpoint used to fetch mess cards for your instance>>
  VUE_APP_AUTH_ENDPOINT=<<API endpoint used to login for your instance>>

  META_DESC=<< Description for the site >>
  ```

  - `USE_PROXY`: if you want to use the actual backend instead of the mock local
    api server, then you'd need to specify the backend url for your specific
    uni, provided by their application

- run `npm run serve`
