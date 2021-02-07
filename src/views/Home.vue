<template>
    <div>
        <div id="page-content">
            <div>
                <div class="welcome-message">
                    <h1>Welcome to TechTalks</h1>
                </div>
                <div class="inputs">
                    <button @click="$router.push({name: 'chat'})">Current Gists <span class="fa ml-2 fa-comments"></span></button>
                    <button>I'm New Here <span class="fa ml-2 fa-arrow-right"></span></button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import io from 'socket.io-client';
    let socket = io('https://ayocrypto-chat.herokuapp.com');
    export default {
        name: 'Chat',
        data: function () {
            return {
                textInput: null,
                textOutput: []
            }
        },
        methods: {
            submitText: function (event) {
                event.preventDefault();
                socket.emit('send', this.textInput);
            }
        },
        created: function () {
            socket.on('connect', () => {
                console.log('Connected!');
            });
            socket.on('USER_JOIN_CHAT_EVENT', (text) => {
                console.log(text)
            });
        }
    }
</script>

<style>
    #page-content{
        height: calc(100vh - 60px);
        margin: 0 auto;
        z-index: 99;
        background: linear-gradient(rgba(234, 246, 252, 0.7), rgba(234, 246, 252, 0.7)), url("../assets/header.svg") center/cover;
        /* background: url("../assets/header.svg") no-repeat left top, linear-gradient(#eb01a5, #d13531); */
        padding: 20px;
        display: flex;
        justify-content: center;
        align-content: center;
    }
    #page-content div{
        margin: auto 0;
        width: 100% !important;
    }
    .inputs{
        text-align: center;
        margin-top: 30px !important;
    }
    button:focus{
        outline: none;
    }
    .inputs button{
        border: 1px solid #6d6bf5;
        border-radius: 40px;
        padding: 15px 50px;
        margin: 10px;
        transition: all 0.6s;
    }
    .inputs button:first-child{
        background: transparent;
        color: #6d6bf5;
    }
    .inputs button:first-child:hover{
        background: #6d6bf5;
        color: #fff;
    }
    .inputs button:last-child{
        background: #6d6bf5;
        color: #fff;
    }
     .inputs button:last-child:hover{
        background: transparent;
        color: #6d6bf5;
    }
    .welcome-message{
        margin: 20px 0;
        text-align: center;
        color: #6d6bf5;
    }
    .welcome-message h1{
        font-size: 50px;
    }
    @media screen and (max-width: 600px) {
        #navbar{
            padding: 5px 10px;
        }
        #chatbox{
            width: 100%;
            border-radius: 15px 15px 0 0;
        }
        .message{
            width: 250px;
            padding: 10px 10px;
        }
    }
</style>
