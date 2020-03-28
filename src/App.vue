<template>
<v-app id="inspire">
  <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
    <v-toolbar-title style="width: 100px" class="ml-0 pl-4">
      <span class="hidden-sm-and-down">Pintext</span>
    </v-toolbar-title>

    <v-combobox prepend-inner-icon="mdi-magnify" solo-inverted flat v-model="enteredSearch" :items="hintsListGlobal" :search-input.sync="updatingSearch" hide-selected class="hidden-sm-and-down" label="Search" persistent-hint :menu-props="menuProps"
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

    <v-menu :close-on-click="true" offset-y>
          <template v-slot:activator="{ on }">
            <v-btn
              color="primary"
              dark
              v-on="on"
            >
              {{ searchDropdownTitle }}
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(searchDropdownItem, index) in searchDropdownItems"
              :key="index"
              @click="changeSearchTextDropdown({ title: searchDropdownItem.title });"
            >
              <v-list-item-title>{{ searchDropdownItem.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

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
    <v-container class="fill-height">
      <v-row v-if="recommendedPinsGlobal.length > 0">
        <v-menu offset-y :close-on-click="true">
              <template v-slot:activator="{ on }">
                <v-btn
                  color="primary"
                  dark
                  v-on="on"
                >
                  {{ categoryDropdownTitle }}
                </v-btn>
              </template>

              <v-list>
                <v-list-item
                  v-for="(recommendedPinGlobal, index) in recommendedPinsGlobal"
                  :key="index"
                  @click="changeCategoryTextDropdown(recommendedPinGlobal);"
                >
                  <v-list-item-title>{{ recommendedPinGlobal }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
      </v-row>

      <v-row>
        <div v-for="(recommendedHintGlobal, index) in recommendedHintsGlobal"
        :key="index">
          {{ recommendedHintGlobal.title }} | {{ recommendedHintGlobal.text }} | {{ recommendedHintGlobal.badges }}
        </div>
      </v-row>

      <v-row align="center" justify="center">
        <div>
        v-model: <code>{{ updatingSearchGlobal }}</code>
        </div>
        <div>
        search: <code>{{ enteredSearchGlobal }}</code>
        </div>
        <div>
        hints: <code>{{ hintsListGlobal }}</code>
        </div>
        <div>
        recomendation pins: <code>{{ recommendedPinsGlobal }}</code>
        </div>
      </v-row>

      <v-row align="center" justify="center">
        <div>
        recomendation hints: <code>{{ recommendedHintsGlobal }}</code>
        </div>
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
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  props: {
    source: String,
  },
  data: () => ({
    menuProps: {
      closeOnContentClick: true
    },
    dialog: false,
    categoryDropdownTitle: '',
  }),
  computed: {
    ...mapState('searchGlobal', ['updatingSearchGlobal', 'enteredSearchGlobal']),
    ...mapState('hintsGlobal', ['recommendedPinsGlobal', 'recommendedHintsGlobal']),
    ...mapState('searchDropdownState', ['searchDropdownTitle', 'searchDropdownItems']),
    ...mapGetters('hintsGlobal', ['pinsListGlobal', 'hintsListGlobal']),
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
  created() {
    this.manualUpdateGetters();
  },
  methods: {
    ...mapMutations('searchGlobal', ['UPDATE_SEARCH_GLOBAL', 'SET_SEARCH_GLOBAL']),
    ...mapActions('hintsGlobal', ['manualUpdateGetters', 'findElementInHintsObject', 'pushRecomendedHints', 'filterByPin']),
    ...mapActions('searchDropdownState', ['changeSearchTextDropdown']),
    onChange() {
      this.$nextTick(() => {
        this.$refs.searchField.isMenuActive = false;
        this.findElementInHintsObject({
          enteredSearch: this.enteredSearch
        });
        this.pushRecomendedHints();
      });
    },
    changeCategoryTextDropdown(title) {
      this.categoryDropdownTitle = title;
      this.filterByPin({ pin: title });
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
