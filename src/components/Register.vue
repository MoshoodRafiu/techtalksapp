<template>
    <div>
        <div class="form register">
            <div v-if="formSuccess" class="successMessage">Registration successfull! You will now be redirected...</div>
            <div v-if="formHasError" class="errMessage">{{ errorMessage }}</div>
            <ul v-if="formHasError && serverErrorMessages">
                <li class="errMessage">{{ serverErrorMessages.username[0] }}</li>
            </ul>
            <div>
                <label for="username">Username</label>
                <input @keyup.enter="register()" type="text" v-model="credentials.username" id="username" class="form-field" placeholder="Username">
            </div>
            <div>
                <label for="password">Password</label>
                <input @keyup.enter="register()" type="password" v-model="credentials.password" id="password" class="form-field" placeholder="Password">
            </div>
            <div>
                <label for="password-confirm">Confirm Password</label>
                <input @keyup.enter="register()" type="password" v-model="credentials.confirm_password" id="password-confirm" class="form-field" placeholder="Confirm Password">
            </div>
            <div>
                <button class="form-action" @click="register()" :class="{'processing': processing}">
                    <span v-if="!processing">Register</span>
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
                confirm_password: null
            },
            formHasError: false,
            formSuccess: false,
            processing: false,
            errorMessage: 'Fill all required field',
            serverErrorMessages: []
        }
    },
    methods: {
        passwordValidated(){
            if(this.credentials.password.length < 8){
                this.formHasError = true;
                this.errorMessage = 'Password too short';
                return false;
            }else if (this.credentials.password !== this.credentials.confirm_password) {
                this.formHasError = true;
                this.errorMessage = 'Password doesn\'t match';
                return false;
            }else{
                this.formHasError = false;
                this.errorMessage = 'Fill all required field';
                return true;
            }
        },
        register(){
            if(!this.$store.getters.loggedIn){
                if (this.credentials.username && this.credentials.password && this.credentials.confirm_password){
                    if(this.passwordValidated()){
                        this.processing = true;
                        this.$store.dispatch('registerUser', this.credentials)
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
                                this.errorMessage = 'An error occured';
                                this.serverErrorMessages = err.response.data.errors;
                            });
                    }
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
    .register.form::after{
        right: 150px;
    }
    .errMessage{
        color: red;
        font-size: 12px;
        font-weight: bold;
    }
    .successMessage{
        color: green;
        font-size: 12px;
        font-weight: bold;
    }
    ul{
        margin: 0 !important;
    }
</style>