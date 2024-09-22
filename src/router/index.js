// ==============
// Import
// ==============
import { 
  createRouter,
  createWebHistory
} from "vue-router";

// ==============
// Router
// ==============
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "nav",
      component: () => import("../views/Nav.vue"),
    },
    {
      path: "/wowen-knots",
      name: "wowen-knots",
      component: () => import("../views/WowenKnots.vue"),
    },
  ],
});

export default router;