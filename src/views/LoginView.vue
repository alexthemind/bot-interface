
<template>
    <div class="w-full h-[100vh] bg-purple-700">
        <div class="w-full h-full flex justify-center items-center flex-col">
            <p class="text-white mb-[1em] text-xl font-bold drop-shadow-lg w-[30%] text-center">
                Indique un nombre de usuario para interactuar
            </p>
            <div class="w-[30%] bg-white rounded-lg shadow-lg text-gray-500 text-xs">
                <div class="p-4 border-b border-gray-200">
                    <i class="fa fa-user-circle text-gray-400 mr-[.5em]"></i> Login
                </div>
                <div class="p-4">
                    <div class="flex flex-col">
                        <span class="text-[11px] font-bold mb-1">Usuario</span>
                        <input id="username" type="text" class="outline-none ring-1 ring-purple-200 focus:ring-2 focus:ring-purple-400 rounded-lg px-4 py-2" />
                    </div>
                </div>
                <div class="p-4 border-t border-gray-200">
                    <button v-on:click="login()" class="transition bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg w-full px-4 py-3 border-b border-indigo-700">
                        continuar <i class="fa fa-send"></i>
                    </button>
                    <br>
                    <br>
                </div>
            </div>
            <p class="text-[10px] text-purple-300 mt-[2em] w-[30%] text-center">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem ea a nobis commodi eum unde, eius incidunt officia asperiores inventore cumque quisquam dicta illo sed quos iste iure. Eaque, harum?
            </p>
        </div>
        <div id="loader-screen"  class="bg-white/75 fixed w-full h-full z-[99999] flex justify-center items-center flex-col top-0 left-0 text-xs">
            <span class="loader"></span>
            <span class="mt-[.6em]">favor espere...</span>
        </div>
        <div id="alert-danger" class="text-center bg-red-500 p-4 fixed w-full z-[9999] text-xs text-white">
            Debe indicar un nombre de usuario para continuar <i class="fa fa-warning"></i>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            title: 'Login'
        }
    },
    methods: {
        login: function() {
            let username = document.getElementById('username');
            let alertDanger = document.getElementById('alert-danger');
            let loaderScreen = document.getElementById('loader-screen');

            if(username.value.trim().length != 0)
            {
                alertDanger.classList.remove('active');
                let session_id = btoa(username.value);

                localStorage.setItem("session_id",session_id);

                loaderScreen.classList.add('active');

                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            }
            else
            {
                alertDanger.classList.add('active');
                loaderScreen.classList.remove('active');
            }
        }
    }
}
</script>