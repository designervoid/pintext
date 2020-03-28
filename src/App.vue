<template>
<v-app id="inspire">
  <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
    <v-toolbar-title style="width: 100px" class="ml-0 pl-4">
      <span class="hidden-sm-and-down">Pintext</span>
    </v-toolbar-title>

    <v-combobox prepend-inner-icon="mdi-magnify" solo-inverted flat v-model="enteredSearch" :items="hintsList" :search-input.sync="updatingSearch" hide-selected class="hidden-sm-and-down" label="Search" persistent-hint :menu-props="menuProps"
      ref="searchField" @change="onChange()">
      <template v-slot:no-data>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              Press "enter" to search for "<strong>{{ updatingSearchGlobal }}</strong>".
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-combobox>

    <v-spacer />
    <v-btn rounded>
      <span>Главная</span>
    </v-btn>
    <v-btn icon large>
      <v-avatar size="32px" item>
        <v-img src="https://cdn.vuetifyjs.com/images/logos/logo.svg" alt="Vuetify" />
      </v-avatar>
    </v-btn>
    <span>Name</span>
  </v-app-bar>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        v-model: {{ updatingSearchGlobal }} <br />
        search: {{ enteredSearchGlobal }} <br />
        {{ hintsList }}
      </v-row>
    </v-container>
  </v-content>
  <v-btn bottom color="pink" dark fab fixed right @click="dialog = !dialog">
    <v-icon>mdi-plus</v-icon>
  </v-btn>
  <v-dialog v-model="dialog" width="800px">
    <v-card>
      <v-card-title class="grey darken-2">
        Create pintext
      </v-card-title>
      <v-container>
        <v-row class="mx-2">
          <v-col cols="12">
            <v-text-field prepend-icon="mdi-text" placeholder="Notes" />
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-spacer />
        <v-btn text color="primary" @click="dialog = false">Cancel</v-btn>
        <v-btn text @click="dialog = false">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</v-app>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
  props: {
    source: String,
  },
  data: () => ({
    menuProps: {
      closeOnContentClick: true
    },
    dialog: false,
  }),
  computed: {
    ...mapState('searchGlobal', ['updatingSearchGlobal', 'enteredSearchGlobal']),
    ...mapGetters('hints', ['pinsList', 'hintsList']),
    updatingSearch: {
      get() {
        return this.updatingSearchGlobal
      },
      set(value) {
        this.UPDATE_SEARCH_GLOBAL(value);
      }
    },
    enteredSearch: {
      get() {
        return this.enteredSearchGlobal
      },
      set(value) {
        this.SET_SEARCH_GLOBAL(value);
      }
    }
  },
  methods: {
    ...mapMutations('searchGlobal', ['UPDATE_SEARCH_GLOBAL', 'SET_SEARCH_GLOBAL']),
    onChange() {
      this.$nextTick(() => {
        this.$refs.searchField.isMenuActive = false;
      });
    }
  }
}
</script>

<style lang="scss">
.v-input__slot {
    top: 15px;
    margin: 0;
}
</style>
