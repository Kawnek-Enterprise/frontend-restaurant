<template>
  <div class="row q-col-gutter-md">
    <template
      v-for="menuItem in menu.filteredMenuItemList"
      :key="menuItem.id"
    >
      <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
        <q-card
          flat
          bordered
          class="full-height overflow-hidden"
          :style="menuItem.is_available ? '' : ';'"
          style="position: relative;"
        >
          <div
            v-if="!menuItem.is_available"
            class="absolute fit  flex flex-center"
            style="z-index: 2; background-color: rgba(0, 0, 0, 0.7); width: 100%; height: 100%; top: 0; left: 0; "
            :style="main.grid ? 'font-size:  xx-large' : ''"
          >
            <div
              class="text-red"
              style="transform: rotate(-40deg);  font-family: 'Courier New', Courier, monospace;cursor: default"
            >
              NOT AVAILABLE</div>
          </div>
          <q-card-section
            class="q-pa-sm"
            v-show="main.grid"
          >
            <q-img
              @click="() => {
                console.log('dfdf');
                menu.selectedItem = menuItem;
                $nextTick(
                  () => menu.showDetailDialog = true
                )
              }"
              no-spinner
              style="border-radius: 1rem;"
              ratio="2"
              fit="contain"
              :src="`${srvUrl}${menuItem.image_path}`"
            >
              <template v-slot:loading>
                Loading image..
              </template>
              <template #error>
                <q-img
                  style="border-radius: 1rem;"
                  ratio="2"
                  fit="contain"
                  :src="`${menuItem.image_path}`"
                >
                </q-img>
              </template>
            </q-img>
          </q-card-section>
          <q-card-section>
            <div class="row justify-between items-center">
              <div style="font-size: 17px;">
                {{ menuItem.name }}
              </div>
              <div v-if="main.grid">
                ₹{{ menuItem.price }}
              </div>
            </div>

            <div class="row items-center">
              <div
                v-if="!main.grid"
                class="col q-pt-sm"
              >
                <div>
                  ₹{{ menuItem.price }}
                </div>
              </div>
              <div class="col q-pt-sm row q-col-gutter-xs items-center no-wrap">

                <div class="col">
                  <q-input
                    @update:model-value="nextTick(() => menu.setSelectedList())"
                    class=" quantity"
                    :disable="!menuItem.is_available"
                    dense
                    v-model="menuItem.quantity"
                  ></q-input>
                </div>
                <!-- <div>
                  <q-btn
                    class="text-non-selectable q-px-md"
                    dense
                    outline
                    size="sm"
                    color="primary"
                    icon="remove"
                    @click="() => {
                      menuItem.quantity > 1 ? menuItem.quantity-- : menuItem.quantity = undefined
                      nextTick(() => menu.setSelectedList())
                      animateSummaryButton()
                    }"
                  ></q-btn>
                </div> -->
                <div class="column q-col-gutter-xs">
                  <div>

                    <q-btn
                      class="text-non-selectable q-px-md"
                      size="sm"
                      :disable="!menuItem.is_available"
                      dense
                      outline
                      color="primary"
                      icon="add"
                      @click="(ev) => {
                        menuItem.quantity ? menuItem.quantity++ : menuItem.quantity = 1
                        animateSummaryButton();
                        nextTick(() => {
                          menu.setSelectedList()
                          createFlyingDiv(ev)
                        })

                      }"
                    ></q-btn>
                  </div>
                  <div>
                    <q-btn
                      class="text-non-selectable q-px-md"
                      dense
                      outline
                      size="sm"
                      color="primary"
                      icon="remove"
                      @click="() => {
                        menuItem.quantity > 1 ? menuItem.quantity-- : menuItem.quantity = undefined
                        nextTick(() => menu.setSelectedList())
                        animateSummaryButton()
                      }"
                    ></q-btn>
                  </div>

                </div>
              </div>
            </div>

          </q-card-section>
        </q-card>
      </div>
    </template>
    <!-- <div class="fixed-bottom-right q-pr-lg q-pb-xl column q-col-gutter-sm">
      <div>

      </div>
      <div>
      </div>
    </div> -->
  </div>
  <OrderSummaryDialog />
  <DetailDialog />
  <OrderInfo />
  <FlyingImage ref="flyingImageAnimation" />
</template>

<script setup>
import { main, menu, diningTable } from "src/pages/main";
import { nextTick, onMounted, ref } from "vue";
import OrderSummaryDialog from 'src/components/orders/OrderSummaryDialog.vue'
import OrderInfo from 'src/components/OrderInfo.vue'
import FlyingImage from "src/components/menu/FlyingImage.vue";
import DetailDialog from "./menu/DetailDialog.vue";


const srvUrl = process.env.srvUrl;
const flyingImageAnimation = ref(null)

const columns = [
  {
    label: '',
    name: 'name',
    field: 'name',
  },

  {
    label: '',
    name: 'description',
    field: 'description',
  },

  {
    label: '',
    name: 'price',
    field: 'price',
  },
  {
    label: '',
  },
]

