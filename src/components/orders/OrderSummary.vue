<template>
  <q-card
    class="full-width q-pb-xl"
    style="min-width: min(400px, 100vw)"
  >
    <q-toolbar>
      <q-toolbar-title>
        Order Summary
      </q-toolbar-title>
    </q-toolbar>
    <q-separator></q-separator>
    <q-card-section style="">
      <q-item
        v-for="(item, index) in menu.selectedList"
        :key="index"
      >
        <q-item-section>
          {{ item.name }}
        </q-item-section>
        <q-item-section side>
          {{ item.quantity }}
        </q-item-section>
      </q-item>
      <div
        v-if="!menu.selectedList?.length"
        class="text-center"
      >
        <AnimatedCoffee />
      </div>
      <template v-if="menu.selectedList?.length > 0">
        <q-separator></q-separator>
        <div style="background-color: white; padding: 2px; position: sticky; bottom: 0;">
          <q-btn
            @click="() => {
              main.openInfoDialog = true;
              main.openOrderDialog = false;
            }"
            class="full-width"
            label="confirm"
            color="primary"
          ></q-btn>
        </div>
      </template>
    </q-card-section>
  </q-card>
</template>
<script setup>
import { main, menu } from 'src/pages/main';
import AnimatedCoffee from '../elements/AnimatedCoffee.vue';


</script>
