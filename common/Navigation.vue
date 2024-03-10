<template>
  <div>
    <ul class="nav justify-content-center nav-pills">
      <li class="nav-item">
        <RouterLink to="/baseball" class="nav-link">숫자야구</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/omok" class="nav-link">오목</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/visitbook" class="nav-link">방명록</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/users" class="nav-link">사용자들</RouterLink>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data: function () {
    return {};
  },
};
</script>
<style scoped>
.router-link-active {
  background-color: black;
  color: white;
}
</style>
