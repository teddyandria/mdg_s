<script setup>
import { ref, onMounted } from "vue";

const timeline = [
  {
    year: "500",
    title: "Arrivée des premiers habitants",
    description:
        "Les premiers habitants de Madagascar, probablement originaires d'Asie du Sud-Est, arrivent en utilisant des pirogues traditionnelles.",
    image: require('@/assets/images/arrivee-pirogue.jpg'),
  },
  {
    year: "1500",
    title: "Influence européenne commence",
    description:
        "Les explorateurs européens, principalement portugais, commencent à visiter Madagascar.",
    image: require('@/assets/images/explorateurs.jpg'),
  },
  {
    year: "1700",
    title: "Rois et Reines Merina",
    description:
        "Début de la montée des rois et reines Merina dans les Hautes Terres, avec l'unification progressive de Madagascar.",
    image: require('@/assets/images/ravinala-roi.webp'),
  },
  {
    year: "1896",
    title: "Colonisation française",
    description:
        "Madagascar devient une colonie française après une résistance héroïque menée par la Reine Ranavalona III.",
    image: require('@/assets/images/colonisation-fr.jpg'),
  },
  {
    year: "1960",
    title: "Indépendance de Madagascar",
    description:
        "Le 26 juin 1960, Madagascar retrouve son indépendance après plusieurs années de lutte pour la souveraineté.",
    image: require('@/assets/images/independance.jpeg'),
  },
];

const observableEntries = ref([]);

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        observableEntries.value.push(entry.target.dataset.index);
        entry.target.classList.add("reveal");
      }
    });
  });

  document.querySelectorAll(".timeline-item").forEach((el, index) => {
    el.dataset.index = index;
    observer.observe(el);
  });
});
</script>

<template>
  <div class="bg-mdgBg min-h-screen flex flex-col py-24" id="timeline">
    <h1 class="text-center text-4xl font-bold uppercase text-gray-800 mb-12">
      Découvrez l'histoire de Madagascar
    </h1>

    <div class="relative w-11/12 mx-auto lg:w-9/12 xl:w-8/12">
      <div class="absolute top-0 left-1/2 transform -translate-x-[1px] h-full border-l-2 border-gray-300"></div>

      <div
          v-for="(event, index) in timeline"
          :key="index"
          class="timeline-item opacity-0 translate-y-10 transition-all duration-700 ease-out mb-20 mt-20"
      >
        <div
            class="relative flex flex-col lg:flex-row items-center gap-8 mx-auto bg-mdgWhite rounded-lg shadow-md p-6 transform transition-all"
            :class="{ 'fade-from-left': index % 2 === 0, 'fade-from-right': index % 2 !== 0 }"
        >
          <div
              class="font-playFair text-6xl md:text-8xl font-extrabold text-mdgRed tracking-wider text-opacity-30 absolute top-[-20%] left-1/2 transform -translate-x-1/2 -z-10"
          >
            {{ event.year }}
          </div>

          <div class="flex-shrink-0 w-full sm:w-64 lg:w-1/3">
            <img
                :src="event.image"
                :alt="event.title"
                class="w-full h-40 md:h-64 object-cover rounded-lg transform transition-transform duration-500 hover:scale-105"
            />
          </div>

          <div class="flex-grow w-full lg:w-2/3 flex flex-col">
            <h2 class="text-lg md:text-xl font-semibold text-gray-800">
              {{ event.title }}
            </h2>
            <p class="text-xs md:text-sm text-gray-600 mt-2 leading-relaxed">
              {{ event.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mdgRed {
  --tw-bg-opacity: 1;
  background-color: rgba(255, 0, 0, var(--tw-bg-opacity));
  color: rgba(255, 0, 0, var(--tw-bg-opacity));
}

.fade-from-left {
  transform: translateX(-20%);
}
.fade-from-right {
  transform: translateX(20%);
}
.reveal {
  opacity: 1;
  transform: translateX(0px);
}
</style>