<template>
  <div class="mb-3">
    <label for="input-cpfcnpj" class="form-label">CPF/CNPJ</label>
    <input
      id="input-cpfcnpj"
      v-model="maskedValue"
      @input="onInput"
      @blur="validate"
      :class="['form-control', hasError ? 'is-invalid' : '']"
      placeholder="Digite seu CPF ou CNPJ"
    />
    <div v-if="hasError" class="invalid-feedback">O campo "CPF/CNPJ" é obrigatório.</div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      hasError: false,
      maskedValue: this.applyMask(this.modelValue),
    }
  },
  methods: {
    onInput(event) {
      const rawValue = event.target.value.replace(/\D/g, '')
      
      this.maskedValue = this.applyMask(rawValue)
      this.$emit('update:modelValue', rawValue)
    },
    validate() {
      this.hasError = !this.maskedValue.trim()
    },
    applyMask(value) {
      const rawValue = value.replace(/\D/g, '')

      if (rawValue.length <= 11) {
        return rawValue.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4')
      } else {
        return rawValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{1,2})/, '$1.$2.$3/$4-$5')
      }
    },
  },
  watch: {
    modelValue(newVal) {
      this.maskedValue = this.applyMask(newVal)
    },
    maskedValue(newVal) {
      const rawValue = newVal.replace(/\D/g, '')
      this.$emit('update:modelValue', rawValue)
    },
  },
}
</script>

<style scoped>
/* Estilização extra opcional */
</style>
