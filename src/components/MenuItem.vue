<template>
  <div class="border" @click="showQR = true">
    <div>
      <ul class="menu-card-top-row">
        <li class="menu-header-text food-type">{{ type }}</li>
        <li>
          <img
            class="qr"
            style="max-width: 40%"
            :style="{
              filter: 'grayscale(' + (availed || codeExpired ? 80 : 0) + '%)',
            }"
            src="../assets/qr.svg"
          />
        </li>

        <li
          v-if="availed === false"
          class="menu-header-text"
          :class="{ 'not-availed': !codeExpired, expired: codeExpired }"
        >
          {{ code }}
        </li>
        <li v-else class="menu-header-text availed">Availed</li>
      </ul>
      <ul class="menu-card-second-row">
        <li>{{ time }}</li>
        <li></li>
        <li></li>
      </ul>
    </div>
    <div>
      <span>{{ menuItems }}</span>
    </div>
  </div>
  <OverlayComponent
    :showQR="showQR"
    @toggleQR="
      showQR = false;
      engageStealth = false;
    "
    :title="type"
    :engageStealth="engageStealth"
  >
    <qrcode-vue
      :value="qrCodeString"
      size="280"
      :background="engageStealth ? '#ffffff' : '#000000'"
      :foreground="engageStealth ? '#000000' : '#ffffff'"
      renderAs="svg"
      level="M"
      :margin="engageStealth ? 10 : 0"
    />
    <p
      class="menu-header-text"
      :class="{
        availed: availed || codeExpired,
        'not-availed': !(availed || codeExpired),
      }"
      v-show="!engageStealth"
    >
      {{ code }}
    </p>
    <button
      @click.stop="engageStealth = true"
      style="width: auto"
      v-show="!engageStealth"
    >
      engage stealth? ඞ
    </button>
  </OverlayComponent>
</template>
<script>
import QrcodeVue from "qrcode.vue";
import OverlayComponent from "./OverlayComponent.vue";
import { QRFormat, encryptString } from "../utilities.js";

export default {
  name: "MenuItem",
  data() {
    return {
      showQR: false,
      engageStealth: false,
    };
  },
  props: {
    jsonMenu: Object,
    time: String,
  },
  computed: {
    availed() {
      return this.jsonMenu.codeUsed;
    },
    type() {
      return this.jsonMenu.title;
    },
    code() {
      return this.jsonMenu.code;
    },
    codeExpired() {
      return this.jsonMenu.codeExpired;
    },
    menuItems() {
      return JSON.parse(this.jsonMenu.foodItems)[0].name;
    },
    qrCodeString() {
      QRFormat.current_millis = Date.now();
      QRFormat.module.details.coupon_code = this.code;
      return encryptString(JSON.stringify(QRFormat));
    },
  },
  methods: { encryptString },
  components: { OverlayComponent, QrcodeVue },
};
</script>

<style>
.menu-card-top-row {
  display: flex;
  justify-content: space-between;
  padding: 0%;
  margin-bottom: 0;
}
.menu-card-second-row {
  display: flex;
  justify-content: space-between;
  color: gray;
  font-size: smaller;
  padding: 0;
  margin: 0 0 6px;
}
ul {
  list-style: none;
}
ul > li {
  flex: 1 1 0;
}

.border {
  border-width: 5vh;
  border-color: purple;
  width: 80%;
  border: 0.2rem solid #fff;
  border-radius: 2rem;
  box-shadow: 0 0 0.2rem #fff, 0 0 0.2rem #fff, 0 0 2rem #bc13fe,
    0 0 0.3rem #bc13fe, 0 0 0.3rem #bc13fe, inset 0 0 0.3rem #bc13fe;
  margin: 20px auto 20px auto;
}
</style>
