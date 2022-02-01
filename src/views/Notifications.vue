<template>
  <div class="container mt-4 rt-wp">
    <!-- Breadcrumb -->
    <nav aria-label="breadcrumb" class="mb-4">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/">Главная</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Уведомления</li>
      </ol>
    </nav>

    <div v-if="loading" class="text-center">
      <div class="spinner-border text-primary" role="status"></div>
    </div>
    <div v-else>
      <div v-if="notifications.length">
        <div
          class="row"
          v-for="(msg, index) in notifications"
          :key="msg.id"
          :class="{
            'mb-3': index < notifications.length - 1,
          }"
        >
          <div class="col-12">
            <div
              class="card msg-card"
              :class="{
                'text-secondary': msg.read,
              }"
              @click="selectCard(msg.id)"
              @contextmenu.prevent="showDeleteDialog(msg.id)"
            >
              <div class="card-body">
                <div v-if="!msg.read && selectedCard === msg.id" class="mb-2">
                  <div
                    class="btn btn-sm btn-outline-primary me-2"
                    @click="markAsRead(msg.id)"
                  >
                    <i class="bi-eye"></i>
                  </div>
                </div>
                <div class="mb-1 text-muted">
                  <span v-if="!msg.read" class="badge bg-success me-2"
                    >Новое</span
                  >{{ toShortDateTime(new Date(msg.created_at)) }}
                </div>
                <div class="fw-bold title" v-if="msg.title">
                  {{ msg.title }}
                </div>
                <div>{{ msg.text }}</div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="hasMore">
          <button
            class="btn btn-outline-primary btn-block"
            @click="retrieveNotifications"
          >
            Загрузить еще
          </button>
        </div>
      </div>
      <div v-else>
        <div class="text-center">
          <img
            src="@/assets/icons/cactus.svg"
            alt=""
            class="mb-3"
            id="cactus-icon"
          />
        </div>
      </div>
    </div>

    <confirm-dialog
      title="Подтверждение удаления"
      content="Вы уверены, что хотите удалить это уведомление?"
      :callback="deleteN"
      ref="confirmDialog"
    />
  </div>
</template>

<script lang="ts">
import {
  APINotification,
  listNotifications,
  markNotificationAsRead,
  deleteNotification,
} from "@/api/services/notifications";
import { key } from "@/store";
import { defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { toShortDateTime } from "@/utils/date";
import { useConfirmDialog } from "@/utils/dialog";
import { ConfirmDialog } from "@/components";

export default defineComponent({
  components: {
    ConfirmDialog,
  },
  setup() {
    const notifications = ref<APINotification[]>([]);
    const store = useStore(key);
    const lastPage = ref(1);
    const loading = ref(true);
    const hasMore = ref(true);
    const selectedCard = ref<number | null>(null);
    const notificationToDelete = ref<number | null>(null);

    const retrieveNotifications = async () => {
      if (!store.state.user) return;

      const { data } = await listNotifications({
        page: lastPage.value,
        user: store.state.user.id,
      });
      notifications.value = [...notifications.value, ...data.results];
      lastPage.value++;
      hasMore.value = Boolean(data.next);
    };

    onMounted(() => {
      retrieveNotifications().then(() => {
        loading.value = false;
      });
    });

    const deleteN = () => {
      if (!notificationToDelete.value) return;

      deleteNotification(notificationToDelete.value).then(() => {
        notifications.value = notifications.value.filter(
          (n) => n.id !== notificationToDelete.value
        );
        notificationToDelete.value = null;
      });
    };

    const selectCard = (id: number) => {
      selectedCard.value = id;
    };

    const markAsRead = (id: number) => {
      markNotificationAsRead(id).then(() => {
        const index = notifications.value.findIndex((msg) => msg.id === id);
        if (index !== -1) {
          notifications.value[index].read = true;
        }
        store.dispatch("fetchNotifications");
      });
    };

    const { showConfirmDialog, confirmDialog } = useConfirmDialog();

    const showDeleteDialog = (id: number) => {
      notificationToDelete.value = id;
      showConfirmDialog();
    };

    return {
      notifications,
      loading,
      hasMore,
      retrieveNotifications,
      toShortDateTime,
      selectedCard,
      selectCard,
      markAsRead,
      deleteN,
      confirmDialog,
      showDeleteDialog,
    };
  },
});
</script>

<style>
.msg-card:hover {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 1.1rem;
}
</style>
