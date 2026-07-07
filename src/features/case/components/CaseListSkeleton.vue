<template>
    <q-list class="row q-gutter-y-md list shadow_custom rounded-borders" >
        <q-card style="height: 105px;" class="full-width q-mt-none" flat v-for="i in 4" :key="i">
            <div class="row justify-between">
                <div class="q-pl-md">
                    <div class="row q-mt-lg">
                        <q-skeleton size="32px" animation="fade" />
                        <q-skeleton type="text" height="40px" width="100px" animation="fade" class="q-ml-md" />
                    </div>
                    <q-skeleton type="text" width="400px" animation="fade" class="q-mt-sm" />
                </div>
                <div class="q-pt-sm">
                    <q-skeleton type="text" height="40px" width="100px" animation="fade" class="q-mt-md" />
                </div>
                <div class="q-mr-lg q-pt-sm">
                    <q-skeleton type="text" height="40px" width="100px" animation="fade" class="q-mt-md" />                    
                </div>
            </div>
        </q-card>
    </q-list>    
</template>