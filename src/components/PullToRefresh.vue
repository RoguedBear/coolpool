<template>
  <img
    v-if="isPulling"
    src="../assets/reload.svg"
    :style="{ width: imageScale + '%', rotate: rotateDeg + 'deg' }"
  />
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
    document.body.addEventListener("touchmove", (e) => {
      this.isPulling = true;
      if (e.targetTouches[0].clientY - this.lastY >= 3) {
        this.timePulled += 1;
        console.log(this.timePulled);
      }
      this.lastY = e.targetTouches[0].clientY;
    });
    document.body.addEventListener("touchend", () => {
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
