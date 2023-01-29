<template>
  <div @click="emitToggle" class="overlay" v-if="showQR">
    <div class="border solid-bg">
      <h1>{{ title }}</h1>
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "OverlayComponent",
  props: {
    title: String,
    showQR: Boolean,
  },
  methods: {
    emitToggle() {
      console.log("emmiting toggle");
      this.$emit("toggleQR", false);
    },
  },
};
</script>
<style>
.solid-bg {
  background-color: black;
  align-self: center;
}
</style>
