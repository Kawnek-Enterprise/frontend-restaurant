<template>
  <template
    v-for="(routeGroup) in routes"
    :key="routeGroup.path"
  >
    <template
      v-for="currentRoute in routeGroup.children"
      :key="currentRoute.path"
    >
      <q-item
        :active="currentRoute.name == $route.name"
        :to="{
          name: currentRoute.name
        }"
        v-if="currentRoute.meta?.title && !currentRoute.meta?.parents"
        class="q-mt-sm"
        active-class="bg-primary text-white"
        style="border-radius: 1rem;"
      >
        <q-item-section
          side
          :class="currentRoute.name == $route.name ? 'text-white' : ''"
        >
          <q-icon
            :name="currentRoute.meta?.icon"
            size="sm"
          />
        </q-item-section>
        <q-item-section>
          {{ currentRoute?.meta?.title }}
        </q-item-section>
      </q-item>
    </template>
  </template>
</template>
<script setup>
import routes from 'src/router/routes';


</script>
