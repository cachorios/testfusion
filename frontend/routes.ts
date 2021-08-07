import { Route } from '@vaadin/router';
import Role from './generated/com/example/application/data/Role';
import { appStore } from './stores/app-store';
import './views/helloworld/hello-world-view';
import './views/main-layout';

export type ViewRoute = Route & {
  title?: string;
  icon?: string;
  requiresLogin?: boolean;
  rolesAllowed?: Role[];
  children?: ViewRoute[];
};

export const hasAccess = (route: Route) => {
  const viewRoute = route as ViewRoute;
  if (viewRoute.requiresLogin && !appStore.loggedIn) {
    return false;
  }

  if (viewRoute.rolesAllowed) {
    return viewRoute.rolesAllowed.some((role) => appStore.isUserInRole(role));
  }
  return true;
};

export const views: ViewRoute[] = [
  // place routes below (more info https://vaadin.com/docs/latest/fusion/routing/overview)
  {
    path: '',
    component: 'hello-world-view',
    icon: '',
    title: '',
  },
  {
    path: 'hello',
    component: 'hello-world-view',
    icon: 'la la-globe',
    title: 'Hello World',
  },
  {
    path: 'about',
    component: 'about-view',
    icon: 'la la-file',
    title: 'About',
    action: async (_context, _command) => {
      await import('./views/about/about-view');
      return;
    },
  },
  {
    path: 'card-list',
    component: 'card-list-view',
    rolesAllowed: [Role.USER],
    icon: 'la la-list',
    title: 'Card List',
    action: async (_context, _command) => {
      if (!hasAccess(_context.route)) {
        return _command.redirect('login');
      }
      await import('./views/cardlist/card-list-view');
      return;
    },
  },
  {
    path: 'master-detail',
    component: 'master-detail-view',
    rolesAllowed: [Role.ADMIN],
    icon: 'la la-columns',
    title: 'Master-Detail',
    action: async (_context, _command) => {
      if (!hasAccess(_context.route)) {
        return _command.redirect('login');
      }
      await import('./views/masterdetail/master-detail-view');
      return;
    },
  },
  {
    path: 'map',
    component: 'map-view',
    icon: 'la la-map',
    title: 'Map',
    action: async (_context, _command) => {
      await import('./views/map/map-view');
      return;
    },
  },
  {
    path: 'image-list',
    component: 'image-list-view',
    icon: 'la la-th-list',
    title: 'Image List',
    action: async (_context, _command) => {
      await import('./views/imagelist/image-list-view');
      return;
    },
  },
  {
    path: 'checkout-form',
    component: 'checkout-form-view',
    rolesAllowed: [Role.USER],
    icon: '',
    title: 'Checkout Form',
    action: async (_context, _command) => {
      if (!hasAccess(_context.route)) {
        return _command.redirect('login');
      }
      await import('./views/checkoutform/checkout-form-view');
      return;
    },
  },
  {
    path: 'credit-card-form',
    component: 'credit-card-form-view',
    rolesAllowed: [Role.ADMIN],
    icon: 'la la-credit-card',
    title: 'Credit Card Form',
    action: async (_context, _command) => {
      if (!hasAccess(_context.route)) {
        return _command.redirect('login');
      }
      await import('./views/creditcardform/credit-card-form-view');
      return;
    },
  },
  {
    path: 'empty',
    component: 'empty-view',
    icon: 'la la-file',
    title: 'Empty',
    action: async (_context, _command) => {
      await import('./views/empty/empty-view');
      return;
    },
  },
  {
    path: 'person-form',
    component: 'person-form-view',
    icon: 'la la-user',
    title: 'Person Form',
    action: async (_context, _command) => {
      await import('./views/personform/person-form-view');
      return;
    },
  },
];
export const routes: ViewRoute[] = [
  {
    path: '',
    component: 'main-layout',
    children: [...views],
  },
  {
    path: 'login',
    component: 'login-view',
    icon: '',
    title: 'Login',
    action: async (_context, _command) => {
      await import('./views/login/login-view');
      return;
    },
  },
];
