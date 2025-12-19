<script setup lang="ts">

    const {data:users, pending, error, refresh} =  useUsers()
    
 
</script>
<template>
    <div class="p-10 bg-gray-50">
        <h1>Users lIst Page</h1>

        <div>
            {{ users?.data[0] }}
        </div>


    </div>
</template>