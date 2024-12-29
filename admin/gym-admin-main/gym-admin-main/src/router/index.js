import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
/**
 *These parts control some elements of the left side bar
 */
export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'Roles Management',
      icon: 'lock',
      roles: [0, 1, 2] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'Self-check',
        meta: {
          title: 'Self-check',
          roles: [1] // or you can only set roles in sub nav
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'User Editor',
        meta: {
          title: 'Edit users',
          roles: [1]
        }
      }

    ]
  },
  {
    path: '/facility',
    component: Layout,
    name: 'Facility Editor',
    meta: {
      title: 'Facility',
      roles: [1],
      icon: 'table'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/table/facility-table'),
        name: 'Facility',
        meta: { title: 'Edit Facility', icon: 'form', roles: [1] }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    name: 'User',
    meta: {
      title: 'User',
      roles: [1],
      icon: 'peoples'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/table/user-table'),
        name: 'User',
        meta: { title: 'User', icon: 'peoples', roles: [1] }
      }
    ]
  },
  {
    path: '/bank',
    component: Layout,
    name: 'Bank',
    meta: {
      title: 'Bank',
      roles: [1],
      icon: 'table'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/table/bank-table'),
        name: 'Bank',
        meta: { title: 'Bank', icon: 'shopping', roles: [1] }
      }
    ]
  },
  {
    path: '/config',
    component: Layout,
    name: 'Config',
    meta: {
      title: 'Edit',
      roles: [1],
      icon: 'table'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/config/config'),
        name: 'Config',
        meta: { title: 'Config', icon: 'theme', roles: [1] }
      }
    ]
  },
  {
    path: '/scan',
    component: Layout,
    name: 'Scan QR Code',
    meta: {
      title: 'Scan',
      roles: [1, 2],
      icon: 'table'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/qrcode/scan'),
        name: 'Scan',
        meta: { title: 'Scan QR', icon: 'skill', roles: [1, 2] }
      }
    ]
  },
  {
    path: '/announcement',
    component: Layout,
    name: 'Announcement',
    meta: {
      title: 'Announcement',
      roles: [1],
      icon: 'table'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/table/announcement-table'),
        name: 'Announcement',
        meta: { title: 'Announcement', icon: 'documentation', roles: [1, 2] }
      }
    ]
  },
  {
    path: '/evaluation',
    component: Layout,
    name: 'Evaluation',
    meta: {
      title: 'Evaluation',
      roles: [1],
      icon: 'table'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/table/evaluation-table'),
        name: 'Evaluation',
        meta: { title: 'Evaluation', icon: 'star', roles: [1, 2] }
      }
    ]
  },
  {
    path: '/logs',
    component: Layout,
    name: 'Logs',
    meta: {
      title: 'Logs',
      roles: [1],
      icon: 'table'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/log/log'),
        name: 'Logs',
        meta: { title: 'Logs', icon: 'bug', roles: [1] }
      }
    ]
  },
  /** when your routing map is too long, you can split it into small modules **/

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
