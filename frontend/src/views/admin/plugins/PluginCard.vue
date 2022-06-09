<template>
  <div class="card card-body mb-3">
    <div class="row align-items-center">
      <div class="col-auto justify-content-center px-2 px-sm-4">
        <img :src="getImage(plugin.icon)" alt="" height="70" />
      </div>
      <div class="col">
        <h4 class="fw-bold">{{ getPluginName(plugin) }}</h4>
        <div class="text-muted">
          {{ plugin.description }}
        </div>
      </div>
      <div class="col-auto justify-content-center">
        <div class="form-check form-switch d-flex justify-content-center border-start ps-5">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            :id="'plugin-switch-' + plugin.id"
            :checked="pluginEnabled"
            @change="$emit('pluginStateChanged', plugin.id)"
          />
          <label
            class="form-check-label"
            for="'plugin-switch-' + plugin.id"
          ></label>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { APIPlugin, getPluginName } from "@/api/services/plugins";
import { APISchool } from "@/api/services/schools";
import { PropType, ref } from "vue";

const props = defineProps({
  plugin: {
    type: Object as PropType<APIPlugin>,
    required: true,
  },
  school: {
    type: Object as PropType<APISchool>,
    required: true,
  },
});

const emit = defineEmits(["pluginStateChanged"]);

const pluginEnabled = ref(
  props.school.plugins.findIndex((p) => p.id === props.plugin.id) !== -1
);

const getImage = (icon: string) => {
  return icon;
};
</script>

<style></style>
