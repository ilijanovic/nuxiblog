<template>
  <div class="w-full">
    <div ref="editor"></div>
  </div>
</template>

<script lang="ts" setup>
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { ImageI } from "~~/types";

let emits = defineEmits<{
  (eventName: "update:modelValue", value: string): void;
  (eventName: "imageUploaded", value: ImageI): void;
}>();

let editor = ref<HTMLElement>();
onMounted(async () => {
  let [{ Quill }, ImageUploader] = await Promise.all([
    import("@vueup/vue-quill"),
    //@ts-ignore
    import("quill-image-uploader"),
  ]);

  Quill.register("modules/imageUploader", ImageUploader.default);

  let doc = editor.value;
  const fullToolbarOptions = [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic"],
    ["clean"],
    ["image"],
  ];
  if (!doc) return;
  let quill = new Quill(doc, {
    theme: "snow",
    modules: {
      toolbar: {
        container: fullToolbarOptions,
      },
      imageUploader: {
        async upload(file: File) {
          let formData = new FormData();
          formData.append("images", file);
          let image = await $fetch("/api/tempimage", {
            method: "POST",
            body: formData,
          });
          emits("imageUploaded", image);
          return image.src;
        },
      },
    },
  });

  quill.on("text-change", (d, o, s) => {
    emits("update:modelValue", quill.root.innerHTML);
  });
});
</script>
<style scoped>
/* Basic editor styles */
.ProseMirror,
code {
  background-color: rgba(#616161, 0.1);
  color: #616161;
}

.content {
  padding: 1rem 0 0;
}
h3 {
  margin: 1rem 0 0.5rem;
}

pre {
  border-radius: 5px;
  color: #333;
}

code {
  display: block;
  white-space: pre-wrap;
  font-size: 0.8rem;
  padding: 0.75rem 1rem;
  background-color: #e9ecef;
  color: #495057;
}
</style>
