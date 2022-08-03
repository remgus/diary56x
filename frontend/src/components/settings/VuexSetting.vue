<script lang="ts" setup>
import { useStore } from "@/store";
import {
  SettingsState,
  SettingsActionTypes,
} from "@/store/modules/settings/types";

import { computed } from "vue";
import { SettingOptions } from "./types";

interface Props {
  options: SettingOptions;
}

const props = defineProps<Props>();
const store = useStore();

const handleValueChange = (e: Event) => {
  const el = e.target as HTMLInputElement;
  if (props.options.type === "checkbox" || props.options.type === "switch") {
    changeSetting(
      props.options.values ? props.options.values(el.checked) : el.checked
    );
  }
};

const changeSetting = <K extends keyof SettingsState>(
  value: SettingsState[K]
) => {
  store.dispatch(SettingsActionTypes.SET_SETTING, {
    option: props.options.name,
    value,
  });
};

const storeValue = computed(() => store.state.settings[props.options.name]);
</script>

<template>
  <div class="vuex-setting row align-items-center">
    <div class="col-9 col-sm-10 me-auto" :class="{ 'text-muted': options.disabled }">
      <label :for="options.name">
        {{ options.label }}
      </label>
      <div v-if="options.help" class="form-text">{{ options.help }}</div>
    </div>
    <div class="col-auto">
      <div
        :class="{
          'form-switch': options.type === 'switch',
          'form-check':
            options.type === 'switch' || options.type === 'checkbox',
        }"
      >
        <input
          v-if="options.type === 'checkbox' || options.type === 'switch'"
          class="form-check-input"
          type="checkbox"
          :role="options.type"
          :name="options.name"
          :id="options.name"
          @change="handleValueChange"
          :disabled="options.disabled"
          :checked="
            options.checkedCondition
              ? options.checkedCondition(storeValue)
              : Boolean(storeValue)
          "
        />
        <input
          v-if="options.type === 'numrange'"
          type="number"
          class="form-control"
          :min="options.min"
          :max="options.max"
          @change="handleValueChange"
          :value="storeValue"
        />
      </div>
    </div>
  </div>
</template>
