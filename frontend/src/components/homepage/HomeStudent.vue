<template>
  <div class="row mt-0 mt-md-4">
    <div class="col-12 col-md-4 col-lg-3 mb-4">
      <nav
        class="nav nav-pills d-flex justify-content-center"
        id="mobileNavbar"
        role="tablist"
      >
        <home-student-tabs />
      </nav>
    </div>
    <div class="col-12 col-md-8 col-lg-9 tab-content mb-5 mb-md-0">
      <div
        class="tab-pane fade"
        id="timetable-pane"
        role="tabpanel"
        tabindex="0"
      >
        <timetable />
      </div>
      <div
        class="tab-pane fade"
        id="homework-pane"
        role="tabpanel"
        tabindex="0"
      >
        <homework />
      </div>
      <div class="tab-pane fade" id="other-pane" role="tabpanel" tabindex="0">
        <div class="row justify-content-center justify-content-sm-start">
          <div class="col-8 col-sm-6 col-md-6 col-lg-4 col-xl-3">
            <div class="card card-body text-center card-shadow">
              <div class="py-5">
                <img src="@/assets/icons/paper.svg" alt="" width="80" />
              </div>
              <span>Минимумы</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Timetable from "../timetable/Timetable.vue";
import Homework from "../homework/Homework.vue";
import { onMounted, onUnmounted, ref } from "vue";
import Tab from "bootstrap/js/dist/tab";
import HomeStudentTabs from "./HomeStudentTabs.vue";
import { useRoute } from "vue-router";

let xDown: null | number = null;
let yDown: null | number = null;

function handleTouchStart(evt: TouchEvent) {
  const firstTouch = evt.touches[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
}

const handleTouchMove = (evt: TouchEvent) => {
  if (!xDown || !yDown) return;

  const xUp = evt.touches[0].clientX;
  const yUp = evt.touches[0].clientY;
  const xDiff = xDown - xUp;
  const yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    if (xDiff > 0) {
      if (currentTab.value < tabs.value.length - 1) currentTab.value++;
      setCurrentTab();
    } else {
      if (currentTab.value > 0) currentTab.value--;
      setCurrentTab();
    }
  }

  xDown = null;
  yDown = null;
};

const tabnames: { [n: string]: number } = {
  timetable: 0,
  homework: 1,
};

const tabs = ref<Array<Tab>>([]);
const currentTab = ref<number>(-1);
const route = useRoute();

onMounted(() => {
  document.addEventListener("touchstart", handleTouchStart, false);
  document.addEventListener("touchmove", handleTouchMove, false);

  const triggerTabsList = document.querySelectorAll("#mobileNavbar button");
  triggerTabsList.forEach((triggerEl) => {
    const tabTrigger = new Tab(triggerEl);
    tabs.value.push(tabTrigger);

    triggerEl.addEventListener("click", (event) => {
      event.preventDefault();
      tabTrigger.show();
    });
  });

  if (!route.query.section) {
    currentTab.value = 0;
    const q = (
      (tabs.value[currentTab.value] as any)._element as HTMLElement
    ).getAttribute("data-bs-target") as string;
    document.querySelector(q)?.classList.add("show", "active");
  } else currentTab.value = tabnames[String(route.query.section)];

  setCurrentTab();

  window.addEventListener("resize", onResize);
  onResize();
});

const onResize = () => {
  const nav = document.getElementById("mobileNavbar");
  if (!nav) return;

  const width = Math.max(
    document.documentElement["clientWidth"],
    document.body["scrollWidth"],
    document.documentElement["scrollWidth"],
    document.body["offsetWidth"],
    document.documentElement["offsetWidth"]
  );

  if (width < 768) {
    if (nav) {
      nav.classList.add("navbar", "fixed-bottom", "navbar-light");
    }
  } else {
    nav.classList.remove("navbar", "fixed-bottom", "navbar-light");
  }
};

const setCurrentTab = () => {
  if (currentTab.value < 0 && currentTab.value >= tabs.value.length) return;
  tabs.value[currentTab.value].show();
  if (document.activeElement) (document.activeElement as HTMLElement)?.blur();
};

onUnmounted(() => {
  document.removeEventListener("touchstart", handleTouchStart);
  document.removeEventListener("touchmove", handleTouchMove);
  window.removeEventListener("resize", onResize);
});
</script>

<style scoped>
.fixed-bottom {
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.178);
}
</style>
