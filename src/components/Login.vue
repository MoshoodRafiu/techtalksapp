<template>
    <div>
        <div class="form">
            <div v-if="formSuccess" class="successMessage">Login successfull! You will now be redirected...</div>
            <div v-if="formHasError" class="errMessage">{{ errorMessage }}</div>
            <div>
                <label for="username-login">Username</label>
                <input @keyup.enter="login()" type="text" v-model="credentials.username" id="username-login" class="form-field" placeholder="Username">
            </div>
            <div>
                <label for="password-login">Password</label>
                <input @keyup.enter="login()" type="password" v-model="credentials.password" id="password-login" class="form-field" placeholder="Password">
            </div>
            <div>
                <button class="form-action" @click="login()" :class="{'processing': processing}">
                    <span v-if="!processing">Login</span>
                    <div v-if="processing" class="spinner-grow spinner-grow-sm text-light" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            credentials: {
                username: null,
                password: null,
            },
            formHasError: false,
            formSuccess: false,
            errorMessage: 'Fill all required field',
            processing: false
        }
    },
     methods: {
        login(){
            if(!this.$store.getters.loggedIn){
                if (this.credentials.username && this.credentials.password){
                    this.formHasError = false;
                    this.processing = true;
                    this.$store.dispatch('logUserIn', this.credentials)
                        .then(res => {
                            this.processing = false;
                            if(res.data.success){
                                this.formSuccess = true;
                                this.redirectToChat();
                            }
                        })
                        .catch(err => {
                            this.processing = false;
                            this.formHasError = true;
                            this.errorMessage = err.response.data.message ? err.response.data.message : 'An error occured';
                        });
                }else{
                    this.formHasError = true;
                }
            }
        },
        redirectToChat(){
            setTimeout(() => {
                this.$router.push({name: 'chat'});
                this.$emit('hideAllForms');
            }, 2000);
        }
    }
}
</script>
<style>
    .form{
        margin-top: 15px;
        background: #eaf6fc;
        padding: 20px;
        width: 300px;
        position: absolute;
        right: 10px;
        z-index: 9999;
        border-radius: 5px;
        box-shadow: 0 0 10px #8f8d8d;
    }
    .form::after{
        content: "";
        width: 0;
        height: 0;
        border-right: 8px solid transparent;
        border-left: 8px solid transparent;
        border-bottom: 15px solid #eaf6fc;
        position: absolute;
        margin-top: -13px;
        right: 80px;
        top: 0;
    }
    label{
        font-size: 11px;
        margin: 3px;
        color: #b3b0b0;
    }
    .form-field{
        height: 40px;
        padding: 5px 10px;
        width: 100%;
        background: transparent;
        border: 1px solid #b3b0b0;
        color: #6d6bf5;
        border-radius: 4px;
    }
    .form-field::placeholder{
        color: #b3b0b0;
    }
    .form-action{
        margin-top: 10px;
        width: 100%;
        border: none;
        background: #6d6bf5;
        padding: 10px;
        border-radius: 30px;
        color: #fff;
    }
    .processing{
        cursor: not-allowed !important;
    }
</style>