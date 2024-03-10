<template>
  <Navigation />
  <h1>유저상세페이지</h1>
  <p>유저아이디 : {{ $route.params.id }} || {{ userId }}</p>

  <p>......</p>
</template>
<script>
import Navigation from "@/common/Navigation.vue";

export default {
  components: { Navigation },

  data: function () {
    return { userId: "" };
  },

  methods: {
    printRoute: function () {
      console.log(this.$route.params);
    },
  },

  mounted: function () {
    this.printRoute();
    this.userId = this.$route.params.id;
  },
};
</script>
