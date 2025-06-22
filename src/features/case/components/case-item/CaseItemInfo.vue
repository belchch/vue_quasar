<template>
  <q-list class="q-py-md q-px-lg text-body2 info-list">
    <q-item class="no-border row items-center">
      <q-icon name="person" class="text-accent  q-pr-sm" />
      <span class="text-grey-7 text-caption  q-pr-xs">Автор:</span>
      <span class="text-grey-7 text-caption">{{ props.case.createdBy? userName(props.case.createdBy) : '' }}</span>
    </q-item>
    <q-item class="no-border row items-center">
      <q-icon name="calendar_today" class="text-accent  q-pr-sm" />
      <span class="text-grey-7 text-caption  q-pr-xs">Дата создания:</span>
      <span class="text-grey-7 text-caption">{{ createdAt }}</span>
    </q-item>
    <q-item class="no-border row items-center">
      <q-icon name="work_outline" class="text-accent   q-pr-sm" />
      <span class="text-grey-7 text-caption  q-pr-xs">Компания:</span>
      <span class="text-grey-7 text-caption">{{ props.case.company.name }}</span>
    </q-item>
    <q-item class="no-border row items-center">
      <q-icon name="location_on" class="text-accent q-pr-sm" />
      <span class="text-grey-7 text-caption  q-pr-xs">Адрес:</span>
      <span class="text-grey-7 text-caption">{{ props.case.facilityAddress }}</span>
    </q-item>
    <q-item class="no-border row items-center">
      <q-icon name="account_balance" class="text-accent q-pr-sm" />
      <span class="text-grey-7 text-caption  q-pr-xs">Суд:</span>
      <span class="text-grey-7 text-caption">{{ props.case.court?.name }}</span>
    </q-item>
    <q-item class="no-border row items-center">
      <q-icon name="gavel" class="text-accent q-pr-sm" />
      <span class="text-grey-7 text-caption  q-pr-xs">Судья:</span>
      <span class="text-grey-7 text-caption">{{ props.case.judge? judgeName(props.case.judge) : '' }}</span>
    </q-item>
  </q-list>
</template>
<script setup lang="ts">
import { Case } from 'src/features/case/stores/types'
import { computed } from 'vue'
import dayjs from 'dayjs'
import { judgeName } from 'src/features/lookup/judge/stores/types'
import { userName } from 'src/features/user/api/types';
const props = defineProps<{
  case: Case
}>()
const createdAt = computed(() => dayjs(props.case.createdAt).format('DD-MM-YYYY'))
</script>
