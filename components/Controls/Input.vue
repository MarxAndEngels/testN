<template>
  <div class="input__wrapper">
    <input
        :value="value"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
        :inputmode="type==='tel' ? 'numeric' : ''"
        :type="type"
        ref="input">
  </div>
</template>

<script setup lang="ts">
import Inputmask from "inputmask";

defineEmits(['update:modelValue'])

const props = defineProps({
  placeholder: {
    type: String,
    required: false,
    default: ''
  },
  type: {
    type: String,
    required: false,
    default: ''
  },
  mask: {
    type: String,
    required: false,
    default: ''
  },
  value: {
    type: String || Number,
    required: false,
    default: ''
  },
})


let inputValue = ref<string>(props.value)

const input = ref()

const masks = ref({
  money: {
    alias: "decimal",
    digits: 2,
    placeholder: "",
    autoGroup: true,
    allowMinus: false,
    rightAlign: false,
    groupSeparator: " ", // <-- this is &puncsp;
    radixPoint: " ",
  },
  number: {
    regex: "[0-9]*",
    placeholder: props.placeholder,
    showMaskOnHover: false
  },
  phone: {
    mask: "+7 (#99) 999-99-99",
    showMaskOnHover: false,
    showMaskOnFocus: true,
    // oncomplete: () => this.$emit('phoneMaskComplete'),
    // onincomplete: () => this.$emit('onincomplete'),
    definitions: {
      "#": {
        validator: "[1234569]",
      },
    },
  },
  date: {
    mask: "99/99/9999",
    showMaskOnHover: false,
    showMaskOnFocus: true,
    // oncomplete: () => this.$emit('dateMaskComplete'),
    // onincomplete: () => this.$emit('onincomplete'),
  }
})
onMounted(() => {
  if (props.mask === 'money') {
    let im = new Inputmask(masks.value.money);
    im.mask(input.value);
  }
  if (props.mask === 'number') {
    let im = new Inputmask(masks.value.number);
    im.mask(input.value);
  }
  if (props.mask === 'phone') {
    let im = new Inputmask(masks.value.phone);
    im.mask(input.value);
  }
  if (props.mask === 'date') {
    let im = new Inputmask(masks.value.date);
    im.mask(input.value);
  }
})
</script>
