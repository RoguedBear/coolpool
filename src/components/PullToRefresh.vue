<template>
  <img
    v-if="isPulling && timePulled > 3"
    src="../assets/reload.svg"
    :style="{ width: imageScale + '%', rotate: rotateDeg + 'deg' }"
  />
  <span v-if="timePulled > 3">{{ timePulled }}</span>
</template>
<script>
export default {
  name: "PullToRefresh",

  data() {
    return {
      isPulling: false,
      lastY: null,
      timePulled: 0,
    };
  },
  mounted() {
    document.addEventListener("touchmove", (e) => {
      this.isPulling = true;
      let delta = e.targetTouches[0].clientY - this.lastY;
      if (delta >= 3) {
        this.timePulled += 1;
        console.log(this.timePulled);
      } else if (delta < -1) {
        this.timePulled -= 1;
        console.log(this.timePulled);
      }
      this.lastY = e.targetTouches[0].clientY;
    });
    document.addEventListener("touchend", () => {
      if (this.timePulled > 55) {
        window.location.reload();
      }
      this.isPulling = false;
      this.timePulled = 0;
    });
  },
  computed: {
    imageScale: function () {
      return this.isPulling && this.timePulled > 10 ? this.timePulled / 3 : 0;
    },
    rotateDeg: function () {
      return -((this.timePulled * 3) % 360);
    },
  },
};
</script>
<style></style>
