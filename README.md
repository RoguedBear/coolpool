# Cool Pool ![](./public/img/icons/favicon-32x32.png)

> An alternative, simplistic, to-the-point front end to the ERP application my
> university uses to display mess/food coupon codes

## Features

- Generating qr codes 👾
- Dark Mode ( OLED friendly :) ) 🌚
- Simplistic, 1 tap access to mess codes ⚡
- Stealth mode to blend in with normal users ඞ
- Cyberpunk-ish neon glow 👨‍🎤 (thanks @codeSpicer for the css 🙃)

## Screenshots

- ### Mess code screen

  <!-- ![image](https://user-images.githubusercontent.com/39442192/197512586-a493bb64-5551-4c74-9d26-7e1a667203a0.png?width=50) -->
  <img src="https://user-images.githubusercontent.com/39442192/223687807-1685c2b5-db69-4b28-92c0-0bc1e10aaa10.png" width="50%" />

- ### QR code screen

  <img src="https://user-images.githubusercontent.com/39442192/223688764-66a85bb8-d895-413a-ba90-5cca9a52ad04.png" width="55%" />

- ### Stealth Mode
  👀ඞ🤫ඞ👀 \
  only one way to find out 👀

## How to use?

- visit the site \
  (optionally install the app as a PWA from the browser)
- login with your enrollment number and password (not the microsoft account
  password)
- 💲💲💲 🤑 profit\
  enjoy 1 tap access to mess codes with OLED friendly dark mode

## For running/developing locally

- You would need the `.env.development.local` file (contact me for that). \

  Following is an old template that should get you going:

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
