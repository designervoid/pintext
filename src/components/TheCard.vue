<template>
  <v-card
    class="mx-auto"
    max-width="344"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">{{ title }}</v-list-item-title>
        <v-list-item-subtitle>{{ text }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-actions v-if="isSavingPin">
      <v-btn text>Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default() {
        return ''
      }
    },
    text: {
      type: String,
      default() {
        return ''
      }
    },
    isSavingPin: {
      type: Boolean,
      default() {
        return false
      }
    }
  }
}
</script>
