const routes = [
  {
    path: "/",
    component: () => import("src/layouts/PreviewLayout.vue"),
    children: [
      { path: "", component: () => import("src/pages/PreIndex.vue") },
      { path: "/signin", component: () => import("pages/Signin.vue") },
    ],
  },

  {
    path: "/main",
    component: () => import("src/layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("src/pages/Index.vue") },
      { path: "/calendar", component: () => import("pages/Calendar.vue") },
      {
        path: "/account/:targetId",
        component: () => import("pages/Account.vue"),
      },
    ],
  },

  {
    path: "/chat",
    component: () => import("src/layouts/ChattingLayout.vue"),
    children: [{ path: "", component: () => import("src/pages/Chat.vue") }],
  },

  // test
  // 수정 사항
  {
    path: "/account/:targetId",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Account.vue") }],
  },
  {
    path: "/calendar",
    component: () => import("src/layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("src/pages/Calendar.vue") }],
  },
  {
    name: "Signin",
    path: "/signin",
    component: () => import("layouts/PreviewLayout.vue"),
    children: [{ path: "", component: () => import("pages/Signin.vue") }],
  },

  {
    name: "Signup",
    path: "/signup",
    component: () => import("layouts/PreviewLayout.vue"),
    children: [{ path: "", component: () => import("pages/Signup.vue") }],
  },

  {
    name: "Profile",
    path: "/profile",
    component: () => import("layouts/PreviewLayout.vue"),
    children: [{ path: "", component: () => import("pages/Profile.vue") }],
  },

  {
    path: "/roomList",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/roomList.vue") }],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
