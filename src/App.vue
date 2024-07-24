<template>
  <router-view />
</template>

<script setup>
import { useQuasar } from "quasar";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

onMounted(() => {
  window.$q = useQuasar();
  window.$route = useRoute();
  window.$router = useRouter();
})
defineOptions({
  name: 'App'
});
</script>
