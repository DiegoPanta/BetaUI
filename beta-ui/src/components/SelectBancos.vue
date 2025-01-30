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
        :value="bank.cnpj"
      >
        {{ bank.bankName }}
      </option>
    </select>
    <div v-if="hasError" class="invalid-feedback">
      Por favor, selecione um banco.
    </div>
  </div>
</template>

<script>
import { getBanks } from '@/services/loanSimulatorApi';
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
      banks: [],
      selectedBank: this.modelValue,
      hasError: false,
    };
  },
  watch: {
    selectedBank(value) {
      this.$emit("update:modelValue", value);
    }
  },
  mounted() {
    this.fetchBanks();
  },
  methods: {
    handleSelection() {
      this.validate();
    },
    validate() {
      this.hasError = this.selectedBank === "";
    },
    async fetchBanks() {
      try {
        const response = await getBanks();
        this.banks = response.data;
      } catch (error) {
        this.hasError = true;
        console.error('Erro ao carregar os bancos:', error);
      }
    },
  }
};
</script>

<style scoped>
/* Estilização extra opcional */
</style>
