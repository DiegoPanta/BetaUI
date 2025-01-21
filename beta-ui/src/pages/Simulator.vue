<script>
import InputName from '@/components/InputName.vue'
import InputCpfCnpj from '@/components/InputCpfCnpj.vue'
import InputEmail from '@/components/InputEmail.vue'
import InputParcelas from '@/components/InputParcelas.vue'
import InputValorEmprestimo from '@/components/InputValorEmprestimo.vue'
import SelectBancos from '@/components/SelectBancos.vue'

export default {
  components: {
    InputName,
    InputCpfCnpj,
    InputEmail,
    InputParcelas,
    InputValorEmprestimo,
    SelectBancos,
  },
  data() {
    return {
      valueName: '',
      valueCpfCnpj: '',
      valueEmail: '',
      quantidadeParcelas: '',
      valorEmprestimo: '',
      selectedBank: '',
    }
  },
  methods: {
    handleSubmit() {
      if (
        this.valueName.trim() &&
        this.valueCpfCnpj.trim() &&
        this.valueEmail.trim() &&
        parseInt(this.quantidadeParcelas.trim()) > 0 &&
        parseFloat(this.valorEmprestimo.trim()) > 0 &&
        this.selectedBank
      ) {
        console.log('Dados enviados:', {
          name: this.valueName,
          cpfCnpj: this.valueCpfCnpj,
          email: this.valueEmail,
          quantidadeParcelas: this.quantidadeParcelas,
          valorEmprestimo: this.valorEmprestimo,
          bancoSelecionado: this.selectedBank,
        })
      } else {
        console.error('Preencha todos os campos corretamente.')
      }
    },
  },
}
</script>

<template>
  <div class="container mt-4">
    <div class="card">
      <div class="card-header bg-success text-white d-flex justify-content-center align-items-center py-2">
        <h5>Simulação de Empréstimo</h5>
      </div>
      <div class="card-body">
        <div class="row mb-3">
          <div class="col-md-4">
            <InputName v-model="valueName" />
          </div>
          <div class="col-md-4">
            <InputCpfCnpj v-model="valueCpfCnpj" />
          </div>
          <div class="col-md-4">
            <InputEmail v-model="valueEmail" />
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-md-4">
            <InputParcelas v-model="quantidadeParcelas" />
          </div>
          <div class="col-md-4">
            <InputValorEmprestimo v-model="valorEmprestimo" />
          </div>
          <div class="col-md-4">
            <SelectBancos v-model="selectedBank" />
          </div>
        </div>
        <div class="text-center">
          <button @click="handleSubmit" class="btn btn-primary">Simular</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilização extra opcional */
</style>
