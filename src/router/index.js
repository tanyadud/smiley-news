import Vue from 'vue'
import VueRouter from 'vue-router'
import ga from 'vue-ga'


Vue.use(VueRouter)

const routes = [{
  /**
   * Main and service routes
   */
  path: '/',
  name: 'home',
  component: () => import( /* webpackChunkName: "web" */ '../views/index.vue'),
  meta: {
    title: 'Home',
  }
},
  {
    path: '/404',
    name: '404',
    component: () => import( /* webpackChunkName: "web" */ '../views/404.vue'),
    meta: {
      title: '404 Page not found',
    }
  },
  {
    path: '*',
    redirect: '/404'
  },
  /**
   * User pages
   */
  {
    path: '/members',
    component: () => import( /* webpackChunkName: "user" */ '../views/users/index.vue'),
    meta: {
      title: 'Users',
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        name: 'members',
        component: () => import( /* webpackChunkName: "user" */ '../views/users/_main.vue'),
        meta: {
          requiresAuth: true,
        }
      },
      {
        path: ':slug',
        name: 'member',
        component: () => import( /* webpackChunkName: "user" */ '../views/users/_slug.vue'),
        meta: {
          requiresAuth: true,
          title: ''
        }
      },
    ]
  },

  {
    path: '/member/account-settings',
    name: 'account-settings',
    component: () => import( /* webpackChunkName: "user" */ '../views/user/Edit.vue'),
    meta: {
      title: 'Edit account settings',
      requiresAuth: true,
    }
  },
  {
    path: '/member/feed',
    name: 'feed',
    component: () => import( /* webpackChunkName: "user" */ '../views/user/Feed.vue'),
    meta: {
      title: 'My Feed',
      requiresAuth: true,
    }
  },
  {
    path: '/member/profile',
    name: 'profile',
    component: () => import( /* webpackChunkName: "user" */ '../views/user/index.vue'),
    meta: {
      title: 'My Profile',
      requiresAuth: true,
    }
  },
  {
    path: '/member/profile-new',
    name: 'newProfile',
    component: () => import( /* webpackChunkName: "user" */ '../views/user/newProfile.vue'),
    meta: {
      title: 'My Profile',
      requiresAuth: true,
    }
  },
  /**
   * Authorization routes
   */
  {
    path: '/login',
    name: 'login',
    component: () => import( /* webpackChunkName: "auth" */ '../views/auth/Login.vue'),
    meta: {
      title: 'Login',
    }
  }, {
    path: '/register',
    name: 'register',
    component: () => import( /* webpackChunkName: "auth" */ '../views/auth/Register.vue'),
    meta: {
      title: 'Register',
    }
  }, {
    path: '/register/step-2',
    name: 'register-2',
    component: () => import( /* webpackChunkName: "auth" */ '../views/auth/Register-Step-2.vue'),
    meta: {
      title: 'Register | Step 2',
    }
  }, {
    path: '/register/step-3',
    name: 'register-3',
    component: () => import( /* webpackChunkName: "auth" */ '../views/auth/Register-Step-3.vue'),
    meta: {
      title: 'Register | Step 3',
    }
  }, {
    path: '/register/step-4',
    name: 'register-4',
    component: () => import( /* webpackChunkName: "auth" */ '../views/auth/Register-Step-4.vue'),
    meta: {
      title: 'Register | Step 4',
    }
  }, {
    path: '/forgot',
    name: 'forgot',
    component: () => import( /* webpackChunkName: "auth" */ '../views/auth/Forgot.vue'),
    meta: {
      title: 'Forgot password',
    }
  }, {
    path: '/reset',
    name: 'reset',
    component: () => import( /* webpackChunkName: "auth" */ '../views/auth/Reset.vue'),
    meta: {
      title: 'Reset password',
    }
  },
  /**
   * Search
   */
  {
    path: '/search/:keyword',
    name: 'search',
    component: () => import( /* webpackChunkName: "news" */ '../views/Search.vue'),
    meta: {
      title: 'Search results',
    }
  },
  {
    path: '/news-search/:keyword',
    name: 'news-search',
    component: () => import( /* webpackChunkName: "news" */ '../views/SearchNews.vue'),
    meta: {
      title: 'Search results',
    }
  },
  /**
   * Network
   */
  {
    path: '/smiley-network',
    name: 'network',
    component: () => import( /* webpackChunkName: "news" */ '../views/Network.vue'),
    meta: {
      title: 'Network',
    }
  },
  /**
   * Projects
   */
  {
    path: '/projects/',
    component: () => import( /* webpackChunkName: "projects" */ '../views/projects/index.vue'),
    meta: {
      title: 'Projects'
    },
    children: [
      {
        path: '',
        name: 'projects',
        component: () => import( /* webpackChunkName: "projects" */ '../views/projects/_main.vue'),
      }, {
        path: ':slug',
        name: 'project',
        component: () => import( /* webpackChunkName: "projects" */ '../views/projects/_slug.vue'),
        meta: {
          title: ''
        }
      },
    ]
  },
  {
    path: '/create/project',
    name: 'create-project',
    component: () => import( /* webpackChunkName: "goals" */ '../views/create/project.vue'),
    meta: {
      title: 'Create project',
      requiresAuth: true,
    }
  },
  {
    path: '/edit/project/:slug',
    name: 'edit-project',
    component: () => import( /* webpackChunkName: "goals" */ '../views/edit/project.vue'),
    meta: {
      title: 'Edit project',
      requiresAuth: true,
    }
  },
  /**
   * News
   */
  {
    path: '/smiley-news',
    component: () => import( /* webpackChunkName: "news" */ '../views/news/index.vue'),
    meta: {
      title: 'Smiley News'
    },
    children: [
      {
        path: '',
        name: 'news',
        component: () => import( /* webpackChunkName: "news" */ '../views/news/_main.vue'),
      }, {
        path: ':slug',
        name: 'news-item',
        component: () => import( /* webpackChunkName: "news" */ '../views/news/_slug.vue'),
        meta: {
          title: ''
        }
      },
    ]
  },
  {
    path: '/smiley-news-latest',
    name: 'news-latest',
    component: () => import( /* webpackChunkName: "news" */ '../views/news/_latest.vue'),
    meta: {
      title: 'Latest News',
    }
  },
  /**
   * Goals
   */
  {
    path: '/goals/',
    component: () => import( /* webpackChunkName: "goals" */ '../views/goals/index.vue'),
    meta: {
      title: 'UN Goals',
    },
    children: [
      {
        path: '',
        name: 'goals',
        component: () => import( /* webpackChunkName: "goals" */ '../views/goals/_main.vue'),
      }, {
        path: ':slug',
        name: 'news-category-item',
        component: () => import( /* webpackChunkName: "goals" */ '../views/goals/_slug.vue'),
        meta: {
          title: ''
        }
      }
    ]
  },
  /**
   * Talks
   */
  {
    path: '/smiley-talks',
    component: () => import( /* webpackChunkName: "talks" */ '../views/talks/index.vue'),
    meta: {
      title: 'Smiley Talks'
    },
    children: [
      {
        path: '',
        name: 'talks',
        component: () => import( /* webpackChunkName: "talks" */ '../views/talks/_main.vue'),
      }, {
        path: ':slug',
        name: 'event',
        component: () => import( /* webpackChunkName: "talks" */ '../views/talks/_slug.vue'),
        meta: {
          title: ''
        }
      }
    ]
  },
  /**
   * Organisation routes
   */
  {
    path: '/create/organisation',
    name: 'create-organisation',
    component: () => import( /* webpackChunkName: "goals" */ '../views/create/organisation.vue'),
    meta: {
      title: 'Create Organisation',
      requiresAuth: true,
    }
  },
  {
    path: '/edit/organisation',
    name: 'edit-organisation',
    component: () => import( /* webpackChunkName: "organisation" */ '../views/edit/organisation.vue'),
    meta: {
      title: 'Edit Organisation',
      requiresAuth: true,
    }
  },
  {
    path: '/organisations',
    component: () => import( /* webpackChunkName: "organisations" */ '../views/organisations/index.vue'),
    meta: {
      title: 'Organisations'
    },
    children: [
      {
        path: '',
        name: 'organisations',
        component: () => import( /* webpackChunkName: "organisations" */ '../views/organisations/_main.vue'),
      }, {
        path: ':slug',
        name: 'organisation',
        component: () => import( /* webpackChunkName: "organisations" */ '../views/organisations/_slug.vue'),
        meta: {
          title: ''
        }
      }
    ]
  },
  {
    path: '/organisation/:slug',
    component: () => import( /* webpackChunkName: "organisation" */ '../views/organisations/_slug.vue'),
    redirect: {
      name: 'organisation',
    }
  },
  {
    path: '/organisation-by-smiley/:slug',
    name: 'organisation-by-smiley',
    component: () => import( /* webpackChunkName: "organisation" */ '../views/organisations/_slug-by-smiley.vue'),
    meta: {
      title: ''
    }
  },
  /**
   * Content pages
   */
  {
    path: '/our-story',
    name: 'story',
    component: () => import( /* webpackChunkName: "page" */ '../views/Story.vue'),
    meta: {
      title: 'Our story'
    }
  },
  {
    path: '/partners',
    name: 'partners',
    component: () => import( /* webpackChunkName: "page" */ '../views/Partners.vue'),
    meta: {
      title: 'Partners',
    }
  },
  {
    path: '/terms-and-conditions',
    name: 'terms',
    component: () => import( /* webpackChunkName: "page" */ '../views/Terms.vue'),
    meta: {
      title: 'Terms and Conditions',
    }
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import( /* webpackChunkName: "page" */ '../views/Contact.vue'),
    meta: {
      title: 'Contact',
    }
  },
  /**
   * Miscellenous
   */
  {
    path: '/chatroom',
    name: 'chat',
    component: () => import( /* webpackChunkName: "chat" */ '../views/chatroom/index.vue'),
    meta: {
      title: 'Chat',
      requiresAuth: true,
    }
  },
  {
    path: '/form-kit',
    name: 'uikit',
    component: () => import( /* webpackChunkName: "chat" */ '../views/FormKit.vue'),
    meta: {}
  },
  // Redirects
  {
    path: '/ckdb',
    redirect: {
      name: 'news-item',
      params: {
        slug: 'ckdb'
      }
    }
  },
  {
    path: '/news/:slug',
    redirect: {
      name: 'news-item',
    }
  },
  {
    path: '/test-meta',
    name: 'metatest',
    component: () => import(/* webpackChunkName: "metatest" */ '../views/test-meta'),
  },
  {
    path: '/test-youtube',
    name: 'youtube_streem',
    component: () => import(/* webpackChunkName: "metatest" */ '../views/test-youtube'),
  },
];


const router = new VueRouter({
  mode: 'history',
  base: process.env.environment === 'development' ? '/' : '/',
  routes
});

router.beforeEach(function (to, from, next) {
  // TODO: Scroll top after pagination also
  window.scrollTo(0, 0)
  document.body.classList.remove("mobile-menu--opened");
  const isLogged = !!(localStorage.getItem('token'));

  if (to.meta.requiresAuth) {

    if (!isLogged) {
      next({
        name: 'login'
      });
    } else {

      if (!isLogged) {
        next({
          name: 'login'
        });
        return
      }
      next();
    }
  } else {
    next();
  }
});

ga(router, 'UA-149279942-1');

export default router