import Vue from "vue";
import VueRouter from "vue-router";
import MainView from "../views/MainView.vue";
import SuppliersView from "../views/SuppliersView.vue";
import ProductView from "../views/ProductView.vue";
import SaleView from "../views/SaleView.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "main",
        component: MainView,
        children: [
            {
                path: "/",
                component: SuppliersView,
            },
            {
                path: "/product",
                component: ProductView,
            },
            {
                path: "/sale",
                component: SaleView,
            },
        ],
    },
];

const router = new VueRouter({
    routes,
});

export default router;
