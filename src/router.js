import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import Login from "@/components/Login";
import Register from "@/components/Register";

Vue.use(Router);

let router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/login",
            name: "login",
            component: Login,
            meta: {
                guest: true
            }
        },
        {
            path: "/register",
            name: "register",
            component: Register,
            meta: {
                guest: true
            }
        },
        {
            path: "/",
            name: "home",
            component: Home,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/about",
            name: "about",
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import(/* webpackChunkName: "about" */ "./views/About.vue")
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem("user") == null) {
            next({
                path: "/login",
                params: {nextUrl: to.fullPath}
            });
        } else {
            let user = localStorage.getItem("user");
            if (to.matched.some(record => record.meta.is_verified)) {
                if (user.is_verified === 1) {
                    next();
                } else {
                    next({name: "home"});
                }
            } else {
                next();
            }
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        next();
    } else {
        next();
    }
});

export default router;
