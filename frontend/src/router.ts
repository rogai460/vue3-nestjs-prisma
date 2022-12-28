import { createRouter, createWebHistory } from "vue-router";
// import Home from "@/pages/Home.vue";
import ProjectDetail from "@/pages/ProjectDetail.vue";
import HelloWorld from "@/pages/HelloWorld.vue";
import EngineerList from "@/pages/EngineerList.vue";
import EngineerDetail from "@/pages/EngineerDetail.vue";

const routes = [
  { path: "/", name: "home", component: HelloWorld },
  { path: "/project-detail", name: "projectDetail", component: ProjectDetail },
  { path: "/engineer", name: "engineer", component: EngineerList },
  {
    path: "/engineer-detail",
    name: "engineer-detail",
    component: EngineerDetail,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(), // HTML5 History モード
  routes,
});

export default router;
