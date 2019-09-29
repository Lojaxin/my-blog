<template>
    <div class="artPage">
        <b-container class="bv-example-row">
            <b-row>
                <b-col></b-col>
                <rightUser class="d-none d-md-block"></rightUser>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import rightUser from "../../components/rightUser";
    export default {
        name: "index",
        components:{
            rightUser
        }
    }
</script>

<style scoped>
    .artPage{
        width: 100%;
        height: 100%;
        background-color: rgb(246,246,246);
        padding-top: 75px;
    }
</style>