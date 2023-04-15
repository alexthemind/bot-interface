

<template>
    <div class="flex flex-col">
        <div class="flex space-between items-center pb-4 border-b border-gray-200">
            <div class="w-[50%]">
                <button class="hover:bg-gray-100 text-gray-400 hover:text-purple-500 rounded-full transition w-[1.9em] h-[1.9em]">
                    <i class="fa fa-user-circle-o"></i>
                </button>
            </div>
            <div class="w-[50%]">
                <div class="rounded-full py-2 px-3 bg-gray-100 flex items-center justify-end">
                    <input type="text" class="outline-none bg-transparent text-xs w-full" placeholder="search..." />
                    <i class="fa fa-search float-right text-gray-300"></i>
                </div>
            </div>
            <div class="w-[50%] text-right">
                <button class="hover:bg-gray-100 text-gray-400 hover:text-purple-500 rounded-full transition w-[1.9em] h-[1.9em]">
                    <i class="fa fa-bell-o"></i>
                </button>
            </div>
        </div>
        <div id="messages" class="h-[77vh] overflow-y-scroll">
            <!--MESSAGE CONTAINER-->
        </div>
        <div class="flex space-between items-center p-3 border-t border-gray-200">
            <div class="w-full rounded-full py-3 px-4 bg-gray-100 flex items-center justify-end mr-[1em]">
                <input id="input-message" v-on:keypress="(ev) => ev.keyCode == 13 && sendMessage()" type="text" class="outline-none bg-transparent text-xs w-full" placeholder="search..." />
            </div>
            <button v-on:click="(e) => sendMessage()" class="transition w-[2.5em] h-[2.5em] rounded-full bg-gray-200 hover:bg-purple-500 hover:text-white p-2">
                <i class="fa fa-send"></i>
            </button>
        </div>
    </div>   
    <div id="white-space" class="fixed top-[1em] right-[1em] bg-gray-800 text-gray-200 rounded-lg px-[2em] py-[1em] shadow-lg border-b border-orange-500">
        No puedes enviar mensajes vacios <i class="fa fa-warning"></i>
    </div>
</template>

<script>
export default {
    data() {
        return {
            messageContainer: null
        }
    },
    methods: {
        sendMessage: function() {
            let inputMessage = document.getElementById('input-message');
            let whiteSpace = document.getElementById('white-space');

            if(inputMessage.value.trim().length == 0) 
            {
                whiteSpace.classList.add('active');
                setTimeout(() => {
                    whiteSpace.classList.remove('active');
                },1500);
                return false;
            }
            else
            {
                whiteSpace.classList.remove('active');
            }

            let msg = JSON.parse(localStorage.messages);
            let session_id = localStorage.session_id;

            msg.push({user: inputMessage.value});

            this.writeUserMessages(inputMessage.value);

            fetch('http://localhost:8000/chat-bot',{
                method: 'POST',
                body: JSON.stringify({
                    session_id: session_id,
                    message: inputMessage.value
                })
            }).then(rs => rs.json()).then(rs => {

                msg.push({bot: rs.msg});

                Object.assign(localStorage,{
                    messages: JSON.stringify(msg)
                })

                this.writeBotMessages(rs.msg);
            });

            inputMessage.value = "";
        },
        writeBotMessages: function(msg) {
            let container = document.createElement('div');
                container.className = 'w-full flex justify-start items-center';
            let item = document.createElement('div');
                item.className = "p-4 bg-gray-50 rounded-lg text-gray-400 m-[1em] w-[60%] border-b border-blue-300 text-xs";
                item.innerText = msg;
            let icon = document.createElement('i');
                icon.className = 'fa fa-user-circle text-gray-400 mr-[1em]'
            
            container.appendChild(icon);
            container.appendChild(item);
            this.messageContainer.appendChild(container);

            this.scrollDown();
        },
        writeUserMessages: function(msg) {
            let container = document.createElement('div');
                container.className = 'w-full flex justify-end items-center';
            let item = document.createElement('div');
                item.className = "p-4 bg-purple-500 rounded-lg text-white m-[1em] w-[60%] border-b border-pink-500 text-xs";
                item.innerHTML = msg;
            let icon = document.createElement('i');
                icon.className = 'fa fa-commenting text-purple-500 mr-[1em]'

            container.appendChild(item);
            container.appendChild(icon);
            this.messageContainer.appendChild(container);

            this.scrollDown();
        },
        writeBotUserMessages: function() {
            let messages = JSON.parse(localStorage.messages);
                messages.map((elm,i) => {
                    if(elm.bot != undefined)
                    {
                        this.writeBotMessages(elm.bot);
                    }
                    else
                    {
                        this.writeUserMessages(elm.user);
                    }

                    if((i + 1) == messages.length)
                    {
                        this.scrollDown();
                    }
                });

        },
        scrollDown: function() {
            this.messageContainer.scrollTo({
                top: this.messageContainer.scrollTop + document.body.clientHeight,
                left: 0,
                behavior: 'smooth'
            });
        }
    },
    mounted: function() {
        if(localStorage.messages == undefined)
        {
            Object.assign(localStorage,{
                messages: JSON.stringify([])
            });
        }

        this.messageContainer = document.getElementById('messages');
        this.writeBotUserMessages();

        window.addEventListener("bot-message",() => {
            //this.writeBotMessages();   
        });
    }
}
</script>