<template>
  <div class="container rt-wp mt-4">
    <nav aria-label="breadcrumb" class="mb-4">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/">Главная</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="/admin">Панель администратора</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Плагины</li>
      </ol>
    </nav>

    <div v-if="plugins">
      <div class="btn btn-outline-primary mb-3">
        <i class="bi-cloud-upload me-2"></i>Сохранить
      </div>

      <plugin-card
        v-for="plugin in plugins.results"
        :plugin="plugin"
        :key="plugin.id"
        :school="school"
        @pluginStateChanged="pluginStateChanged"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { APIUser } from "@/api/services/auth";
import { APIPlugin, listPlugins } from "@/api/services/plugins";
import { APISchool } from "@/api/services/schools";
import { Paginator } from "@/api/types";
import { key } from "@/store";
import { computed, defineComponent, onMounted, ref } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { useStore } from "vuex";
import PluginCard from "./PluginCard.vue";

export default defineComponent({
  components: { PluginCard },
  setup() {
    const store = useStore(key);
    const user = computed(() => store.state.user as APIUser);
    const school = computed(() => user.value.school as APISchool);
    const isLoading = ref(true);
    const plugins = ref<Paginator<APIPlugin>>();
    const pluginsUpdates = ref<APIPlugin[]>(school.value.plugins.slice());

    onMounted(() => {
      listPlugins({ schools: school.value.id }).then((res) => {
        plugins.value = res.data;
        isLoading.value = false;
      });
    });

    const getChangesAmount = () => {
      const added = pluginsUpdates.value.filter(
        (plugin) =>
          school.value.plugins.findIndex((p) => p.id === plugin.id) === -1
      );
      const removed = school.value.plugins.filter(
        (plugin) =>
          pluginsUpdates.value.findIndex((p) => p.id === plugin.id) === -1
      );
      return added.length + removed.length;
    };

    onBeforeRouteLeave(() => {
      if (getChangesAmount() === 0) return true;
      const answer = window.confirm(
        "Вы действительно хотите выйти? Вы не сохранили изменения."
      );
      // cancel the navigation and stay on the same page
      if (!answer) return false;
    });

    const pluginStateChanged = (pluginId: number) => {
      if (!plugins.value) return;
      const index = pluginsUpdates.value.findIndex((p) => p.id === pluginId);
      if (index === -1) {
        const p = plugins.value.results.find((p) => p.id === pluginId);
        if (p) pluginsUpdates.value.push(p);
      } else {
        pluginsUpdates.value.splice(index, 1);
      }
    };

    return {
      isLoading,
      school,
      plugins,
      pluginsUpdates,
      pluginStateChanged,
    };
  },
});
</script>

<style></style>
