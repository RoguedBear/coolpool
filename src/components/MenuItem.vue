<template>
  <div class="border">
    <div>
      <ul class="menu-card-top-row">
        <li class="menu-header-text food-type">{{ type }}</li>
        <li>{{ time }}</li>
        <li>
          <img class="qr" style="max-width: 40%" src="../assets/qr.svg" />
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
    </div>
    <div>
      <span>{{ menuItems }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "MenuItem",
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
};
</script>

<style>
.menu-card-top-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding-inline: 1rem;
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
