import { ref } from 'vue';


export default function useModal(defaultValue = false) {

    const modalActive = ref(defaultValue);

    function toggleModal() {
        modalActive.value = !modalActive.value;
    }

    return {modalActive, toggleModal}
}