<template>
  <div class="max-w-3xl flex-col gap-4 my-5 w-full flex m-auto">
    <h1 class="text-2xl">Create new post</h1>
    <div class="flex flex-col gap-2">
      <p>Title</p>
      <input class="border rounded p-2" type="text" />
    </div>
    <div class="flex flex-col gap-2">
      <p>Description</p>
      <input class="border rounded p-2" type="text" />
    </div>
    <div class="flex flex-col gap-2">
      <p>Text</p>
      <textarea class="border rounded p-2" type="text"></textarea>
    </div>
    <editor @image-uploaded="imageUploaded" v-model="text"></editor>
    <div v-html="text"></div>
  </div>
</template>

<script lang="ts" setup>
import editor from "@/components/editor.vue";
import { ImageI } from "~~/types";
let text = ref("## Nice");

function imageUploaded(image: ImageI) {
  console.log(image);
}
</script>
<style>
.preview h2 {
  font-weight: bold;
}
</style>
