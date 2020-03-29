<template>
<v-card class="mx-auto my-2" max-width="344" outlined>
  <v-list-item three-line>
    <v-list-item-content>
      <v-list-item-title class="headline mb-1">{{ object.title }}</v-list-item-title>
      <v-list-item-subtitle>{{ object.text }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>

  <v-card-actions v-if="isSavingPin">
    <v-btn icon @click="clickedBookmark();" v-bind:class="{ 'active-bookmark': !object.bookmarked }">
                <v-icon>mdi-bookmark</v-icon>
    </v-btn>
  </v-card-actions>

  <div class="badges px-4 pr-4">
    <v-chip class="ma-2" v-for="(badge, index) in object.badges" :key="index">
      {{ badge }}
    </v-chip>
  </div>

  <v-snackbar v-if="isSavingPin"
      v-model="snackbar"
      :timeout="timeout"
    >
      {{ object.bookmarked ? 'Пинтекст успешно добавлен. Вы можете увидеть его во вкладке "Сохраненные пинтексты".' : 'Пинтекст удален из закладок.'}}
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
import { mapMutations, mapActions } from 'vuex';

export default {
  props: {
    object: {
      type: Object,
      default() {
        return {}
      }
    },
    isSavingPin: {
      type: Boolean,
      default () {
        return false
      }
    },
  },
  data: () => ({
      snackbar: false,
      timeout: 2000,
      snackbarText: ''
  }),
  methods: {
    ...mapMutations('hintsGlobal', ['SET_BOOKMARK_STATE']),
    ...mapMutations('hintsUserSaved', ['APPEND_HINTS_OBJECT_USER_SAVED', 'SPLICE_HINTS_OBJECT_USER_SAVED']),
    ...mapActions('hintsUserSaved', ['manualUpdateGettersUserSaved']),
    clickedBookmark() {
      this.snackbar = true;
      if (this.object.bookmarked) {
        this.SPLICE_HINTS_OBJECT_USER_SAVED(this.object);
        this.SET_BOOKMARK_STATE({
          object: this.object,
          boolean: false
        });
      } else {
        this.APPEND_HINTS_OBJECT_USER_SAVED(this.object);
        this.SET_BOOKMARK_STATE({
          object: this.object,
          boolean: true
        });
      }
    }
  }
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
.active-bookmark {
  opacity: 0.4;
}
</style>
