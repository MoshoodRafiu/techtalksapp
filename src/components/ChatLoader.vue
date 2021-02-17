<template>
    <div>
        <div class="message text-right ml-auto p-2">
            <vue-skeleton-loader
                class="user"
                type="rect"
                :width="width"
                :height="60"
                :rounded="true"
                animation="wave"
                />
        </div>
            <div class="message text-right ml-auto p-2">
            <vue-skeleton-loader
                class="user"
                type="rect"
                :width="width"
                :height="60"
                :rounded="true"
                animation="wave"
                />
        </div>
            <div class="message text-right">
            <vue-skeleton-loader
                class="user"
                type="rect"
                :width="width"
                :height="60"
                :rounded="true"
                animation="wave"
                />
        </div>
            <div class="message text-right ml-auto p-2">
            <vue-skeleton-loader
                class="user"
                type="rect"
                :width="width"
                :height="60"
                :rounded="true"
                animation="wave"
                />
        </div>
            <div class="message text-right">
            <vue-skeleton-loader
                class="user"
                type="rect"
                :width="width"
                :height="60"
                :rounded="true"
                animation="wave"
                />
        </div>
            <div class="message text-right">
            <vue-skeleton-loader
                class="user"
                type="rect"
                :width="width"
                :height="60"
                :rounded="true"
                animation="wave"
                />
        </div>
            <div class="message text-right">
            <vue-skeleton-loader
                class="user"
                type="rect"
                :width="width"
                :height="60"
                :rounded="true"
                animation="wave"
                />
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            width: 450
        }
    },
    created(){
        if (window.innerWidth < 600){
            this.width = 250;
        }
    }
}
</script>
<style lang="">
    
</style>