<template>
  <q-card-section v-if="localCase">
    <q-form class="q-gutter-sm" @submit="handleSave">
      <div class="row q-col-gutter-lg">
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
          <FormList
            :disable-permission="!hasPermission(['case.update.manager'])"
            label="Менеджер"
            v-model="localCase.manager"
            :options="managerOptions"
            option-label="label"
            option-value="value"
            emit-value
            map-options
          />
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
          <FormList
            :disable-permission="!hasPermission(['case.update.head'])"
            label="Руководитель"
            v-model="localCase.head"
            :options="headOptions"
            option-label="label"
            option-value="value"
            emit-value
            map-options
          />
        </div>
      </div>
      <div class="row q-col-gutter-lg q-mt-auto">
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
          <FormList
            :disable-permission="!hasPermission(['case.update.expert'])"
            label="Осмотрщик"
            v-model="localCase.inspector"
            :options="inspectorOptions"
            option-label="label"
            option-value="value"
            emit-value
            map-options
          />
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
          <FormList
            :disable-permission="!hasPermission(['case.update.expert'])"
            label="Эксперты"
            :multiple="true"
            v-model="localCase.experts"
            :options="expertOptions"
            option-label="label"
            option-value="value"
            emit-value
            map-options
          />
        </div>
      </div>
      <div class="row justify-between items-end q-ml-none q-mt-lg">
        <div>
          <q-btn label="Сохранить" type="submit" color="primary" />
          <q-btn label="Отмена" @click="resetForm" color="primary" flat class="q-ml-sm" />
        </div>
      </div>
    </q-form>
  </q-card-section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useUserStore } from 'src/features/user/stores/user-store'
import FormList from './FormList.vue'
import { Case } from 'src/features/case/stores/types'
import { UserService } from 'src/features/user/api'
import { userName } from 'src/features/user/api/types'
import { User } from 'src/features/user/stores/types'

const { hasPermission } = useUserStore()

const localCase = ref<Case>()
const model = defineModel<Case>()

defineProps({
  statusOptions: Array,
})

const emit = defineEmits(['update:modelValue', 'save', 'reset'])

const handleSave = () => {
  emit('save', {
    ...localCase.value,
  })
}
const resetForm = () => {
  initLocalForm()
  emit('reset')
}

const managerOptions = ref<any[]>()
const headOptions = ref<any[]>()
const expertOptions = ref<any[]>()
const inspectorOptions = ref<any[]>()

const initLocalForm = () => {
  if (!model.value) return
  localCase.value = { ...model.value }
}
onMounted(async () => {
  initLocalForm()
  const users = (await UserService.getAllUsers()).data

  const toOptions = (u: User) => ({
    label: userName(u),
    value: u,
  })
  inspectorOptions.value = users.filter((item) => item.role == 'INSPECTOR').map(toOptions)
  managerOptions.value = users.filter((item) => item.role == 'MANAGER').map(toOptions)
  headOptions.value = users.filter((item) => item.role == 'HEAD').map(toOptions)
  expertOptions.value = users.filter((item) => item.role == 'EXPERT').map(toOptions)
})
</script>
