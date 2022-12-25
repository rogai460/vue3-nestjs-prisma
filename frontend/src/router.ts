import { createRouter, createWebHistory } from "vue-router";
// import Home from "@/pages/Home.vue";
import Base from "@/pages/Base.vue";
import ProjectDetail from "@/pages/ProjectDetail.vue";
import HelloWorld from "@/pages/HelloWorld.vue";

const routes = [
  { path: "/", name: "home", component: HelloWorld },
  { path: "/projectDetail", name: "projectDetail", component: ProjectDetail },
];

const router = createRouter({
  history: createWebHistory(), // HTML5 History モード
  routes,
});

export default router;
