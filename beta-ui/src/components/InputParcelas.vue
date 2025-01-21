<template>
  <div class="mb-3">
    <label for="input-parcelas" class="form-label">Parcelas</label>
    <input
      id="input-parcelas"
      type="number"
      :value="modelValue"
      @input="updateValue"
      @blur="validate"
      class="form-control"
      :class="{ 'is-invalid': hasError }"
      min="1"
      placeholder="Digite a quantidade de parcelas"
    />
    <div v-if="hasError" class="invalid-feedback">
      O campo "Parcelas" é obrigatório e deve ser um número maior que 0.
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
  methods: {
    updateValue(event) {
      const newValue = event.target.value;

      this.$emit('update:modelValue', newValue);
      this.validate();
    },
    validate() {
      const numValue = Number(this.modelValue);
      
      if (this.modelValue === '' || numValue <= 0 || !Number.isInteger(numValue)) {
        this.hasError = true;
      } else {
        this.hasError = false;
      }
    },
  },
  watch: {
    modelValue() {
      this.validate();
    },
  },
};
</script>

<style scoped>
/* Estilização extra opcional */
</style>
