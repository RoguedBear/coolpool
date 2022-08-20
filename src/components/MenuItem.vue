<template>
  <div class="border">
    <div>
      <ul class="menu-card-top-row">
        <li>{{ type }}</li>
        <li>qr_icon</li>
        <li
          v-if="availed === false"
          class="not-availed"
          :class="{ expired: codeExpired }"
        >
          {{ code }}
        </li>
        <li v-else class="availed">Availed</li>
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
  props: ["jsonMenu"],

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
  justify-content: space-between;
  padding: 0%;
}
ul {
  list-style: none;
}

.border {
  border-radius: 4rem;
  border-color: purple;
  border-width: 5vh;
}
</style>
