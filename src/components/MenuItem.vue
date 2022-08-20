<template>
  <div class="border">
    <div>
      <ul class="menu-card-top-row">
        <li>{{ type }}</li>
        <li>qr_icon</li>
        <li v-if="availed === false" class="not-availed">{{ code }}</li>
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
  data() {
    return {
      menuItems:
        "lorem ipsum, idli ipsum, aloo ipsum, lorem paneer, spam, spam, spam so much stuff to eat oh wowowoo",
      availed: false,
      type: "Breakfast",
      code: "794835",
    };
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
