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
        <label>Password</label>
        <input
          type="text"
          v-model="password"
          class="p-2 block rounded border"
        />
      </div>
      <button
        @click="login"
        class="p-2 active:bg-blue-600 flex ml-auto bg-blue-500 text-purple-50 rounded"
      >
        Login
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Bloggy } from "@/bloggy";

let router = useRouter();

let username = ref("");
let password = ref("");

function login() {
  Bloggy.login({
    password: password.value,
    username: username.value,
  }).then((res) => {
    router.push("/dashboard");
  });
}
</script>
