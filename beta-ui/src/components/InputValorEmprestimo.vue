<template>
  <div class="mb-3">
    <label for="input-valor-emprestimo" class="form-label">Valor do empréstimo</label>
    <input
      id="input-valor-emprestimo"
      type="text"
      :value="formattedValue"
      @input="updateValue"
      @blur="validate"
      class="form-control"
      :class="{ 'is-invalid': hasError }"
      placeholder="R$ 0,00"
    />
    <div v-if="hasError" class="invalid-feedback">
      O campo "Valor do empréstimo" é obrigatório e deve ser um número maior que 0.
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: [Number, String],
      required: true,
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      hasError: false,
    };
  },
  computed: {
    formattedValue() {
      if (!this.modelValue) return '';

      let value = this.modelValue.toString().replace(/\D/g, '');

      const intPart = value.slice(0, -2) || '0';
      const decimalPart = value.slice(-2).padStart(2, '0');

      const formattedIntPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

      return `R$ ${formattedIntPart},${decimalPart}`;
    },
  },
  methods: {
    updateValue(event) {

      const rawValue = event.target.value.replace(/\D/g, '');
      const intValue = parseInt(rawValue, 10) || 0;

      const newValue = (intValue / 100).toFixed(2);
      this.$emit('update:modelValue', newValue);
    },
    validate() {
      const numValue = parseFloat(this.modelValue);
      
      if (this.modelValue === '' || isNaN(numValue) || numValue <= 0) {
        this.hasError = true;
      } else {
        this.hasError = false;
      }
    },
  },
};
</script>

<style scoped>
/* Estilização extra opcional */
</style>
