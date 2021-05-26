<template>
    <div class="test">
        {{ value }}
        <span>{{xxx}}</span>
    </div>
</template>

<script>
  export default {
    data() {
        return {
            value: 'test',
            xxx: 'mmm'
        }
    },
    created() {
        this.test()
    },
    methods: {
        test() {}
    }
  }
</script>

<style lang='less' scoped>
    .test{
        height: '10px';
        .b{
            height:1px;
        }
    }
</style>
