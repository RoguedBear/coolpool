<template>
  <h2>MESS CODES</h2>
  <div v-if="err">{{ err }}</div>
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
      err: null,
    };
  },
  mounted() {
    this.parseMenu();
  },
  methods: {
    parseMenu() {
      fetchAPI(process.env.VUE_APP_MESS_ENDPOINT)
        .then((data) => {
          this.menu = data.res;
        })
        .catch((e) => {
          if (typeof e == "object") {
            // TODO: make a error message component
            this.err =
              "This wasnt supposed to happen, server returned " +
              JSON.stringify(e);
          }
          console.error("emror" + e);
        });
    },
  },
  computed: {
    sortedMenuByTime: function () {
      let copy = this.menu.filter((item) => item.type === "messSchedule");
      return copy.sort(function (a, b) {
        return new Date(a.startTime) - new Date(b.startTime);
      });
    },
  },
};
</script>
