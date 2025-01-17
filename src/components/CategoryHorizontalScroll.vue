<template>
  <div class="row q-col-gutter-sm items-center">
    <div
      class="col-auto q-pb-sm"
      v-if="$q.screen.gt.sm"
    >
      <q-btn
        icon="arrow_back"
        flat
        round
        dense
        @click="categories.onClickScrollCategory($refs, false)"
      />
    </div>
    <div
      class="col-grow q-pa-sm"
      id="scrollAreaContainer"
    >

      <q-scroll-area
        id="categoryScroll"
        ref="categoryScroll"
        style="height: 36px; width: 100%; border-radius: 1rem;"
        horizontal-bar-style="opacity: 0"
        :horizontal-thumb-style="{
          opacity: 0
        }"
      >
        <div
          class="row no-wrap q-col-gutter-sm "
          style="z-index: 2;"
        >

          <div
            v-for="(category) in categories.data?.data"
            :key="category.id"
          >
            <q-chip
              @click="$nextTick(() => {
                categories.onClickCategory(category.id, category.selected)
              })"
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
    <div
      class="col-auto q-pb-sm"
      v-if="$q.screen.gt.sm"
    >
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
  const scrollAreaContainer = document.getElementById('scrollAreaContainer')
  const scrollArea = document.getElementById("categoryScroll").firstChild;
  scrollAreaContainer.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    scrollArea.scrollLeft += evt.deltaY;
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
