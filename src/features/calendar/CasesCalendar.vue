<template>
  <div>
    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useCasesStore } from 'src/features/case/stores/case-store'
import type { Case } from 'src/features/case/stores/types'

const BG_COLORS = {
  OPEN: '#eee',
  IN_PROGRESS: '#bce7fd',
  DONE: '#74d3ae',
}

const caseStore = useCasesStore()
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

const calendarEvents = computed(() => {
  if (!caseStore.cases) return []
  const result = []
  for (let i = 0; i < caseStore.cases.length; i++) {
    const item = caseStore.cases[i]
    if (!item) continue
    result.push({
      id: `expertise_${item.id!}`,
      start: new Date(item.inspectionStartAt ? item.inspectionStartAt : item.deadline),
      end: new Date(item.deadline),
      allDay: true,
      title: item.number,
      rawData: item,
      color: getBgColor(item),
      textColor: '#000',
    })
    if (item.inspectionStartAt) {
      result.push({
        id: `inspection_${item.id!}`,
        start: new Date(item.inspectionStartAt),
        // end: new Date(item.inspectionStartAt),
        title: `Осмотр. ${item.number}`,
        allDay: true,
        display: 'list-item',
        rawData: item,
      })
    }
  }
  return result
})

const calendarOptions = computed(() => {
  return {
    locale: 'ru',
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
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    events: calendarEvents.value,
  }
})
</script>

<style scoped></style>
