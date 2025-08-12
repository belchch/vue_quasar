export type CasePageProps = {
    segment: string,
    icon: string,
    label: string,
    rootEntity: PageRootEntity,
    parent?: string
}

export type PageRootEntity = 'INSPECTION' | 'CASE'

export const casePages: { [key: string]: CasePageProps } = {
    'case-information': {
        segment: 'information',
        icon: 'note_alt',
        label: 'Информация',
        rootEntity: 'CASE'
    },
    'case-questions': {
        segment: 'questions',
        icon: 'text_snippet',
        label: 'Вопросы',
        rootEntity: 'CASE'
    },
    'inspection-photos': {
        segment: 'photos',
        icon: 'photo_camera',
        label: 'Фото',
        rootEntity: 'INSPECTION'
    },
    'inspection-measurements': {
        segment: 'measurements',
        icon: 'square_foot',
        label: 'Размеры',
        rootEntity: 'INSPECTION'
    },
    'inspection-gv': {
        segment: 'gv',
        icon: 'landscape',
        label: 'Общие виды',
        rootEntity: 'INSPECTION'
    },
    'inspection-defects': {
        segment: 'defects',
        icon: 'home_repair_service',
        label: 'Дефекты',
        rootEntity: 'INSPECTION'
    },
    'inspection-boq': {
        segment: 'boq',
        icon: 'request_page',
        label: 'ВОР',
        rootEntity: 'INSPECTION',        
    },
    'boq-summary': {
        segment: '',
        icon: 'request_page',
        label: 'ВОР',
        rootEntity: 'INSPECTION',
        parent: 'inspection-boq'
    },
    'boq-configuration': {
        segment: ':locationId/configuration',
        icon: 'request_page',
        label: 'ВОР',
        rootEntity: 'INSPECTION',
        parent: 'inspection-boq'
    },
    'inspection-documents': {
        segment: 'documents',
        icon: 'folder_open',
        label: 'Документы',
        rootEntity: 'INSPECTION'
    },
    'inspection-report': {
        segment: 'report',
        icon: 'print',
        label: 'Общий отчет',
        rootEntity: 'INSPECTION'
    },
    'inspection-settings': {
        segment: 'settings',
        icon: 'settings',
        label: 'Конфигурация',
        rootEntity: 'INSPECTION'
    }
}