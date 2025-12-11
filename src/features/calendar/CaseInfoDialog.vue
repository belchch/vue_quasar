<template>
  <q-dialog v-model="open">
    <q-card style="width: 100%; max-width: 600px">
      <q-card-section class="row items-center">
        <div class="text-h6">Информация</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="row justify-between">
          <div class="text-subtitle1">Дело (договор): {{ props.case?.number }}</div>
          <div>
            <CaseExpertiseTypeChip :expertise-type="props.case!.expertiseType" />
          </div>
        </div>
        <CaseItemInfo :case="props.case!" style="padding-left: 0" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Закрыть" v-close-popup />
        <q-btn
          flat
          label="Открыть"
          color="primary"
          @click="openCase"
          icon-right="open_in_browser"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Case } from 'src/features/case/stores/types'
import CaseItemInfo from 'src/features/case/components/case-item/CaseItemInfo.vue'
import CaseExpertiseTypeChip from '../case/components/case-item/CaseExpertiseTypeChip.vue'
const router = useRouter()
const open = defineModel<boolean>({ default: false })

const props = defineProps<{
  case: Case | undefined
}>()
const openCase = async () => {
  if (!props.case) return
  await router.push({
    name: 'case-information',
    params: { caseId: props.case.id! },
  })
}
</script>

<style scoped></style>
