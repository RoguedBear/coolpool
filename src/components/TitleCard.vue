<template>
  <h1 class="title not-availed">{{ title }}</h1>
</template>
<script>
export default {
  name: "TitleCard",
  computed: {
    title: function () {
      let name = "COOl POOl";
      let _oIndex = [1, 2, 6, 7];
      let randomIndex = _oIndex[Math.floor(Math.random() * _oIndex.length)];
      return (
        name.substring(0, randomIndex) + "😎" + name.substring(randomIndex + 1)
      );
    },
  },
};
</script>
<style>
@font-face {
  font-family: "Oxygen-700";
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url("./../assets/fonts/Oxygen.woff2") format("woff2");
}

:root {
  --letter-spacing-final: 1vh;
}

@keyframes fadeIn {
  from {
    letter-spacing: 0vh;
  }

  to {
    letter-spacing: var(--letter-spacing-final);
  }
}

.title {
  font-size: 2.3rem;
  font-family: "Oxygen-700";
  letter-spacing: var(--letter-spacing-final);
  animation-duration: 5s;
  animation-name: fadeIn;
}
</style>
