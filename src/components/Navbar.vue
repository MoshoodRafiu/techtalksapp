<template>
    <div>
        <div id="navbar">
            <div @click="$router.push({name: 'home'})">
                <div>TechTalks</div>
                <img src="../assets/logo.svg" alt="logo">
            </div>
             <ul class="nav-links">
                <li v-if="!$store.getters.loggedIn" @click="toggleForm('register')">Register</li>
                <li v-if="!$store.getters.loggedIn" @click="toggleForm('login')">Login</li>
                <li v-if="$store.getters.loggedIn" @click="logUserOut()"><span class="fa fa-user"></span> {{ $store.state.user.username ? $store.state.user.username : '' }}</li>
                <li v-if="$store.getters.loggedIn" @click="logUserOut()" :class="{'processing': processing}">
                    <span v-if="!processing">Logout</span>
                    <span v-if="processing">Logging out..</span>
                    <span v-if="processing">
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span class="sr-only">Loading...</span>
                    </span>
                </li>
            </ul>
        </div>
        <app-login @hideAllForms='hideAllForms' v-if="showLogin"/>
        <app-register @hideAllForms='hideAllForms' v-if="showRegister"/>
    </div>
</template>
<script>
import Login from './Login';
import Register from './Register';
export default {
    data(){
        return{
            showLogin: false,
            showRegister: false,
            processing: false,
        }
    },
    methods: {
        hideAllForms(){
            this.showLogin = false;
            this.showRegister = false;
        },
        toggleForm(type){
            if(type === 'register'){
                this.showLogin = false;
                this.showRegister = !this.showRegister;
            }else if (type === 'login'){
                this.showRegister = false;
                this.showLogin = !this.showLogin;
            }
        },
        logUserOut(){
            if(this.$store.getters.loggedIn){
                this.processing = true;
                this.$store.dispatch('logUserOut')
                    .then(() => {
                        this.processing = false;
                        this.$router.push({name: 'home'})
                    })
                    .catch(() => {
                        this.processing = false;
                    });
            }
        }
    },
    created(){
        window.addEventListener('click', e => {
            const form = document.querySelector('.form');
            const links = document.querySelector('.nav-links');
            if (form){
                if (!form.contains(e.target) && !links.contains(e.target)){
                    this.showRegister = false;
                    this.showLogin = false;
                }
            }
        });
    },
    components: {
        appLogin: Login,
        appRegister:Register
    }
}
</script>
<style>
    #navbar{
        height: 60px;
        background: #eaf6fc;
        box-shadow: 0 5px 10px #bebcbc;
        padding: 5px 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        z-index: 999;
    }
    .nav-links{
        padding: 0;
        margin: 0;
    }
    .nav-links li{
        display: inline;
        padding: 10px 15px;
        color: #6d6bf5;
        font-weight: bold;
        font-size: 15px;
        cursor: pointer;
    }
    .nav-links li:hover{
        text-decoration: underline;
    }
    #navbar div img{
        width: 30px;
        margin: 5px;
    }
    #navbar div{
        display: flex;
        justify-content: center;
        align-items: center;
        color: #6d6bf5;
        font-weight: bold;
        font-size: 30px;
        cursor: pointer;
    }
</style>