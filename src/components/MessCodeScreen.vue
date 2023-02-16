<template>
  <h2>MESS CODES</h2>
  <div v-if="err">{{ err }}</div>
  <div v-if="!menuEmpty && this.menu !== null">
    <div v-for="menuEntry in sortedMenuByTime" :key="menuEntry">
      <MenuItem
        :jsonMenu="JSON.parse(menuEntry.body)"
        :time="`${menuEntry.startTime.slice(10, -3)} 
        -
         ${menuEntry.endTime.slice(10, -3)}`"
      />
    </div>
  </div>
  <div v-else-if="menuEmpty && menu !== null">
    Menu doesn't seem to contain anything right now :/
  </div>
  <div v-else><h2>Loading...</h2></div>
  <footer>
    Using cache: {{ usingCache }}
    <span v-if="usingCache"
      >from {{ new Date(cacheTimestamp).toString().split("GMT")[0] }}</span
    >
  </footer>
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
      usingCache: false,
      cacheTimestamp: null,
    };
  },
  mounted() {
    this.parseMenu();
  },
  methods: {
    parseMenu() {
      try {
        // first use cache
        if (localStorage.getItem("_mess_cache")) {
          let json = JSON.parse(localStorage.getItem("_mess_cache"));
          this.usingCache = true;
          this.cacheTimestamp = json.timestamp;
          this.menu = json.res;
        }
      } catch (error) {
        console.warn(error);
      }

      fetchAPI(process.env.VUE_APP_MESS_ENDPOINT)
        .then((data) => {
          console.info(data);
          this.menu = data.res;
          this.usingCache = false;
        })
        .catch((e) => {
          if (typeof e == "object") {
            // TODO: make a error message component
            if (e?.error) {
              this.err =
                "This wasnt supposed to happen, server returned " +
                JSON.stringify(e);
            } else {
              this.err = "an error happend-> " + e;
            }
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
    menuEmpty: function () {
      console.log("AAAAA" + JSON.stringify(this.menu));
      console.log(this.menu?.filter((item) => item.type === "messSchedule"));
      let out =
        this.menu !== null &&
        this.menu.filter((item) => item.type === "messSchedule").length === 0;
      console.log("AAAAA   " + out);
      return out;
    },
  },
};
</script>
