

<template>
    <div class="flex flex-col">
        <div class="flex space-between items-center pb-[1.2em] border-b border-purple-400">
            <div class="w-[20%]">
                <button class="transition p-2 w-[2em] h-[2em] flex justify-center items-center rounded-full hover:bg-purple-600">
                    <i class="fa fa-angle-left text-2xl"></i>
                </button>
            </div>
            <div class="w-full flex justify-center">
                <div class="w-fit font-bold text-purple-700 text-center px-2 py-1 rounded-lg bg-white shadow-lg">
                    <i class="fa fa-star text-yellow-400 text-[10px]"></i>
                    Bot Interface
                    <i class="fa fa-keyboard-o text-gray-400 text-[14px]"></i>
                </div>
            </div>
            <div class="w-[20%] text-right">
                <button class="transition p-2 w-[2em] h-[2em] flex justify-center items-center rounded-full hover:bg-purple-600">
                    <i class="fa fa-bars"></i>
                </button>
            </div>
        </div>
        <br>
        <button class="transition p-4 bg-purple-800 hover:bg-pink-500 flex items-center rounded-lg border-b border-purple-500">
            <div class="mr-[1em] flex flex-col">
                <i class="fa fa-commenting mb-[.5em]"></i>
                <i class="fa fa-star text-yellow-400"></i>
            </div>
            <div class="flex flex-col text-left w-full">
                <span class="font-bold">Bot Conversation</span>
                <span class="text-[8px]">Lorem ipsum dolor sit amet consectetur.</span>
            </div>
            <div class="text-center flex items-center">
                <i class="fa fa-check"></i>
            </div>
        </button>
    </div>
    <div class="h-[65vh]"></div>
    <div class="w-full flex space-between items-center p-4">
        <div class="w-[50%]">
            <button v-on:click="logout()" class="transition p-2 w-[2em] h-[2em] flex justify-center items-center rounded-full hover:bg-purple-600">
                <i class="fa fa-sign-out"></i>
            </button>
        </div>
        <div class="w-[50%]"></div>
    </div>
    <div id="session" class="fixed p-4 left-0 z-[99999] w-full text-center bg-gray-700 text-red-400">
        Cerraste sesión <i class="fa fa-info-circle"></i>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    methods: {
        logout: function() {
            let session = document.getElementById('session');
                session.classList.add('active');
            
            localStorage.clear();

            setTimeout(() => {
                window.location.reload()
            },1500);
        }
    }
}
</script>