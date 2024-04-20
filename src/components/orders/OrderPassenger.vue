<script setup>
    import { computed, ref } from 'vue';

    const props = defineProps({
        passenger:{
            type: Object,
            required: false,
            default: null,
        },

        disabled: {
            type: Boolean,
            default: false,
        }
    });

    const isActive = ref(false);

    function toggleClass() {
        isActive.value = !isActive.value;
    }

    const isEmpty = computed(() => {
        return !(props.passenger || props.disabled);
    });

    const initials = computed(() => {
        if(!props.passenger) {
            return ''
        }
        return (props.passenger.name.charAt(0)
            + props.passenger.surname.charAt(0)).toUpperCase();
    })
</script>

<template>

    <a href="#" class="passenger-item" @click.prevent="toggleClass" :class="{
        disabled,
        empty: isEmpty,
        'delete': isActive
    }">
        <div v-if="isEmpty">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                class="bi bi-plus-lg"
                viewBox="0 0 16 16"
            >
                <path
                    fill-rule="evenodd"
                    d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                />
            </svg>
        </div>
        <slot :data="passenger"/>

        <div v-if="!$slots.default">
            <p class="initials" >{{initials}}</p>
        </div>
    </a>

</template>

<style scoped>

    .initials {
        color: black;
        font-weight: 600;
    }


    .delete {
        background: red;
    }


    .passenger-item {
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 700;
        font-size: 2em;
        aspect-ratio: 1;
        border-radius: 10px;
        background: #FFFFFF;
        color: #FFFFFF;
        box-shadow: 0 5px 5px rgba(0, 0, 0, 0.15);
    }

    .passenger-item.disabled {
        background: #D2D2D2;
        box-shadow: 0 3px 3px rgba(0, 0, 0, 0.05);
        color: #7E7E7E;
    }

    .passenger-item.empty {
        color: #ABABAB;
        background: transparent;
        box-shadow: 0 0 0 rgba(0, 0, 0, 0);
        border: 10px dashed currentColor;
    }

    .bi-plus-lg {
        display: block;
        margin: 0 auto;
        width: 50%;
        aspect-ratio: 1;
    }

</style>