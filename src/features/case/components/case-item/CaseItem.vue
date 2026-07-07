<template>
  <q-item class="case-item q-pa-none column full-width" clickable @click="selectCase">
    <q-card flat class="full-width">
      <!-- Шапка карточки -->
      <div class="row gap-md items-center q-pa-md case-item__head">
        <!-- Статус -->
        <q-avatar
          :class="statusStyle.class"
          class="rounded-borders case-item__status"
          size="34px"
          :icon="statusStyle.icon"
        />

        <!-- Номер + приоритет -->
        <div class="col column no-wrap justify-center case-item__title-block">
          <q-item-label class="list_title text-weight-medium text-accent row no-wrap items-center" style="gap: 6px">
            <span class="case-item__number ellipsis">{{ props.case.number }}</span>
            <q-chip
              v-if="props.case.priority === 'HIGH'"
              outline
              square
              color="negative"
              class="badge"
              size="xs"
            >
              срочный
            </q-chip>
          </q-item-label>
        </div>

        <!-- Этапы -->
        <div class="row no-wrap items-center case-item__stages">
          <q-avatar square size="md" :class="inspectionStageStyle" icon="photo_camera">
            <q-tooltip>Осмотр</q-tooltip>
          </q-avatar>
          <q-avatar square size="md" :class="generalViewStageStyle" icon="image">
            <q-tooltip>Отчёт по общим видам</q-tooltip>
          </q-avatar>
          <q-avatar square size="md" :class="defectStageStyle" icon="home_repair_service">
            <q-tooltip>Отчёт по недостаткам</q-tooltip>
          </q-avatar>
          <q-avatar square size="md" :class="boqStageStyle" icon="currency_ruble">
            <q-tooltip>Ведомость объёма работ</q-tooltip>
          </q-avatar>
        </div>

        <!-- Мета: тип, дедлайн, срок -->
        <div class="column items-end content-end case-item__meta">
          <CaseExpertiseTypeChip :expertise-type="props.case.expertiseType" />
          <q-chip square size="sm" class="text-center q-mr-none q-mt-xs" :class="daysRemainingStyle">
            осталось {{ daysRemaining }} дн.
          </q-chip>
          <div class="text-grey-6 text-caption text-no-wrap q-mt-xs row items-center">
            <q-icon name="event" color="accent" size="14px" class="q-mr-xs" />
            {{ deadline.format('DD-MM-YYYY') }}
          </div>
        </div>
      </div>

      <!-- Адрес + кнопка раскрытия -->
      <div class="row items-center case-address">
        <q-icon name="location_on" color="accent" size="16px" class="q-mr-sm" />
        <span class="text-grey-7 text-caption ellipsis">{{ props.case.facilityAddress }}</span>
        <q-space />
        <q-btn
          flat
          round
          dense
          color="grey-7"
          size="sm"
          :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click.stop="expanded = !expanded"
        >
          <q-tooltip>{{ expanded ? 'Свернуть' : 'Подробнее' }}</q-tooltip>
        </q-btn>
      </div>

      <!-- Расширенная информация -->
      <q-slide-transition>
        <div v-show="expanded">
          <q-separator />
          <CaseItemInfo :case="props.case" />
        </div>
      </q-slide-transition>
    </q-card>
  </q-item>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import CaseItemInfo from 'src/features/case/components/case-item/CaseItemInfo.vue'
import { Case } from 'src/features/case/stores/types'
import dayjs from 'dayjs'
import CaseExpertiseTypeChip from './CaseExpertiseTypeChip.vue'

const expanded = ref(false)

const props = defineProps<{
  case: Case
}>()

const emits = defineEmits<{
  select: []
}>()

const selectCase = () => {
  emits('select')
}

const deadline = computed(() => dayjs(props.case.deadline))
const daysRemaining = computed(() => deadline.value.diff(dayjs(), 'day'))

const stageIconStyle = (completed: () => boolean) => {
  return completed() ? 'text-secondary' : 'text-grey-5'
}

const inspectionStageStyle = computed(() => stageIconStyle(() => props.case.stages.inspection))
const generalViewStageStyle = stageIconStyle(() => props.case.stages.generalView)
const defectStageStyle = stageIconStyle(() => props.case.stages.defect)
const boqStageStyle = stageIconStyle(() => props.case.stages.workVolume)

const daysRemainingStyle = computed(() => {
  if (daysRemaining.value < 3) {
    return 'bg-red-1 text-negative'
  }
  return 'bg-grey-2 text-grey-8'
})

const computeStatusStyle = () => {
  switch (props.case.status) {
    case 'OPEN':
      return { icon: 'more_horiz', class: 'bg-blue-1 text-blue' }
    case 'IN_PROGRESS':
      return { icon: 'hourglass_empty', class: 'bg-orange-1 text-warning' }
    case 'DONE':
      return { icon: 'check', class: 'bg-green-1 text-positive' }
  }
}

const statusStyle = computed(() => computeStatusStyle())
</script>

<style lang="scss" scoped>
.case-item {
  border-bottom: 1px solid #e8e8ef;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: #f7f7fc;
  }

  &__status {
    flex-shrink: 0;
  }

  &__title-block {
    min-width: 0;
  }

  &__number {
    max-width: 100%;
  }

  &__stages {
    gap: 2px;
    flex-shrink: 0;
  }

  &__meta {
    flex-shrink: 0;
  }
}

.case-address {
  padding: 2px 16px 12px;
}

.badge {
  flex-shrink: 0;
  margin: 0 0 0 8px;
  border-radius: 3px !important;
}

.gap-md {
  gap: 16px;
}
</style>
