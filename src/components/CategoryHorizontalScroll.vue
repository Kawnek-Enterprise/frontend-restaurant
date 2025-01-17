<template>
  <div class="q-pa-md row q-col-gutter-sm items-center">
    <div class="col-auto q-pb-sm">
      <q-btn
        icon="arrow_back"
        flat
        round
        dense
        @click="categories.onClickScrollCategory($refs, false)"
      />
    </div>
    <div
      class="col-grow "
      style="border-radius: 16px; overflow: hidden;"
    >

      <q-scroll-area
        id="categoryScroll"
        ref="categoryScroll"
        style="height: 50px; width: 100%;"
        :style="$q.dark.isActive ? `
  background-image:
    linear-gradient(to right, #121212, rgba(0, 128, 128, 0) 50px),
    linear-gradient(to left, #121212, rgba(0, 128, 128, 0) 50px);`: `
  background-image:
    linear-gradient(to right, #fff, rgba(0, 128, 128, 0) 50px),
    linear-gradient(to left, #fff, rgba(0, 128, 128, 0) 50px);`"
        :visible="false"
      >
        <div
          class="row no-wrap q-col-gutter-sm "
          style="z-index: 2;"
        >

          <div
            v-for="category in categories.data?.data"
            :key="category.id"
          >
            <q-chip
              style="z-index: 2;"
              clickable
              v-model:selected="category.selected"
              :class="category.selected ? 'text-white' : ''"
              :color="category.selected ? 'primary' : ''"
            >
              {{ category.name }}
            </q-chip>
          </div>
        </div>
      </q-scroll-area>
    </div>
    <div class="col-auto q-pb-sm">
      <q-btn
        icon="arrow_forward"
        flat
        round
        dense
        @click="categories.onClickScrollCategory($refs, true)"
      />
    </div>
  </div>
</template>

<script setup>
import { categories } from 'src/utils/categories';
import { onMounted } from 'vue';

onMounted(() => {
  categories.getCategories({
    pagination: {
      rowsPerPage: Number.MAX_SAFE_INTEGER
    }
  });
})


</script>
<style>
#categoryScroll:after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
