<template>
  <div v-if="menu !== null">
    <div v-for="menuEntry in sortedMenuByTime" :key="menuEntry">
      <MenuItem :jsonMenu="JSON.parse(menuEntry.body)" />
    </div>
  </div>
  <div v-else><h2>Loading...</h2></div>
</template>

<script>
import MenuItem from "./MenuItem.vue";

import { fetchAPI } from "../api-methods.js";

export default {
  name: "MessCodeScreen",
  components: { MenuItem },
  data() {
    return {
      menu: null,
    };
  },
  mounted() {
    this.parseMenu();
  },
  methods: {
    parseMenu() {
      fetchAPI(process.env.VUE_APP_MESS_ENDPOINT).then((data) => {
        this.menu = data.res;
      });
    },
  },
  computed: {
    sortedMenuByTime: function () {
      let copy = this.menu;
      return copy.sort(function (a, b) {
        return new Date(a.startTime) - new Date(b.startTime);
      });
    },
  },
};
</script>
