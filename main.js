import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import GameBaseBall from "./screen/GameBaseBall.vue";
import GameOmok from "./screen/GameOmok.vue";
import BoardVisitBook from "./screen/BoardVisitBook.vue";

import Users from "./screen/Users.vue";
import UserDetail from "./common/user/UserDetail.vue";
import UserList from "./common/user/UserList.vue";

import RankingBaseBall from "./common/baseball/RankingBaseBall.vue";
import PlayingBaseBall from "./common/baseball/PlayingBaseBall.vue";
// console.log(value);

const app = createApp(App);
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/users" },
    {
      path: "/baseball",
      component: GameBaseBall,
      children: [
        { path: "", component: PlayingBaseBall },
        { path: "ranking", component: RankingBaseBall },
      ],
    },
    { path: "/baseball/ranking", component: RankingBaseBall },
    { path: "/omok", component: GameOmok },
    { path: "/visitbook", component: BoardVisitBook },
    {
      path: "/users",
      component: User,
      children: [
        { path: "", component: UserList },
        { path: "userdetails", component: "UserDetail" },
      ],
    },
  ],
  linkActiveClass: "active",
});

app.use(router);
app.mount("#app");
