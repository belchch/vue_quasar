import { casePages } from 'src/features/case/constants/case-pages'
import { Component } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

const casePage = ({ name, component }: { name: string; component: Component }) => {
  const page = casePages[name]!

  return {
    path: page.segment,
    component,
    name,
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
        component: () => import('pages/CasePage.vue'),
        name: 'case',
        props: true,
        children: [
          casePage({
            name: 'case-information',
            component: () => import('pages/case/CaseInfoPage.vue'),
          }),
          casePage({
            name: 'case-questions',
            component: () => import('pages/case/CaseQuestionsPage.vue'),
          }),
          {
            path: 'inspection/:inspectionId',
            component: () => import('pages/inspection/InspectionPage.vue'),
            name: 'inspection',
            props: true,
            children: [
              casePage({
                name: 'inspection-photos',
                component: () => import('pages/inspection/InspectionPhotoPage.vue'),
              }),
              casePage({
                name: 'inspection-gv',
                component: () => import('pages/inspection/InspectionGeneralViewPage.vue'),
              }),
              casePage({
                name: 'inspection-measurements',
                component: () => import('pages/inspection/InspectionMeasurementsPage.vue'),
              }),
              casePage({
                name: 'inspection-defects',
                component: () => import('pages/inspection/InspectionDefectsPage.vue'),
              }),
              {
                name: 'inspection-boq',
                component: () => import('pages/inspection/boq/BoqHomePage.vue'),
                path: 'boq',
                children: [
                  casePage({
                    name: 'boq-summary',
                    component: () => import('pages/inspection/boq/BoqSummaryPage.vue'),
                  }),
                  casePage({
                    name: 'boq-configuration',
                    component: () => import('pages/inspection/boq/BoqConfigurationPage.vue'),
                  }),
                ],
              },
              casePage({
                name: 'salvageable-material',
                component: () => import('pages/inspection/SalvageablePage.vue'),
              }),
              casePage({
                name: 'inspection-documents',
                component: () => import('pages/inspection/InspectionDocumentsPage.vue'),
              }),
              casePage({
                name: 'inspection-report',
                component: () => import('pages/inspection/InspectionReportPage.vue'),
              }),
              casePage({
                name: 'inspection-settings',
                component: () => import('pages/inspection/InspectionSettingsPage.vue'),
              }),
            ],
          },
        ],
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
      {
        path: 'rates',
        component: () => import('pages/lookup/RatePage.vue'),
        name: 'lookup.rates',
      },
      {
        path: 'raw_materials',
        component: () => import('pages/lookup/RawMaterialPage.vue'),
        name: 'lookup.raw_materials',
      },
      {
        path: 'flood_damages',
        component: () => import('pages/lookup/FloodPropertyDamagePage.vue'),
        name: 'lookup.flood_damages',
      },
      {
        path: 'consumer_price_index',
        component: () => import('pages/lookup/ConsumerPriceIndexPage.vue'),
        name: 'lookup.consumer_price_index',
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
