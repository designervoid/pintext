<template>
<v-app id="inspire">
  <v-app-bar :clipped-left="false" app color="blue darken-3" dark>
    <v-toolbar-title class="ml-0 pl-4" style="width: 100px;">
      <span class="hidden-sm-and-down">Pintext</span>
    </v-toolbar-title>

    <v-combobox v-if="searchDropdownTitle === 'Все пинтексты'" prepend-inner-icon="mdi-magnify" solo-inverted flat v-model="enteredSearch" :items="hintsListGlobal" :search-input.sync="updatingSearch" hide-selected class="hidden-sm-and-down"
      label="Search" persistent-hint :menu-props="menuProps" ref="searchField" @change="onChange()">
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

    <v-combobox v-if="searchDropdownTitle === 'Ваши пинтексты'" prepend-inner-icon="mdi-magnify" solo-inverted flat v-model="enteredSearch" :items="hintsListUser" :search-input.sync="updatingSearch" hide-selected class="hidden-sm-and-down"
      label="Search" persistent-hint :menu-props="menuProps" ref="searchField" @change="onChange()">
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

    <v-combobox v-if="searchDropdownTitle === 'Сохраненные пинтексты'" prepend-inner-icon="mdi-magnify" solo-inverted flat v-model="enteredSearch" :items="hintsListUserSaved" :search-input.sync="updatingSearch" hide-selected
      class="hidden-sm-and-down" label="Search" persistent-hint :menu-props="menuProps" ref="searchField" @change="onChange()">
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

    <v-menu :close-on-click="true" offset-y>
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">
          {{ searchDropdownTitle }}
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-for="(searchDropdownItem, index) in searchDropdownItems" :key="index" @click="changeSearchTextDropdown({ title: searchDropdownItem.title });">
          <v-list-item-title>{{ searchDropdownItem.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

  </v-app-bar>
  <v-content>
    <v-container class="fill-height">
      <v-row v-if="recommendedPinsGlobal.length > 0 && searchDropdownTitle === 'Все пинтексты'" align="center">
        <v-col cols="12">
          <v-menu offset-y :close-on-click="true">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark v-on="on">
                {{ categoryDropdownTitle }}
              </v-btn>
            </template>

            <v-list>
              <v-list-item v-for="(recommendedPinGlobal, index) in recommendedPinsGlobal" :key="index" @click="changeCategoryTextDropdown({ title: recommendedPinGlobal });">
                <v-list-item-title>{{ recommendedPinGlobal }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <div class="refresh-category" v-if="categoryDropdownTitle !== 'Выберите пин (категория)'" @click="refreshCategory();">
            <div class="mx-2 my-1">
              <v-btn depressed small color="error">Сбросить категорию</v-btn>
            </div>
          </div>
        </v-col>
      </v-row>

      <v-row v-if="recommendedPinsUser.length > 0 && searchDropdownTitle === 'Ваши пинтексты'" align="center">
        <v-col cols="12">
          <v-menu offset-y :close-on-click="true">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark v-on="on">
                {{ categoryDropdownTitle }}
              </v-btn>
            </template>

            <v-list>
              <v-list-item v-for="(recommendedPinUser, index) in recommendedPinsUser" :key="index" @click="changeCategoryTextDropdown({ title: recommendedPinUser });">
                <v-list-item-title>{{ recommendedPinUser }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <div class="refresh-category" v-if="categoryDropdownTitle !== 'Выберите пин (категория)'" @click="refreshCategory();">
            <div class="mx-2 my-1">
              <v-btn depressed small color="error">Сбросить категорию</v-btn>
            </div>
          </div>
        </v-col>
      </v-row>

      <v-row v-if="recommendedPinsUserSaved.length > 0 && searchDropdownTitle === 'Сохраненные пинтексты'" align="center">
        <v-col cols="12">
          <v-menu offset-y :close-on-click="true">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark v-on="on">
                {{ categoryDropdownTitle }}
              </v-btn>
            </template>

            <v-list>
              <v-list-item v-for="(recommendedPinUserSaved, index) in recommendedPinsUserSaved" :key="index" @click="changeCategoryTextDropdown({ title: recommendedPinUserSaved });">
                <v-list-item-title>{{ recommendedPinUserSaved }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <div class="refresh-category" v-if="categoryDropdownTitle !== 'Выберите пин (категория)'" @click="refreshCategory();">
            <div class="mx-2 my-1">
              <v-btn depressed small color="error">Сбросить категорию</v-btn>
            </div>
          </div>
        </v-col>
      </v-row>

      <v-row v-if="searchDropdownTitle === 'Все пинтексты'" justify="space-around" align="center">
        <div v-for="(recommendedHintGlobal, index) in recommendedHintsGlobal" :key="index">
          <TheCard :object="recommendedHintGlobal" :isSavingPin="true" />
        </div>
      </v-row>

      <v-row v-if="searchDropdownTitle === 'Ваши пинтексты'" justify="space-around" align="center">
        <div v-for="(recommendedHintUser, index) in recommendedHintsUser" :key="index">
          <TheCard :object="recommendedHintUser" />
        </div>
      </v-row>

      <v-row v-if="searchDropdownTitle === 'Сохраненные пинтексты'" justify="space-around" align="center">
        <div v-for="(recommendedHintUserSaved, index) in recommendedHintsUserSaved" :key="index">
          <TheCard :object="recommendedHintUserSaved" />
        </div>
      </v-row>

      <!-- DEBUG -->
      <!-- <v-row align="center" justify="center" v-if="searchDropdownTitle === 'Все пинтексты'">
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
        <div>
        recomendation hints: <code>{{ recommendedHintsGlobal }}</code>
        </div>
      </v-row>

      <v-row align="center" justify="center" v-if="searchDropdownTitle === 'Ваши пинтексты'">
        <div>
        v-model: <code>{{ updatingSearchGlobal }}</code>
        </div>
        <div>
        search: <code>{{ enteredSearchGlobal }}</code>
        </div>
        <div>
        hints: <code>{{ hintsListUser }}</code>
        </div>
        <div>
        recomendation pins: <code>{{ recommendedPinsUser }}</code>
        </div>
        <div>
        recomendation hints: <code>{{ recommendedHintsUser }}</code>
        </div>
      </v-row>

      <v-row align="center" justify="center" v-if="searchDropdownTitle === 'Сохраненные пинтексты'">
        <div>
        v-model: <code>{{ updatingSearchGlobal }}</code>
        </div>
        <div>
        search: <code>{{ enteredSearchGlobal }}</code>
        </div>
        <div>
        hints: <code>{{ hintsListUserSaved }}</code>
        </div>
        <div>
        recomendation pins: <code>{{ recommendedPinsUserSaved }}</code>
        </div>
        <div>
        recomendation hints: <code>{{ recommendedHintsUserSaved }}</code>
        </div>
      </v-row> -->

    </v-container>
  </v-content>
  <v-btn bottom color="pink" dark fab fixed right @click="dialog = !dialog" v-if="this.searchDropdownTitle === 'Ваши пинтексты'">
    <v-icon>mdi-plus</v-icon>
  </v-btn>
  <v-dialog v-model="dialog" width="800px">
    <v-card>
      <v-card-title class="darken-2">
        Create pintext
      </v-card-title>
      <v-container>
        <v-row class="mx-2">
          <v-col cols="12">
            <v-text-field prepend-icon="mdi-text" placeholder="Title" v-model="modal.title" />
          </v-col>
        </v-row>
        <v-row class="mx-2">
          <v-col cols="12">
            <v-text-field prepend-icon="mdi-text" placeholder="Text" v-model="modal.text" />
          </v-col>
        </v-row>
        <v-row class="mx-2">
          <v-col cols="12">
            <v-combobox v-model="modal.badges" :items="hintsListGlobal" chips clearable label="Write badges" multiple prepend-icon="mdi-text" solo>
              <template v-slot:selection="{ attrs, item, select, selected }">
                <v-chip v-bind="attrs" :input-value="selected" close @click="select" @click:close="remove(item)">
                  {{ item }}
                </v-chip>
              </template>
            </v-combobox>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-spacer />
        <v-btn text color="primary" @click="closeDialog();">Cancel</v-btn>
        <v-btn text @click="createPin();" :disabled="!modal.badges.length > 0 || !modal.title.length > 0 || !modal.text.length > 0">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</v-app>
</template>

<script>
import TheCard from '@/components/TheCard'
import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex';

export default {
  components: {
    TheCard
  },
  data: () => ({
    menuProps: {
      closeOnContentClick: true,
    },
    dialog: false,
    modal: {
      title: '',
      text: '',
      badges: [],
    }
  }),
  computed: {
    ...mapState('searchGlobal', ['updatingSearchGlobal', 'enteredSearchGlobal']),
    ...mapGetters('hintsGlobal', ['pinsListGlobal', 'hintsListGlobal']),
    ...mapState('hintsGlobal', ['recommendedPinsGlobal', 'recommendedHintsGlobal']),
    ...mapGetters('hintsUser', ['pinsListUser', 'hintsListUser']),
    ...mapState('hintsUser', ['recommendedPinsUser', 'recommendedHintsUser']),
    ...mapGetters('hintsUserSaved', ['pinsListUserSaved', 'hintsListUserSaved']),
    ...mapState('hintsUserSaved', ['recommendedPinsUserSaved', 'recommendedHintsUserSaved']),
    ...mapState('searchDropdownState', ['searchDropdownTitle', 'searchDropdownItems']),
    ...mapState('categoryDropdownState', ['categoryDropdownTitle']),
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
    if (this.searchDropdownTitle === 'Все пинтексты') {
      this.manualUpdateGettersGlobal();
    }

    if (this.searchDropdownTitle === 'Ваши пинтексты') {
      this.manualUpdateGettersUser();
    }

    if (this.searchDropdownTitle === 'Сохраненные пинтексты') {
      this.manualUpdateGettersUserSaved();
    }
  },
  methods: {
    ...mapMutations('searchGlobal', ['UPDATE_SEARCH_GLOBAL', 'SET_SEARCH_GLOBAL']),
    ...mapMutations('categoryDropdownState', ['SET_CATEGORY_DROPDOWN_TITLE']),
    ...mapActions('hintsGlobal', ['manualUpdateGettersGlobal', 'findElementInHintsObjectGlobal', 'pushRecomendedHintsGlobal', 'filterByPinGlobal', 'appendHintsObjectGlobal']),
    ...mapActions('hintsUser', ['manualUpdateGettersUser', 'findElementInHintsObjectUser', 'pushRecomendedHintsUser', 'filterByPinUser', 'appendHintsObjectUser']),
    ...mapActions('hintsUserSaved', ['manualUpdateGettersUserSaved', 'findElementInHintsObjectUserSaved', 'pushRecomendedHintsUserSaved', 'filterByPinUserSaved']),
    ...mapActions('searchDropdownState', ['changeSearchTextDropdown']),
    ...mapActions('categoryDropdownState', ['changeCategoryTextDropdown']),
    onChange() {
      this.$nextTick(() => {
        if (this.searchDropdownTitle === 'Все пинтексты' && this.enteredSearch) {
          this.$refs.searchField.isMenuActive = false;
          this.findElementInHintsObjectGlobal({
            enteredSearch: this.enteredSearch
          });
          this.pushRecomendedHintsGlobal();
        }

        if (this.searchDropdownTitle === 'Ваши пинтексты' && this.enteredSearch) {
          this.$refs.searchField.isMenuActive = false;
          this.findElementInHintsObjectUser({
            enteredSearch: this.enteredSearch
          });
          this.pushRecomendedHintsUser();
        }

        if (this.searchDropdownTitle === 'Сохраненные пинтексты' && this.enteredSearch) {
          this.$refs.searchField.isMenuActive = false;
          this.findElementInHintsObjectUserSaved({
            enteredSearch: this.enteredSearch
          });
          this.pushRecomendedHintsUserSaved();
        }
      });
    },
    refreshCategory() {
      if (this.searchDropdownTitle === 'Все пинтексты') {
        this.SET_CATEGORY_DROPDOWN_TITLE('Выберите пин (категория)');
        this.pushRecomendedHintsGlobal();
      }

      if (this.searchDropdownTitle === 'Ваши пинтексты') {
        this.SET_CATEGORY_DROPDOWN_TITLE('Выберите пин (категория)');
        this.pushRecomendedHintsUser();
      }

      if (this.searchDropdownTitle === 'Сохраненные пинтексты') {
        this.SET_CATEGORY_DROPDOWN_TITLE('Выберите пин (категория)');
        this.pushRecomendedHintsUserSaved();
      }
    },
    closeDialog() {
      this.dialog = false;
    },
    createPin() {
      this.appendHintsObjectUser({ modal: this.modal });
      this.manualUpdateGettersUser();
      this.closeDialog();
    },
    remove(item) {
      this.modal.badges.splice(this.modal.badges.indexOf(item), 1)
      this.modal.badges = [...this.modal.badges]
    },
  }
}
</script>

<style lang="scss">
.v-input__slot {
    top: 15px;
    margin: 0;
}

.refresh-category {
    align-self: center;
}
</style>
