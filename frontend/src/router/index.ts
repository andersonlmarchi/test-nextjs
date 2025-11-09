import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomeView.vue";
import About from "../views/AboutView.vue";
import Contracts from "@/views/Contracts.vue";
import ContractDetails from "@/views/ContractDetails.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/about", name: "About", component: About },
  { path: "/contracts", name: "Contracts", component: Contracts },
  { path: "/contracts/:id", name: "ContractDetails", component: ContractDetails, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
