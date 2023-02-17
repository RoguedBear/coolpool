<template>
  <div
    @click="emitToggle"
    class="overlay"
    :class="{ disguise: engageStealth }"
    v-if="showQR"
  >
    <div class="border solid-bg" v-if="!engageStealth">
      <h1>{{ title }}</h1>
      <slot></slot>
    </div>
    <div v-else class="disguise-qr">
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
    engageStealth: Boolean,
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
