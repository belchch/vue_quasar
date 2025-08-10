import { casePages } from 'src/features/case/constants/case-pages'
import CaseInfoPage from 'src/pages/case/CaseInfoPage.vue'
import CaseQuestionsPage from 'src/pages/case/CaseQuestionsPage.vue'
import CasePage from 'src/pages/CasePage.vue'
import InspectionBoqPage from 'src/pages/inspection/InspectionBoqPage.vue'
import InspectionDefectsPage from 'src/pages/inspection/InspectionDefectsPage.vue'
import InspectionDocumentsPage from 'src/pages/inspection/InspectionDocumentsPage.vue'
import InspectionGeneralViewPage from 'src/pages/inspection/InspectionGeneralViewPage.vue'
import InspectionMeasurementsPage from 'src/pages/inspection/InspectionMeasurementsPage.vue'
import InspectionPage from 'src/pages/inspection/InspectionPage.vue'
import InspectionPhotoPage from 'src/pages/inspection/InspectionPhotoPage.vue'
import InspectionReportPage from 'src/pages/inspection/InspectionReportPage.vue'
import InspectionSettingsPage from 'src/pages/inspection/InspectionSettingsPage.vue'
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
        component: () => CasePage,
        name: 'case',
        props: true,
        children: [
          casePage({
            name: 'case-information',
            component: CaseInfoPage
          }),
          casePage({
            name: 'case-questions',
            component: CaseQuestionsPage
          }),
          {
            path: 'inspection/:inspectionId',
            component: () => InspectionPage,
            name: 'inspection',
            props: true,
            children: [
              casePage({
                name: 'inspection-photos',
                component: InspectionPhotoPage
              }),
              casePage({
                name: 'inspection-gv',
                component: InspectionGeneralViewPage
              }),
              casePage({
                name: 'inspection-measurements',
                component: InspectionMeasurementsPage
              }),   
              casePage({
                name: 'inspection-defects',
                component: InspectionDefectsPage
              }),
              casePage({
                name: 'inspection-boq',
                component: InspectionBoqPage
              }),
              casePage({
                name: 'inspection-documents',
                component: InspectionDocumentsPage
              }),
              casePage({
                name: 'inspection-report',
                component: InspectionReportPage
              }),
              casePage({
                name: 'inspection-settings',
                component: InspectionSettingsPage
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
