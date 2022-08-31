<template>
  <div class="container mt-4 rt-wp">
    <!-- Breadcrumb -->
    <nav aria-label="breadcrumb" class="mb-4">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/">Главная</router-link>
        </li>
        <li class="breadcrumb-item active">Уведомления</li>
      </ol>
    </nav>

    <loading :is-loading="is_loading">
      <div v-if="notifications.length">
        <div class="mb-3">
          <tooltip title="Отметить всё как прочитанное" placement="right">
            <button class="btn btn-outline-dark btn-sm" type="button" @click="markAllAsRead">
              <i class="bi-list-check"></i>
            </button>
          </tooltip>
        </div>
        <div
          class="row"
          v-for="(msg, index) in notifications"
          :key="msg.id"
          :class="{
            'mb-3': index < notifications.length - 1,
          }"
        >
          <div class="col-12">
            <div class="card msg-card" :class="{ 'text-secondary': msg.read }">
              <div class="card-body position-relative">
                <div class="position-absolute notification-actions">
                  <i
                    v-if="!msg.read"
                    class="bi-eye text-secondary me-2"
                    @click="markAsRead(msg.id)"
                  ></i>
                  <i class="bi-x-lg text-danger" @click="showDeleteDialog(msg.id)"></i>
                </div>
                <div class="mb-1 text-muted">
                  <span v-if="!msg.read" class="badge bg-success me-2">Новое</span
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
          <button class="btn btn-outline-primary btn-block" @click="retrieveNotifications">
            Загрузить еще
          </button>
        </div>
      </div>
      <div v-else>
        <div class="text-center">
          <img :src="cactus" alt="" class="mb-3" id="cactus-icon" width="80" />
          <div class="text-muted">Уведомлений нет</div>
        </div>
      </div>
    </loading>

    <confirm-dialog
      title="Подтверждение удаления"
      content="Вы уверены, что хотите удалить это уведомление?"
      :callback="deleteN"
      ref="confirmDialog"
    />
  </div>
</template>

<script lang="ts" setup>
import {
  APINotification,
  listNotifications,
  markNotificationAsRead,
  deleteNotification,
  markAllNotificationsAsRead,
} from "@/api/services/notifications";

import { onMounted, ref } from "vue";
import { useStore } from "@/store";
import { toShortDateTime } from "@/utils/date";
import { useConfirmDialog } from "@/utils/dialog";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import Tooltip from "@/components/Tooltip.vue";
import { Loading } from "@/components";
import cactus from "@/assets/icons/cactus.svg";
import { DiaryActionTypes } from "@/store/modules/diary/types";

const notifications = ref<APINotification[]>([]);
const store = useStore();
const lastPage = ref(1);
const is_loading = ref(true);
const hasMore = ref(true);
const notificationToDelete = ref<number | null>(null);

const retrieveNotifications = async () => {
  if (!store.state.auth.user) return;

  const { data } = await listNotifications({
    page: lastPage.value,
    user: store.state.auth.user.id,
  });
  notifications.value = [...notifications.value, ...data.results];
  lastPage.value++;
  hasMore.value = Boolean(data.next);
};

onMounted(() => {
  retrieveNotifications().then(() => {
    is_loading.value = false;
  });
});

const deleteN = () => {
  if (!notificationToDelete.value) return;

  deleteNotification(notificationToDelete.value).then(() => {
    notifications.value = notifications.value.filter((n) => n.id !== notificationToDelete.value);
    notificationToDelete.value = null;
  });
};

const markAllAsRead = () => {
  markAllNotificationsAsRead().then(() => {
    notifications.value = notifications.value.map((msg) => {
      msg.read = true;
      return msg;
    });
    store.dispatch(DiaryActionTypes.FETCH_NOTIFICATIONS);
  });
};

const markAsRead = (id: number) => {
  markNotificationAsRead(id).then(() => {
    const index = notifications.value.findIndex((msg) => msg.id === id);
    if (index !== -1) {
      notifications.value[index].read = true;
    }
    store.dispatch(DiaryActionTypes.FETCH_NOTIFICATIONS);
  });
};

const { showConfirmDialog, confirmDialog } = useConfirmDialog();

const showDeleteDialog = (id: number) => {
  notificationToDelete.value = id;
  showConfirmDialog();
};
</script>

<style>
.msg-card:hover {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 1.1rem;
}

.notification-actions {
  top: 1rem;
  right: 1rem;
  cursor: pointer;
  font-size: 1.2rem;
}
</style>
