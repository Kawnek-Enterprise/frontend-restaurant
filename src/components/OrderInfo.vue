<template>

  <q-dialog
    position="top"
    v-model="main.openInfoDialog"
  >

    <q-card class="full-width">

      <!-- <q-toolbar>
        <q-toolbar-title>
          Order Summary
        </q-toolbar-title>
      </q-toolbar>
      <q-separator></q-separator> -->
      <q-card-section style="">
        <q-select
          autofocus
          label="Table"
          dense
          outlined
          :option-label="(val) => `Table ${val.number}`"
          option-value="id"
          emit-value
          map-options
          v-model="main.form.dining_table_id"
          :options="diningTable.list"
        ></q-select>
        <q-input
          dense
          outlined
          class="q-mt-md"
          v-model="main.form.name"
          type="text"
          label="Name"
        />
        <div class="full-width q-mt-md">
          <q-separator></q-separator>
        </div>
        <div class="row justify-end q-mt-md">
          <q-btn
            v-close-popup
            color="primary"
            label="confirm"
          ></q-btn>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { diningTable, main, menu } from "src/pages/main";
</script>
