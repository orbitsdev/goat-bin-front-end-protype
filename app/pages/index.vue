<script setup lang="ts">
  definePageMeta({
    middleware: ['redirect'],
  })
    const user = useUser();
</script>
<template>
    <div>
          <h1>Profile</h1>

    <p v-if="user">
      Name: {{ user.name }} <br />
      Age: {{ user.age }}
    </p>

    <p v-else>
      No user logged in
    </p>
      
    </div>
</template>