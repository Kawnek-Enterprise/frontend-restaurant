<template>
  <q-dialog
    position="bottom"
    v-model="main.openOrderDialog"
  >

    <q-card class="full-width">
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
        <q-separator></q-separator>
        <div style="background-color: white; padding: 2px; position: sticky; bottom: 0;">
          <q-btn
            @click="main.onClickConfirm"
            class="full-width"
            label="confirm"
            color="primary"
          ></q-btn>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { main, menu } from "src/pages/main";
</script>
