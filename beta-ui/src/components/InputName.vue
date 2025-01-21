<template>
  <div class="mb-3">
    <label for="input-name" class="form-label">Nome</label>
    <input
      id="input-name"
      type="text"
      v-model="localValue"
      @blur="validate"
      :class="['form-control', hasError ? 'is-invalid' : '']"
      placeholder="Digite seu nome"
    />
    <div v-if="hasError" class="invalid-feedback">
      O campo "Nome" é obrigatório.
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ["update:modelValue"],
  data() {
    return {
      localValue: this.modelValue,
      hasError: false,
    };
  },
  methods: {
    validate() {
      this.hasError = this.localValue.trim() === "";
    },
  },
  watch: {
    modelValue(newVal) {
      this.localValue = newVal;
    },
    localValue(newVal) {
      this.$emit("update:modelValue", newVal);
    },
  },
};
</script>

<style scoped>
/* Estilização extra opcional */
</style>
