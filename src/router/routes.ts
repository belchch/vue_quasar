import { casePages } from 'src/features/case/constants/case-pages'
import { Component } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

const casePage = ({ name, component }: { name: string, component: Component }) => {
  const page = casePages[name]!

  return {
    path: page.segment,
    component,
    name
  }
}

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
    path: '/cases/:caseId',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/CasePage.vue'),
        name: 'case',
        props: true,
        children: [
          casePage({
            name: 'case-information',
            component: import('src/pages/case/CaseInfoPage.vue')
          }),
          casePage({
            name: 'case-questions',
            component: import('src/pages/case/CaseQuestionsPage.vue')
          }),
          {
            path: 'inspection/:inspectionId',
            component: () => import('src/pages/inspection/InspectionPage.vue'),
            name: 'inspection',
            props: true,
            children: [
              casePage({
                name: 'inspection-photos',
                component: import('src/pages/inspection/InspectionPhotoPage.vue')
              }),
              casePage({
                name: 'inspection-gv',
                component: import('src/pages/inspection/InspectionGeneralViewPage.vue')
              }),
              casePage({
                name: 'inspection-measurements',
                component: import('src/pages/inspection/InspectionMeasurementsPage.vue')
              }),   
              casePage({
                name: 'inspection-defects',
                component: import('src/pages/inspection/InspectionDefectsPage.vue')
              }),
              casePage({
                name: 'inspection-boq',
                component: import('src/pages/inspection/InspectionBoqPage.vue')
              }),
              casePage({
                name: 'inspection-documents',
                component: import('src/pages/inspection/InspectionDocumentsPage.vue')
              }),
              casePage({
                name: 'inspection-report',
                component: import('src/pages/inspection/InspectionReportPage.vue')
              }),
              casePage({
                name: 'inspection-settings',
                component: import('src/pages/inspection/InspectionSettingsPage.vue')
              })
            ]
          },
        ]
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
      {
        path: 'openings',
        component: () => import('pages/lookup/OpeningPage.vue'),
        name: 'lookup.openings',
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
  {
    path: '/administration',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/AdminPage.vue'), name: 'admin' }],
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
