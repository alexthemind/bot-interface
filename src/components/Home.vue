<script setup>
    import { createApp } from 'vue';
    import LeftContainer from './LeftContainer.vue';
    import RightContianer from './RightContianer.vue';
</script>

<template>
    <div class="flex flex-row h-[100vh] text-sm">
        <div class="w-[30%] bg-purple-700 text-white p-6">
            <LeftContainer />
        </div>
        <div class="w-[70%] text-gray-500 p-6">
            <RightContianer />
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                title: 'Bot interface'
            }
        },
        
    }
</script>