<script setup lang="ts">
    const route = useRoute();

</script>

<template>
    <div class="p-10 bg-gray-50">
        {{ route.params.id }}
        View Details
    </div>
</template>