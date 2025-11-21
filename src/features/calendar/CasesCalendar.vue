<template>
  <div class="row q-gutter-x-md" style="height: 100%">
    <case-info-dialog :case="selectedCase" v-model="openInfo" />
    <div>
      <q-checkbox v-model="justInspections" label="Только осмотры" color="secondary" />
      <CaseFilter style="position: unset" class="q-mt-md" />
    </div>
    <div class="col">
      <FullCalendar :options="calendarOptions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import CaseFilter from 'src/features/case/components/case-filter/CaseFilterPanel.vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useCasesStore } from 'src/features/case/stores/case-store'
import type { Case } from 'src/features/case/stores/types'
import CaseInfoDialog from './CaseInfoDialog.vue'

const BG_COLORS = {
  OPEN: '#eee',
  OPEN_HOVER: '#EAEAEA',
  IN_PROGRESS: '#bce7fd',
  IN_PROGRESS_HOVER: 'rgb(97 201 255)',
  DONE: '#74d3ae',
  DONE_HOVER: '#60CDA3',
}

const caseStore = useCasesStore()
const openInfo = ref(false)
const justInspections = ref(false)
const selectedCase = ref<Case>()
const getBgColor = (item: Case) => {
  switch (item.status) {
    case 'DONE':
      return BG_COLORS.DONE
    case 'IN_PROGRESS':
      return BG_COLORS.IN_PROGRESS
    case 'OPEN':
      return BG_COLORS.OPEN
    default:
      return `#000`
  }
  // '#ff6b6b' - красный
  // #ffc107 - желтый/оранживый
}
const getBgColorHover = (item: Case) => {
  switch (item.status) {
    case 'DONE':
      return BG_COLORS.DONE_HOVER
    case 'IN_PROGRESS':
      return BG_COLORS.IN_PROGRESS_HOVER
    case 'OPEN':
      return BG_COLORS.OPEN_HOVER
    default:
      return `#000`
  }
}

const calendarEvents = computed(() => {
  if (!caseStore.cases) return []
  const result = []
  for (let i = 0; i < caseStore.cases.length; i++) {
    const item = caseStore.cases[i]
    if (!item) continue
    if (!justInspections.value) {
      result.push({
        id: `expertise_${item.id!}`,
        start: new Date(item.createdAt ? item.createdAt : item.deadline),
        end: new Date(item.deadline),
        allDay: true,
        title: item.number,
        case: item,
        color: getBgColor(item),
        textColor: '#000',
      })
    }
    if (item.inspectionStartAt) {
      result.push({
        id: `inspection_${item.id!}`,
        start: new Date(item.inspectionStartAt),
        title: `Осмотр. ${item.number}`,
        allDay: true,
        display: 'list-item',
        case: item,
      })
    }
  }
  return result
})

const calendarOptions = computed(() => {
  return {
    locale: 'ru',
    height: '100%',
    firstDay: 1,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridDay,dayGridWeek,dayGridYear',
    },
    buttonText: {
      prev: 'Предыдущий',
      next: 'Следующий',
      today: 'Сегодня',
      month: 'Месяц',
      week: 'Неделя',
      day: 'День',
      year: 'Год',
      list: 'Список',
    },
    eventTimeFormat: {
      hour: undefined,
      minute: undefined,
      hour12: false,
    },
    eventDidMount: (info: any) => {
      info.el.addEventListener('mouseenter', () => {
        info.el.style.backgroundColor = getBgColorHover(info.event.extendedProps.case)
      })
      info.el.addEventListener('mouseleave', () => {
        info.el.style.backgroundColor = getBgColor(info.event.extendedProps.case)
      })
    },
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    events: calendarEvents.value,
    eventClick: onEventClick,
  }
})

const onEventClick = (info: any) => {
  selectedCase.value = info.event.extendedProps.case
  openInfo.value = true
}
</script>

<style scoped></style>
