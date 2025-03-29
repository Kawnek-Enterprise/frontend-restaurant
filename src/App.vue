<template>
  <router-view />
</template>

<script setup>
import { useQuasar } from "quasar";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

onMounted(() => {
  const inline = (val) => val * 2;
  const another = (ann) => ({
    ann: 'asdfasdf'
  })


  console.log('inline: ', inline(2));
  console.log('another: ', another(3))
  window.$q = useQuasar();
  window.$route = useRoute();
  window.$router = useRouter();
})
defineOptions({
  name: 'App'
});
</script>
