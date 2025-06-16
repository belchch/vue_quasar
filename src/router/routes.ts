import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/index',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue'), name: 'home' }],
    meta: { requiredAuth: true },
  },
  {
    path: '/',
    redirect: '/cases',
  },
  {
    path: '/case/:caseId',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/CasePage.vue'),
        name: 'case',
        props: true,
      },
    ],
    meta: { requiredAuth: true },
  },
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [{ path: '', component: () => import('pages/LoginPage.vue'), name: 'login' }],
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/DefectPage.vue'), name: 'defect' }],
    meta: { requiredAuth: true },
  },
  {
    path: '/lookup',
    component: () => import('layouts/LookupLayout.vue'),
    children: [
      {
        path: 'material',
        component: () => import('pages/lookup/MaterialPage.vue'),
        name: 'lookup.material',
      },
      {
        path: 'judge',
        component: () => import('pages/lookup/JudgePage.vue'),
        name: 'lookup.judge',
      },
      {
        path: 'spots',
        component: () => import('pages/lookup/SpotPage.vue'),
        name: 'lookup.spots',
      },
      {
        path: 'regions',
        component: () => import('pages/lookup/RegionPage.vue'),
        name: 'lookup.regions',
      },
      {
        path: 'flaws',
        component: () => import('pages/lookup/FlawPage.vue'),
        name: 'lookup.flaws',
      },
      {
        path: 'struct_elems',
        component: () => import('pages/lookup/StructElemPage.vue'),
        name: 'lookup.struct_elems',
      },
      {
        path: 'defects',
        component: () => import('pages/lookup/DefectPage.vue'),
        name: 'lookup.defects',
      },
      {
        path: 'standards',
        component: () => import('pages/lookup/StandardPage.vue'),
        name: 'lookup.standards',
      },
      {
        path: 'courts',
        component: () => import('pages/lookup/CourtPage.vue'),
        name: 'lookup.courts',
      },
      {
        path: 'companies',
        component: () => import('pages/lookup/CompanyPage.vue'),
        name: 'lookup.companies',
      },
    ],
    meta: { requiredAuth: true },
  },
  {
    path: '/cases',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/CasesPage.vue'), name: 'cases' }],
    meta: { requiredAuth: true },
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
