<template>
  <div class="mb-3">
    <label for="bank-select" class="form-label">Selecione um Banco</label>
    <select
      id="bank-select"
      v-model="selectedBank"
      @change="handleSelection"
      class="form-select"
      :class="{ 'is-invalid': hasError }"
    >
      <option value="" disabled>Escolha um banco</option>
      <option
        v-for="bank in banks"
        :key="bank.cnpj"
        :value="bank.name"
      >
        {{ bank.name }} - {{ bank.cnpj }}
      </option>
    </select>
    <div v-if="hasError" class="invalid-feedback">
      Por favor, selecione um banco.
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue"],
  data() {
    return {
      selectedBank: this.modelValue,
      hasError: false,
      banks: [
        { name: "Banco do Brasil", cnpj: "00.000.000/0001-91" },
        { name: "Caixa Econômica Federal", cnpj: "00.360.305/0001-04" },
        { name: "Bradesco", cnpj: "60.746.948/0001-12" },
        { name: "Itaú Unibanco", cnpj: "60.701.190/0001-04" },
        { name: "Santander", cnpj: "90.400.888/0001-42" }
      ]
    };
  },
  watch: {
    selectedBank(value) {
      this.$emit("update:modelValue", value);
    }
  },
  methods: {
    handleSelection() {
      this.validate();
    },
    validate() {
      this.hasError = this.selectedBank === "";
    }
  }
};
</script>

<style scoped>
/* Estilização extra opcional */
</style>
