<template>
  <div class="flex m-auto my-10 max-w-2xl">
    <div class="p-5 flex flex-col gap-4 rounded border w-full">
      <div class="flex flex-col gap-2">
        <label>Username</label>
        <input
          type="text"
          v-model="username"
          class="p-2 block rounded border"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label>Email</label>
        <input type="text" v-model="email" class="p-2 block rounded border" />
      </div>
      <div class="flex flex-col gap-2">
        <label>Nachname</label>
        <input
          type="text"
          v-model="family_name"
          class="p-2 block rounded border"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label>Name</label>
        <input type="text" v-model="name" class="p-2 block rounded border" />
      </div>
      <div class="flex flex-col gap-2">
        <label>Password</label>
        <input
          type="text"
          v-model="password"
          class="p-2 block rounded border"
        />
      </div>
      <button
        @click="register"
        class="p-2 active:bg-blue-600 flex ml-auto bg-blue-500 text-purple-50 rounded"
      >
        Register
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Bloggy } from "@/bloggy";
let username = ref("");
let name = ref("");
let password = ref("");
let family_name = ref("");
let email = ref("");

function register() {
  Bloggy.register({
    email: email.value,
    family_name: family_name.value,
    name: name.value,
    password: password.value,
    username: username.value,
  });
}
</script>
