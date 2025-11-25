<template>
  <div class="row q-gutter-x-md" style="height: 100%">
    <case-info-dialog :case="selectedCase" v-model="openInfo" />
    <div>
      <!-- <q-checkbox v-model="justInspections" label="Только осмотры" color="secondary" /> -->
      <CaseFilter style="position: unset" class="q-mt-sm" />
    </div>
    <div class="col">
      <FullCalendar :options="calendarOptions">
        <template v-slot:eventContent="arg">
          <!-- Судебный заседание -->
          <q-icon
            name="gavel"
            color="pink-14"
            class="q-pr-sm q-pl-sm"
            v-if="
              arg.event.extendedProps.eventType === EVENT_TYPE.COURT ||
              arg.event.extendedProps.eventType === EVENT_TYPE.SECOND_COURT
            "
          />
          <!-- Осмотр -->
          <q-icon
            name="visibility"
            color="blue-14"
            class="q-pr-sm q-pl-sm"
            v-if="
              arg.event.extendedProps.eventType === EVENT_TYPE.INSPECTION ||
              arg.event.extendedProps.eventType === EVENT_TYPE.SECOND_INSPECTION
            "
          />
          <b>{{ arg.event.title }} </b>
          <span
            class="q-ml-sm"
            v-if="
              arg.event.extendedProps.eventType === EVENT_TYPE.SECOND_COURT ||
              arg.event.extendedProps.eventType === EVENT_TYPE.SECOND_INSPECTION
            "
          >
            (Повторный)
          </span>
        </template>
      </FullCalendar>
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

const EVENT_TYPE = {
  INSPECTION: 'inspection',
  SECOND_INSPECTION: 'secondInspection',
  COURT: 'court',
  SECOND_COURT: 'secondCourt',
  EXPERTISE: 'expertise',
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
        id: `${EVENT_TYPE.EXPERTISE}_${item.id!}`,
        start: new Date(item.createdAt ? item.createdAt : item.deadline),
        end: new Date(item.deadline),
        allDay: true,
        title: item.number,
        color: getBgColor(item),
        textColor: '#000',
        case: item,
        eventType: EVENT_TYPE.EXPERTISE,
      })
    }
    if (item.inspectionStartAt) {
      result.push(getEvent(item, item.inspectionStartAt, EVENT_TYPE.INSPECTION))
    }
    if (item.secondInspectionDate) {
      result.push(getEvent(item, item.secondInspectionDate, EVENT_TYPE.SECOND_INSPECTION))
    }
    if (item.courtDate) {
      result.push(getEvent(item, item.courtDate, EVENT_TYPE.COURT))
    }
    if (item.secondCourtDate) {
      result.push(getEvent(item, item.secondCourtDate, EVENT_TYPE.SECOND_COURT))
    }
  }
  return result
})

const getEvent = (item: Case, eventStart: string, type: string) => {
  return {
    id: `${type}_${item.id!}`,
    start: new Date(eventStart),
    title: `${item.number}`,
    allDay: true,
    display: 'list-item',
    case: item,
    eventType: type,
  }
}

const calendarOptions = computed(() => {
  return {
    locale: 'ru',
    height: '100%',
    firstDay: 1,
    eventOrderStrict: true,
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
      info.el.style.padding = '0.25rem'
      switch (info.event.extendedProps.eventType) {
        case EVENT_TYPE.INSPECTION:
          info.el.style.backgroundColor = 'rgba(66,165,245,.2)'
          break
        case EVENT_TYPE.SECOND_INSPECTION:
          info.el.style.backgroundColor = 'rgba(66,165,245,.2)'
          info.el.style.color = 'rgb(185 0 161)'
          break
        case EVENT_TYPE.COURT:
          info.el.style.backgroundColor = 'rgba(255,112,67,.3)'
          break
        case EVENT_TYPE.SECOND_COURT:
          info.el.style.backgroundColor = 'rgba(255,112,67,.3)'
          info.el.style.color = '#C62828'
          break
      }
      // Осмотры (обычные и повторные)
      // if (info.event.extendedProps.startsWith('Осмотр')) {
      //   info.el.style.backgroundColor = '#1976D2' // синий для осмотров
      //   info.el.style.color = '#fff'
      // }
      // if (info.event.title.startsWith('Повторный осмотр')) {
      //   info.el.style.backgroundColor = '#42A5F5' // светло-синий для повторных осмотров
      //   info.el.style.color = '#fff'
      // }
      // // Визиты (обычные и повторные)
      // if (info.event.title.startsWith('Визит')) {
      //   info.el.style.backgroundColor = '#C62828' // красный для визитов
      //   info.el.style.color = '#fff'
      // }
      // if (info.event.title.startsWith('Повторный визит')) {
      //   info.el.style.backgroundColor = '#FF7043' // оранжево-красный для повторных визитов
      //   info.el.style.color = '#fff'
      // }
      // info.el.addEventListener('mouseenter', () => {
      //   info.el.style.backgroundColor = getBgColorHover(info.event.extendedProps.case)
      // })
      // info.el.addEventListener('mouseleave', () => {
      //   info.el.style.backgroundColor = getBgColor(info.event.extendedProps.case)
      // })
    },
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    events: calendarEvents.value,
    eventClick: onEventClick,
  }
})

const setHoverEvent = (info: any) => {}

const onEventClick = (info: any) => {
  selectedCase.value = info.event.extendedProps.case
  openInfo.value = true
}
</script>

<style>
.fc .fc-button-primary {
  background-color: var(--q-primary);
}
.fc .fc-button-primary:disabled {
  background-color: var(--q-primary);
}
.fc .fc-button-primary:hover {
  background-color: var(--q-primary);
  transition:
    background-color 0.3s cubic-bezier(0.25, 0.8, 0.5, 1),
    opacity 0.6s cubic-bezier(0.25, 0.8, 0.5, 1);
}
.fc .fc-button-primary:not(:disabled).fc-button-active,
.fc .fc-button-primary:not(:disabled):active {
  background-color: #673ab7;
}
</style>
