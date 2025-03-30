<template>
  <q-card
    class="full-width"
    style="min-width: min(400px, 100vw)"
  >
    <q-toolbar>
      <q-toolbar-title>
        Order Summary
      </q-toolbar-title>
    </q-toolbar>
    <q-separator></q-separator>
    <q-card-section class="q-pt-xl">
      <q-item
        v-for="(item, index) in menu.selectedList"
        :key="index"
      >
        <q-item-section>
          {{ item.name }}
        </q-item-section>
        <q-item-section side>
          <div class="row items-center">
            <q-btn
              round
              icon="remove"
              size="xs"
              color="primary"
              @click="() => {
                item.quantity > 1 ? item.quantity-- : item.quantity = undefined
                nextTick(() => menu.setSelectedList())
              }"
            ></q-btn>
            <div class="q-px-xs">{{ item.quantity }}</div>
            <q-btn
              round
              icon="add"
              size="xs"
              color="primary"
              @click="(ev) => {
                item.quantity ? item.quantity++ : item.quantity = 1
                nextTick(() => menu.setSelectedList())
              }"
            ></q-btn>
          </div>
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
        <div
          class="bg-dark q-pb-md"
          style="position: sticky; bottom: 0;"
        >
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
        </div>
      </template>
    </q-card-section>
  </q-card>
</template>
<script setup>
import { main, menu } from 'src/pages/main';
import AnimatedCoffee from '../elements/AnimatedCoffee.vue';
import { nextTick } from 'vue';


</script>
