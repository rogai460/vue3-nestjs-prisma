import { createRouter, createWebHistory } from 'vue-router';
import ProjectDetail from '@/pages/ProjectDetail.vue';
import Dashboard from '@/pages/Dashboard.vue';
import EngineerList from '@/pages/EngineerList.vue';
import EngineerDetail from '@/pages/EngineerDetail.vue';
import ProjectHistoryUpdate from '@/pages/ProjectHistoryUpdate.vue';

const routes = [
  { path: '/', name: 'dashboard', component: Dashboard },
  { path: '/project-detail', name: 'project-detail', component: ProjectDetail },
  { path: '/engineer', name: 'engineer', component: EngineerList },
  {
    path: '/engineer-detail',
    name: 'engineer-detail',
    component: EngineerDetail,
    props: true,
  },
  {
    path: '/project-history-update',
    name: 'project-history-update',
    component: ProjectHistoryUpdate,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(), // HTML5 History モード
  routes,
});

export default router;
