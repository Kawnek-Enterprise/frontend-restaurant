<template>
  <div
    v-if="flyingImage"
    :style="flyingImageStyle"
    class="flying-image"
  >
    <img
      :src="flyingImage.src"
      :alt="flyingImage.alt"
      style="width: 64px; height: 64px;"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from 'vue';

const flyingImage = ref(null);
const flyingImageStyle = ref({});

function flyToBasket(event, imageSrc, imageAlt = 'Flying Item') {
  console.log('here')
  const basket = document.getElementById('summary-button');

  if (!basket) {
    console.error('Basket element not found.');
    return;
  }
  console.log('asdf')
  const startX = event.clientX;
  const startY = event.clientY;
  const basketRect = basket.getBoundingClientRect();
  const endX = basketRect.left + basketRect.width / 2 - 32; // Center the image
  const endY = basketRect.top + basketRect.height / 2 - 32;

  flyingImage.value = {
    src: imageSrc,
    alt: imageAlt,
  };

  flyingImageStyle.value = {
    position: 'fixed',
    left: `${startX}px`,
    top: `${startY}px`,
    transition: `left 300ms ease-out, top 300ms ease-out, opacity 300ms ease-out`,
    pointerEvents: 'none',
    zIndex: 9999, // Ensure it's on top
  };

  nextTick(() => {
    flyingImageStyle.value.left = `${endX}px`;
    flyingImageStyle.value.top = `${endY}px`;
    flyingImageStyle.value.opacity = 0;

    setTimeout(() => {
      console.log('here')
      flyingImage.value = null;
    }, 300); // Match transition duration
  });
}

defineExpose({
  flyToBasket,
});
</script>

<style scoped>
.flying-image {
  /* Add any additional styling if needed */
}
</style>
