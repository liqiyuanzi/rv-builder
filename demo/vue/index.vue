<template>
    <div class="test">
        {{ value }}
        <span>{{xxx}}</span>
        <test-component />
    </div>
</template>

<script>
import TestComponent from './component.vue'
export default {
    components: {
        TestComponent
    },
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
    @import './index.less';
    .test{
        height: 10px;
        .b{
            background: @black;
            color: @currentColor;
            height:1px;
        }
    }
</style>
