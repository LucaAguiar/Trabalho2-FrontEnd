import Vue from "vue";
import VueRouter from "vue-router";
import MainView from "../views/MainView.vue";
import SupliersComponent from "../components/SupliersComponent.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "main",
        component: MainView,
        children: [
            {
                path: "/",
                component: SupliersComponent,
            },
        ],
    },
];

const router = new VueRouter({
    routes,
});

export default router;
