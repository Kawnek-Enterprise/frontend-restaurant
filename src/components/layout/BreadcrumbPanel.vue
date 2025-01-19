<template>
  <q-breadcrumbs active-color="white">
    <q-breadcrumbs-el
      v-if="$route.name != 'home'"
      :to="{
        name: 'home',
      }"
      icon="home"
      label=""
    />

    <template v-if="Array.isArray($route.meta.parents)">
      <q-breadcrumbs-el
        :to="{
          name: routeItem.name
        }"
        class="cursor-pointer"
        v-for="routeItem in $route.meta.parents"
        :key="routeItem"
        :label="routeItem.title"
      />

    </template>
    <q-breadcrumbs-el
      :icon="$route.meta?.icon"
      class="cursor-pointer"
      :label="$route.meta.title"
    />
  </q-breadcrumbs>

</template>
