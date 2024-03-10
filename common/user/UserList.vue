<template>
  <Navigation />
  <div class="container">
    <p>
      현재 저희와 <b>{{ total }}</b> 명의 사용자들이 함께 하고 있습니다.
    </p>
    <div>
      <RouterLink
        v-for="val in pageSize"
        :to="{ path: '/users', query: { page: val } }"
        class="me-1 active"
      >
        {{ val }}
      </RouterLink>
    </div>
    <div class="list-group list-group-flush">
      <RouterLink
        v-for="one in users"
        class="list-group-item d-flex align-items-center"
        :to="{ path: '/users/' + one.id }"
      >
        <img :src="one.image" width="48" height="48" class="rounded-5 me-2" /><b
          v-text="one.name"
          class="me-2"
        ></b>
        <span>@{{ one.introduction }}</span>
      </RouterLink>
    </div>
  </div>
</template>
<script>
import Navigation from "../common/Navigation.vue";
export default {
  components: { Navigation },
  data: function () {
    return { users: [], total: 0, pageSize: 0 };
  },
  methods: {
    receiveUsers: function (val) {
      fetch("http://192.168.4.46:8080/api/user?p=" + val)
        .then((response) => response.json())
        .then((result) => {
          this.users = result.users;
          this.total = result.total;
          this.pageSize = result.pageSize;
        });
    },
  },
  watch: {
    $route: function () {
      console.log("watch??", this.$route.query);
      this.receiveUsers(this.$route.query.page);
    },
  },
  mounted: function () {
    console.log("mounted?", this.$route.query);
    this.receiveUsers(this.$route.query.page ?? "1");
  },
};
</script>
