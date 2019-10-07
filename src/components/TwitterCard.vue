<template >
  <div style="background-color: var(--ice-blue); padding-bottom: 5px;">
    <v-layout
      column
      style="padding: 20px; background-color: white"
    >
      <div v-if="item.text" class="mt10" style="word-break: break-all;" v-html="item.text"></div>
      <div v-if="item.mention" class="mt10" style="word-break: break-all;" v-html="item.mention"></div>
      <div v-if="item.created_at" class="mt10" style="font-size: 14px; color: #9da6af" v-html="item.created_at"></div>
      <div v-if="item.create_time" class="mt10" style="font-size: 14px; color: #9da6af" v-html="item.create_time"></div>
    </v-layout>
  </div>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {
    };
  },
  created() {
  },
  methods: {
  }
};
</script>