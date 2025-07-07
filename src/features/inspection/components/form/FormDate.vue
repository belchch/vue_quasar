<template>
  <div class="text-subtitle1 q-mb-sm">{{ title }}</div>
      <q-input dense outlined
        v-model="displayDate"
        lazy-rules
        readonly
        :disable="disabledPermission"
        :rules="[(value) => !_.isEmpty(value) || 'Обязательное поле']"
        >
          <q-btn
              :disable="disabledPermission"
              icon="event"
              flat
              no-caps
              round2
              class="bg-grey-3 text-grey-8"
              style="margin: 1px -11px"
              size="md"
          >
              <q-popup-proxy @before-show="openDatePicker" transition-show="scale" transition-hide="scale">
                  <q-date color="grey" v-model="tempDate" minimal mask="YYYY-MM-DDTHH:mm:ssZ" >
                  <div class="row items-center justify-end q-gutter-sm">
                      <q-btn label="Отмена" color="primary" flat v-close-popup />
                      <q-btn label="OK" color="primary" flat @click="applyDate" v-close-popup />
                  </div>
                  </q-date>
              </q-popup-proxy>
          </q-btn>
      </q-input>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import _ from 'lodash'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

const model = defineModel<string | undefined,number>()
const emit = defineEmits(['update:modelValue'])
const tempDate = ref('')

const { title = '', disabledPermission = false } = defineProps<{
  title: string,
  disabledPermission?: boolean
}>()

// Отображение даты в формате YYYY/MM/DD
const displayDate = computed({
  get() {
    if (!model.value) return ''
    return dayjs.utc(model.value).format('YYYY/MM/DD')
  },
  set() {} // read-only
})

// Открытие date picker и инициализация временного значения
const openDatePicker = () => {
  tempDate.value = model.value || dayjs.utc().format('YYYY-MM-DDTHH:mm:ss[Z]')
}

// Применение выбранной даты
const applyDate = () => {
  const isoDate = dayjs.utc(tempDate.value).format('YYYY-MM-DDTHH:mm:ss[Z]')
  emit('update:modelValue', isoDate)
}

</script>
