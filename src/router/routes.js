
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
    ]
  },
  {
    path: '/posts/:slug',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/posts/_slug.vue') }
    ]
  },
  {
    path: '/contact-us',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ContactUs.vue') },
    ]
  },
  {
    path: '/404',
    component: () => import('pages/Error404.vue'),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:slug',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/_slug.vue') },
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