function addToBasket(event, imageSrc, imageAlt) {
  if (flyingImageAnimation.value) {
    flyingImageAnimation.value.flyToBasket(event, imageSrc, imageAlt);
  }
}
function animateSummaryButton() {
  const summaryButton = document.getElementById('summary-button');
  if (!summaryButton) return;
  summaryButton.classList.add('bounce-in')
}


function createFlyingDiv(event) {
  const summaryButton = document.getElementById('summary-button');
  if (!summaryButton) {
    return;
  }

  // --- Use viewport coordinates directly for fixed positioning ---
  const startFixedX = event.clientX;
  const startFixedY = event.clientY;
  // --- No need to add scrollX/scrollY ---

  const size = 32;
  const duration = 500; // ms
  const startTime = performance.now();

  // Create tail particles array
  const tailParticles = [];
  const numberOfParticles = 10;

  // --- Helper function to create divs (main and particle) ---
  function createDivElement(isMain, index = 0) {
    const div = document.createElement('div');
    const currentSize = isMain ? size : size * (0.8 - index * 0.07); // Progressively smaller for particles
    const zIndex = isMain ? 9999 : 9998 - index; // Stack particles under main
    const initialOpacity = isMain ? 1 : (1 - index / numberOfParticles); // Fade out particles

    div.style.opacity = 0.3
    div.style.position = 'fixed'; // Use fixed positioning
    div.style.zIndex = zIndex;
    div.style.width = `${currentSize}px`;
    div.style.height = `${currentSize}px`;
    div.classList.add('flying-div'); // Add class for potential CSS styling
    div.style.borderRadius = '50%';
    div.style.pointerEvents = 'none';
    div.style.opacity = initialOpacity;
    // Consider adding background/border via CSS '.flying-div' class instead of inline styles
    // div.style.backgroundColor = 'lightblue';
    // div.style.boxShadow = '0 0 10px rgba(173, 216, 230, 0.7)';

    // Set initial position using viewport coordinates
    div.style.left = `${startFixedX - currentSize / 2}px`;
    div.style.top = `${startFixedY - currentSize / 2}px`;

    document.body.appendChild(div);
    return { element: div, size: currentSize };
  }

  // Create main flying div
  const mainDivInfo = createDivElement(true);
  const flyingDiv = mainDivInfo.element;


  // Create tail particles
  for (let i = 0; i < numberOfParticles; i++) {
    const particleInfo = createDivElement(false, i);
    tailParticles.push({
      element: particleInfo.element,
      size: particleInfo.size,
      initialOpacity: parseFloat(particleInfo.element.style.opacity), // Store initial opacity
      delay: i * (duration / numberOfParticles) / 5 // Staggered follow delay
    });
  }

  function animate(currentTime) {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);

    // --- Recalculate target's viewport position on each frame ---
    const currentRect = summaryButton.getBoundingClientRect();
    const targetFixedX = currentRect.left + currentRect.width / 2;
    const targetFixedY = currentRect.top + currentRect.height / 2;
    // --- No need to add scrollX/scrollY ---


    // Animate main div
    // Interpolate between starting viewport coords and current target viewport coords
    const currentX = startFixedX + (targetFixedX - startFixedX) * progress;
    const currentY = startFixedY + (targetFixedY - startFixedY) * progress;

    flyingDiv.style.left = `${currentX - mainDivInfo.size / 2}px`;
    flyingDiv.style.top = `${currentY - mainDivInfo.size / 2}px`;

    // Add a subtle scale effect
    const scale = 1 - (progress * 0.2); // Slight shrink as it reaches the target
    flyingDiv.style.transform = `scale(${scale})`;

    // Animate tail particles with delay
    tailParticles.forEach((particle, index) => {
      const particleDelay = particle.delay;
      const particleElapsedTime = elapsedTime - particleDelay; // Time since this particle should start moving
      const particleProgress = Math.max(0, Math.min(particleElapsedTime / (duration - particleDelay), 1)); // Progress relative to its own start time

      if (particleProgress > 0) {
        // Interpolate between starting viewport coords and current target viewport coords
        const particleX = startFixedX + (targetFixedX - startFixedX) * particleProgress;
        const particleY = startFixedY + (targetFixedY - startFixedY) * particleProgress;

        particle.element.style.left = `${particleX - particle.size / 2}px`;
        particle.element.style.top = `${particleY - particle.size / 2}px`;

        // Fade out as they approach target (using particle's own progress)
        let currentOpacity = particle.initialOpacity;
        if (particleProgress > 0.7) {
          const fadeProgress = (particleProgress - 0.7) / 0.3;
          currentOpacity = particle.initialOpacity * (1 - fadeProgress);
        }
        particle.element.style.opacity = currentOpacity;
      }
    });

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      // Clean up
      flyingDiv.remove();
      tailParticles.forEach(particle => particle.element.remove());
    }
  }

  requestAnimationFrame(animate);
}

</script>


<style lang="scss">
.quantity {
  input {
    text-align: center;
  }
}


@keyframes bounceIn {
  0% {
    transform: scale(1);
    opacity: 1;
  }

  50% {
    transform: scale(1.2);
  }

  70% {
    transform: scale(0.9);
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.bounce-in {
  animation: bounceIn 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
}

.flying-div {
  background-color: $primary;
}
</style>
