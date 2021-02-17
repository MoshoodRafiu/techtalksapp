<template>
    <div>
        <div id="chatbox">
            <div class="chat-title">
                <span>TechTalks Chat Room</span>
                <div class="members-info">
                    <div>Members: 12 <span class="fa fa-users"></span></div>
                    <div>Active: 7 <span class="fa fa-user-friends text-success"></span></div>
                </div>
            </div>
            <div class="messages">
                <div v-if="!loading">
                    <div v-for="message in $store.state.messages" :key="message.message + Math.random()" class="message-wrapper">
                        <div class="message" :class="{'user': ($store.getters.loggedIn && $store.state.user.username === message.sender), 'guest': ($store.getters.loggedIn && $store.state.user.username !== message.sender)}">
                            <div class="sender">{{ message.sender }}</div>
                            <div class="message-text">{{ message.message }}</div>
                            <div class="sent-time">{{ message.time }}</div>
                        </div>
                    </div>
                </div>
                <chat-loader v-if="loading"/>
            </div>
            <div class="message-container">
                <div class="send-container">
                    <img src="../assets/send.svg" alt="send" @click="sendMessage($event)" class="send-button">
                </div>
                <textarea class="message-field" @keypress.enter="sendMessage($event)" v-model="msg" placeholder="Enter Message..."></textarea>
            </div>
        </div>
    </div>
</template>
<script>
    import io from 'socket.io-client';
    import axios from 'axios';
    import ChatLoader from '../components/ChatLoader.vue';
    let socket = io('https://ayocrypto-chat.herokuapp.com', {
        query: {
            roomId: 'techtalks',
            username: 'TeckTalks User'
        }
    });
    export default {
        name: 'Chat',
        data: function () {
            return {
                msg: null,
                loading: false,
            }
        },
        components: {
            ChatLoader
        },
        methods: {
            sendMessage(e) {
                e.preventDefault();
                if (this.msg){
                    socket.emit('NEW_CHAT_MESSAGE_EVENT', {
                        roomId: 'chatId',
                        sender: this.$store.state.user.username ? this.$store.state.user.username : 'Anonymous',
                        receiver: 'All',
                        msg: this.msg
                    });
                    this.msg = null;
                }
            },
            getTime(date) {
                var hours = date.getHours();
                var minutes = date.getMinutes();
                var ampm = hours >= 12 ? 'pm' : 'am';
                hours = hours % 12;
                hours = hours ? hours : 12; // the hour '0' should be '12'
                minutes = minutes < 10 ? '0'+minutes : minutes;
                var strTime = hours + ':' + minutes + ' ' + ampm;
                return strTime;
            },
            fetchOldMessages(){
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token;
                axios.get('/getMessages')
                    .then(res => {
                        this.loading = false;
                        this.$store.dispatch('initMessages', res.data.data);
                        setTimeout(() => {
                            this.scrollToElement();
                        }, 10);
                    })
                    .catch(err => {
                        console.log(err)
                    });
            },
            scrollToElement() {
                const el = this.$el.querySelector('.messages');
                if (el) {
                    el.scrollTop = el.scrollHeight;
                }
            }
        },
        created() {
            socket.on('connect', () => {
                console.log('Connected!');
            });
            socket.on('USER_JOIN_CHAT_EVENT', (text) => {
                console.log(text)
            });
            socket.on('NEW_CHAT_MESSAGE_EVENT', (data) => {
                data.time = this.getTime(new Date);
                console.log(data)
                this.$store.dispatch('pushNewMessage', data)
                setTimeout(() => {
                    this.scrollToElement();
                }, 10)
            });
            this.loading = true;
            this.fetchOldMessages();
        },
        mounted() {
            this.scrollToElement();
        }
    }
</script>

<style>
    #chatbox{
        width: 80%;
        height: calc(100vh - 70px);
        margin: 10px auto 0 auto;
        background: #EAF6FC;
        padding: 20px;
        border-radius: 30px 30px 0 0;
    }
    .chat-title{
        font-size: 18px;
        text-align: center;
        height: 50px;
    }
    .messages{
        background: #fff;
        height: 100px;
        border-radius: 10px;
        padding: 10px;
        height: calc(100% - 120px);
        overflow-x: hidden;
        overflow-y: auto;
    }
    .message-wrapper{
        width: 100%;
        margin: 5px 0;
    }
    .message{
        width: 450px;
        padding: 10px 10px;
    }
    .message.user{
        margin-left: auto;
        border-radius: 15px 15px 0 15px;
        background: #b6b5b5;
    }
    .message.guest{
        margin-right: auto;
        border-radius: 15px 15px 15px 0;
        background: #9ed0d6;
    }
    .message-field{
        width: 100%;
        margin-top: 10px;
        border: none;
        resize: none;
        padding: 5px 60px 5px 10px;
        border-radius: 10px;
    }
    .message-text{
        font-size: 13px;
    }
    .sender{
        font-size: 12px;
        font-style: italic;
        font-weight: bold;
    }
    .sent-time{
        font-size: 9px;
        text-align: right;
    }
    .message-container{
        position: relative;
    }
    .message-field:focus{
        outline: none;
    }
    .send-container{
        cursor: pointer;
        padding: 5px;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        position: absolute;
    }
    .members-info{
        font-size: 10px;
        display: flex;
        justify-content: center;
    }
    .members-info div{
        margin: 0 10px;
    }
    .send-button{
        width: 28px;
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