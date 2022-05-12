<template>
  <div class="py-48">
    <div class="max-w-xl flex-col gap-4 flex m-auto border rounded my-10 p-4">
      <div class="flex flex-col w-full gap-2">
        <label for="">Title</label>
        <input v-model="title" class="p-3 border rounded" type="text" />
      </div>
      <div class="flex flex-col w-full gap-2">
        <label for="">Description</label>
        <textarea
          v-model="description"
          class="p-3 border rounded"
          type="text"
        ></textarea>
      </div>
      <div class="flex flex-col w-full gap-2">
        <label for="">Text</label>
        <textarea
          v-model="body"
          class="p-3 border rounded"
          type="text"
        ></textarea>
      </div>
      <div class="flex flex-col w-full gap-2">
        <label for="">Tags</label>
        <div class="flex gap-1 flex-wrap">
          <div class="rounded border p-2" v-for="tag in tags">
            {{ tag }}
          </div>
        </div>
      </div>
      <div class="flex flex-col w-full gap-2">
        <label for="">Category</label>
        <div class="flex gap-1 flex-wrap">
          <div class="rounded border p-2" v-for="category in categories">
            {{ category }}
          </div>
        </div>
      </div>
      <input type="file" name="" @change="setFile($event)" id="" />
      <input type="file" name="" @change="setThumb($event)" id="" />
      <button class="p-3 rounded border my-2" @click="upload">Upload</button>
      <button class="p-3 rounded border my-2" @click="logout">Logout</button>
      <button class="p-3 rounded border my-2" @click="findBlog">Find</button>
    </div>
    <div class="max-w-md gap-4 flex flex-col m-auto">
      <div
        class="flex p-3 gap-2 rounded border"
        v-for="blog in blgs"
        :key="blog._id.toString()"
      >
        <div>
          <picture>
            <source :srcset="blog.thumbnail.src_webp" />
            <img class="block h-32 object-cover" :src="blog.thumbnail.src" />
          </picture>
        </div>
        <div class="flex-col flex">
          <p>
            <strong>{{ blog.title }}</strong>
          </p>
          <p>{{ blog.description }}</p>
          <button class="p-3 rounded border my-2" @click="findBlog(blog.slug)">
            Find
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Bloggy } from "@/bloggy";
import { AuthorResponseI, BlogResponseI } from "~~/types";
let router = useRouter();
let title = ref("working");
let description = ref("some description");
let body = ref("soome body text");
let tags = ref(["nice", "meat", "cars"]);
let categories = ref(["nice", "meat", "cars"]);
let isLogged = await Bloggy.isLoggedIn();
let images = ref<File[]>([]);
let thumbnail = ref();
function setFile(event: Event) {
  let target = event.target as EventTarget;
  //@ts-ignore
  images.value = [...target.files];
  console.log(target.files);
}

function setThumb() {
  let target = event.target as EventTarget;
  thumbnail.value = target.files[0];
}
Bloggy.listen((d) => {
  console.log(d);
});
function findBlog(slug: string) {
  Bloggy.getBlogBySlug(slug).then((res) => {
    console.log(res);
  });
}
function upload() {
  Bloggy.createPost({
    title: title.value,
    description: description.value,
    body: body.value,
    tags: tags.value,
    categories: categories.value,
    images: images.value,
    thumbnail: thumbnail.value,
  });
}

function logout() {
  Bloggy.logout().then(() => {
    router.push("/login");
  });
}
let blgs = ref<BlogResponseI[]>([]);
let author = ref<AuthorResponseI>();
if (isLogged) {
  let res = await Bloggy.getCurrentUser();
  author.value = res;
  let blogs = await Bloggy.getBlogsByAuthorId(author.value._id);
  blgs.value = blogs;
  console.log("you are logged");
} else {
  console.log("you are not logged in");
  router.push("/login");
}
</script>
