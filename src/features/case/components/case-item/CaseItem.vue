<template>
  <q-item class="q-pa-none column full-width q-ma-none" clickable @click="selectCase">
    <q-card flat class="full-width q-pa-none">
      <!-- no-wrap -->
      <q-card-section class="row gap-md q-pt-md q-pl-md q-pr-md q-pb-none">
        <q-card-section class="q-pa-none justify-center column">
          <q-card flat bordered>
            <q-avatar
              :class="statusStyle.class"
              class="rounded-borders"
              size="30px"
              :icon="statusStyle.icon"
              style="color: #757575"
            />
          </q-card>
        </q-card-section>
        <q-card-section class="col-xs-grow col-4 q-pa-none column justify-center">
          <q-item-label
            class="list_title text-weight-medium text-accent row no-wrap"
            style="gap: 4px"
            >{{ props.case.number }}
            <q-chip
              v-if="props.case.priority == 'HIGH'"
              outline
              square
              color="negative"
              class="badge"
              size="xs"
            >
              cрочный
            </q-chip>
          </q-item-label>
        </q-card-section>
        <!-- full-width -->
        <q-card-section class="q-pa-none column justify-center">
          <div class="row q-px-xs-none q-px-sm-sm q-px-md-md q-px-lg-lg no-wrap justify-center">
            <q-avatar square size="md" :class="inspectionStageStyle" icon="photo_camera">
              <q-tooltip>Осмотр</q-tooltip>
            </q-avatar>
            <q-avatar square size="md" :class="generalViewStageStyle" icon="image">
              <q-tooltip>Отчет по общим видам</q-tooltip>
            </q-avatar>
            <q-avatar
              square
              size="md"
              :class="defectStageStyle"
              icon="home_repair_service"
              style=""
            >
              <q-tooltip>Отчет по недостаткам</q-tooltip>
            </q-avatar>
            <q-avatar square size="md" :class="boqStageStyle" icon="currency_ruble" style="">
              <q-tooltip>Ведомость объема работ</q-tooltip>
            </q-avatar>
          </div>
        </q-card-section>
        <q-card-section
          class="q-pa-none column-sm row-xs justify-center items-center col-sm col-md col-lg col-xl col-xs-12 content-sm-end justify-xs-between items-md-end"
        >
          <CaseExpertiseTypeChip :expertise-type="props.case.expertiseType" />
          <q-chip square size="sm" class="text-center q-mr-none" :class="daysRemainingStyle">
            осталось {{ daysRemaining }} дней
          </q-chip>
          <div class="text-grey-7 text-caption text-no-wrap q-mt-xs text-left row items-center">
            <q-icon name="event" color="accent" class="q-mr-xs" />
            {{ deadline.format('DD-MM-YYYY') }}
          </div>
        </q-card-section>
      </q-card-section>
      <q-card-section class="no-border row items-center case-address">
        <q-icon name="location_on" class="text-accent q-pr-sm" />
        <span class="text-grey-7 text-caption q-pr-xs">Адрес:</span>
        <span class="text-grey-7 text-caption">{{ props.case.facilityAddress }}</span>
        <q-btn
          color="grey absolute-bottom-right "
          round2
          flat
          dense
          size="md"
          :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click.stop="expanded = !expanded"
        />
      </q-card-section>
      <q-card-section class="q-pa-none">
        <q-slide-transition>
          <div v-show="expanded">
            <q-separator />
            <CaseItemInfo :case="props.case" />
          </div>
        </q-slide-transition>
      </q-card-section>
    </q-card>
  </q-item>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import CaseItemInfo from 'src/features/case/components/case-item/CaseItemInfo.vue'
import { Case, ExpertiseTypeEnum } from 'src/features/case/stores/types'
import dayjs from 'dayjs'
import _ from 'lodash'
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
  if (completed()) {
    return 'text-secondary'
  } else {
    return 'text-grey-5'
  }
}

const inspectionStageStyle = computed(() => stageIconStyle(() => props.case.stages.inspection))
const generalViewStageStyle = stageIconStyle(() => props.case.stages.generalView)
const defectStageStyle = stageIconStyle(() => props.case.stages.defect)
const boqStageStyle = stageIconStyle(() => props.case.stages.workVolume)

const daysRemainingStyle = computed(() => {
  if (daysRemaining.value < 3) {
    return 'bg-red-1'
  }
  return 'bg-gray-2'
})

const computeStatusStyle = () => {
  switch (props.case.status) {
    case 'OPEN':
      return {
        icon: 'more_horiz',
        class: 'bg-white text-blue',
      }
    case 'IN_PROGRESS':
      return {
        icon: 'hourglass_empty',
        class: 'bg-white text-y',
      }
    case 'DONE':
      return {
        icon: 'check',
        class: 'bg-white text-green',
      }
  }
}

const statusStyle = computed(() => computeStatusStyle())
</script>

<style lang="scss" scoped>
.pending {
  &-avatar {
    background-color: rgb(255, 239, 226);
    color: var(--q-warning);
  }
}

.case-address {
  padding-top: 4px;
  padding-bottom: 12px;
}

.q-item {
  border-bottom: 1px solid #e0e0e0;
}

.check {
  &-avatar {
    background-color: rgb(201, 247, 205);
    color: var(--q-positive);
  }
}

.close {
  &-avatar {
    background-color: rgb(253, 204, 204);
    color: var(--q-negative);
  }
}

.icons-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  .q-icon {
    &.active {
      color: var(--q-positive);
    }
  }
}

.info-list {
  .q-item {
    min-height: 10px;
  }
}

.gap-md {
  gap: 16px;
}

.badge {
  // position: absolute;
  // top: -8px;
  // right: -5px;
  // align-self: center;
  flex-shrink: 0;
  margin: 0 0 0 14px;
  border-radius: 3px !important;
  border: 1px solid currentColor !important;
  // padding: 4px 10px;
  // font-size: 14px;
}
</style>
