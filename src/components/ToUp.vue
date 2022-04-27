<template>
    <div>
        <transition name="fade">
            <div v-show="show" class="to-up" @click="toUp">
                <svg-icon name="rocket" class="to-up-svg"></svg-icon>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    name: 'ToUp',
    data() {
        return {
            show: false
        } as {
            show: boolean
        }
    },
    mounted() {
        window.addEventListener('scroll', () => {
            if(window.scrollY < 10) {
                this.show = false
            } else {
                this.show = true
            }
        })
    },
    methods: {
        toUp() {
           window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }
    }
})
</script>

<style lang="less" scoped>
.to-up{
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: rgba(51, 51, 51, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease;
    color: #333;
    box-shadow: 0px 3px 10px rgba(51, 51, 51, 0.8);
    &:hover{
        box-shadow: 0px 3px 10px @fc-danger;
        color: rgba(153, 51, 51);
        transform: scale(1.1);
    }
    .to-up-svg{
        width: 30px;
        height: 30px;
        transition: color 0.5s ease;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: all 2.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    bottom: 130px;
}
</style>