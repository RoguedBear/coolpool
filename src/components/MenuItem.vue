<template>
  <div class="border">
    <div>
      <ul class="menu-card-top-row">
        <li class="menu-header-text food-type">{{ type }}</li>
        <li>
          <img
            class="qr"
            style="max-width: 40%"
            src="../assets/qr.svg"
            @click="showQR = true"
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
  <QROverlay v-if="showQR" @toggleQR="showQR = false" :title="type" />
</template>
<script>
import QROverlay from "./QROverlay.vue";

export default {
  name: "MenuItem",
  data() {
    return {
      showQR: false,
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
  },
  components: { QROverlay },
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
