<template>
  <div v-if="!pluginActive" class="text-center">
    <img src="@/assets/icons/plugin.svg" alt="" class="mt-5 mb-3" width="80" />
    <div>Плагин отключен</div>
  </div>
  <div v-else>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { DiaryPlugins, pluginEnabled } from "@/utils/plugins";
import { computed } from "vue";

interface Props {
  plugin: DiaryPlugins;
}

const props = defineProps<Props>();

const pluginActive = computed(() => pluginEnabled(props.plugin));
</script>

<style></style>
