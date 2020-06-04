<template >
  <div style="background-color: var(--ice-blue); padding-bottom: 5px;">
    <v-layout column style="padding: 20px; background-color: white">
      <div v-if="item.message" class="mt10" style="word-break: break-all;" v-html="item.message"></div>
      <div
        v-if="item.created_time"
        class="mt10"
        style="font-size: 14px; color: #9da6af"
        v-html="item.created_time"
      ></div>
    </v-layout>
  </div>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {}
  },
  created() {},
  methods: {}
}
</script>