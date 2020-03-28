<template>
<v-card class="mx-auto my-2" max-width="344" outlined>
  <v-list-item three-line>
    <v-list-item-content>
      <v-list-item-title class="headline mb-1">{{ title }}</v-list-item-title>
      <v-list-item-subtitle>{{ text }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>

  <v-card-actions v-if="isSavingPin">
    <v-btn text @click="snackbar = true">Save</v-btn>
  </v-card-actions>

  <div class="badges px-4 pr-4">
    <v-chip class="ma-2" v-for="(badge, index) in badges" :key="index">
      {{ badge }}
    </v-chip>
  </div>

  <v-snackbar v-if="isSavingPin"
      v-model="snackbar"
      :timeout="timeout"
    >
      Пинтекст успешно добавлен. Вы можете увидеть его во вкладке "Сохраненные пинтексты".
      <v-btn
        color="blue"
        text
        @click="snackbar = false"
      >
        Закрыть
      </v-btn>
    </v-snackbar>
</v-card>
</template>

<script>
export default {
  props: {
    badges: {
      type: Array,
      default () {
        return []
      }
    },
    title: {
      type: String,
      default () {
        return ''
      }
    },
    text: {
      type: String,
      default () {
        return ''
      }
    },
    isSavingPin: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data: () => ({
      snackbar: false,
      timeout: 2000,
  }),
}
</script>

<style lang="scss" scoped>
.badges {
  height: 6rem !important;
  overflow: auto;
}
::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 7px;
}
::-webkit-scrollbar-thumb {
  border-radius: 4px;
  height: 3rem !important;
  background-color: rgba(0, 0, 0, .5);
  -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, .5);
}
</style>
