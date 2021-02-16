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
                <div class="message-wrapper">
                    <div class="message guest">
                        <div class="message-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, pariatur?</div>
                        <div class="sent-time">12:45 AM</div>
                    </div>
                </div>
                <div class="message-wrapper">
                  <div class="message user">
                        <div class="message-text">Lorem, ipsum.</div>
                        <div class="sent-time">12:45 AM</div>
                    </div>
                </div>
                <div class="message-wrapper">
                  <div class="message user">
                        <div class="message-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, sit eum!</div>
                        <div class="sent-time">12:45 AM</div>
                    </div>
                </div>
                 <div class="message-wrapper">
                    <div class="message guest">
                        <div class="message-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla voluptas repudiandae harum necessitatibus, eum cupiditate consequatur, sit consectetur incidunt facere maiores pariatur soluta!</div>
                        <div class="sent-time">12:45 AM</div>
                    </div>
                </div>
                 <div class="message-wrapper">
                    <div class="message guest">
                        <div class="message-text">Lorem ipsum dolor sit.</div>
                        <div class="sent-time">12:45 AM</div>
                    </div>
                </div>
                 <div class="message-wrapper">
                  <div class="message user">
                        <div class="message-text">Lorem ipsum dolor sit amet consectetur adipisicing.</div>
                        <div class="sent-time">12:45 AM</div>
                    </div>
                </div>
                 <div class="message-wrapper">
                  <div class="message user">
                        <div class="message-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio fugiat quibusdam facilis voluptate repudiandae quisquam cupiditate, dolore nostrum maiores eligendi ea. Officia voluptate quam necessitatibus sequi aperiam ipsa voluptas a nobis porro officiis maxime possimus, molestiae iusto laudantium pariatur sunt non. Quam eligendi in deleniti ipsa amet facere at mollitia?</div>
                        <div class="sent-time">12:45 AM</div>
                    </div>
                </div>
            </div>
            <div class="message-container">
                <div class="send-container">
                    <img src="../assets/send.svg" alt="send" class="send-button">
                </div>
                <textarea class="message-field" placeholder="Enter Message..."></textarea>
            </div>
        </div>
    </div>
</template>
<script>
    import io from 'socket.io-client';
    let socket = io('https://ayocrypto-chat.herokuapp.com', {
        query: {
            roomId: 'JS',
            username: 'Meezy'
        }
    });
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
        overflow: auto;
    }
    .message-wrapper{
        width: 100%;
        margin: 20px 0;
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