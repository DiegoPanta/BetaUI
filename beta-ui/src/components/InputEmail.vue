<template>
  <div class="mb-3">
    <label for="input-email" class="form-label">E-mail</label>
    <input
      id="input-email"
      type="email"
      v-model="localEmail"
      @blur="validate"
      :class="['form-control', hasError ? 'is-invalid' : '']"
      placeholder="Digite seu e-mail"
    />
    <div v-if="hasError" class="invalid-feedback">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue"],
  data() {
    return {
      localEmail: this.modelValue,
      hasError: false,
      errorMessage: "",
    };
  },
  methods: {
    validate() {
      if (!this.localEmail.trim()) {
        this.hasError = true;
        this.errorMessage = 'O campo "E-mail" é obrigatório.';
      } else if (!this.isValidEmail(this.localEmail)) {
        this.hasError = true;
        this.errorMessage = "Por favor, insira um e-mail válido.";
      } else {
        this.hasError = false;
        this.errorMessage = "";
      }
    },
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
  },
  watch: {
    modelValue(newVal) {
      this.localEmail = newVal;
    },
    localEmail(newVal) {
      this.$emit("update:modelValue", newVal);
    },
  },
};
</script>

<style scoped>
/* Estilização extra opcional */
</style>
