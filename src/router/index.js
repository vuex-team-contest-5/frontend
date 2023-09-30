import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: () => import('@/views/Dashboard.vue'),
      children: [
        {
          path: '/',
          name: 'Dashboard',
          component: () => import('@/views/Home/Home.vue'),
          beforeEnter: (to, from, next) => {
            if (['client', 'admin'].includes(useAuthStore().GET_ROLE)) {
              next()
            } else {
              next('login')
            }
          }
        },
        {
          path: '/teachers',
          name: 'Ustozlar',
          component: () => import('@/views/Teachers/Teachers.vue'),
          beforeEnter: (to, from, next) => {
            if (['admin'].includes(useAuthStore().GET_ROLE)) {
              next()
            } else {
              next('login')
            }
          }
        },
        {
          path: '/clients',
          name: 'Mijozlar',
          component: () => import('@/views/Clients/Clients.vue'),
          beforeEnter: (to, from, next) => {
            if (['admin'].includes(useAuthStore().GET_ROLE)) {
              next()
            } else {
              next('login')
            }
          }
        },
        {
          path: '/equipments',
          name: 'Jihozlar',
          component: () => import('@/views/Equipments/Equipments.vue'),
          beforeEnter: (to, from, next) => {
            if (['client', 'admin'].includes(useAuthStore().GET_ROLE)) {
              next()
            } else {
              next('login')
            }
          }
        },
        {
          path: '/products',
          name: 'Mahsulotlar',
          component: () => import('@/views/Products/Products.vue'),
          beforeEnter: (to, from, next) => {
            if (['client', 'admin'].includes(useAuthStore().GET_ROLE)) {
              next()
            } else {
              next('login')
            }
          }
        },
        {
          path: '/orders',
          name: 'Buyurtmalar',
          component: () => import('@/views/Orders/Orders.vue'),
          beforeEnter: (to, from, next) => {
            if (['client', 'admin'].includes(useAuthStore().GET_ROLE)) {
              next()
            } else {
              next('login')
            }
          }
        },
        {
          path: '/chats',
          name: 'Savol-Javob',
          component: () => import('@/views/Chats/Chats.vue'),
          beforeEnter: (to, from, next) => {
            if (['client', 'admin'].includes(useAuthStore().GET_ROLE)) {
              next()
            } else {
              next('login')
            }
          }
        },
        {
          path: '/statistics',
          name: 'Statistika',
          component: () => import('@/views/Statistics/Statistics.vue'),
          beforeEnter: (to, from, next) => {
            if (['admin'].includes(useAuthStore().GET_ROLE)) {
              next()
            } else {
              next('login')
            }
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login/Login.vue')
    },
    {
      path: '/verification',
      name: 'Verify',
      component: () => import('@/views/Login/EmailConfirmation.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'Error',
      component: () => import('@/views/Error/Error.vue')
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   if (to.name != 'Login' && to.name != 'Verify' && !localStorage.getItem('token')) {
//     next('/login')
//   } else if (to.name == 'Login' && localStorage.getItem('token')) {
//     next('/')
//   } else {
//     next()
//   }
// })

export default router
