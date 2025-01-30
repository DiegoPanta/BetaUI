<template>
  <div class="container mt-4">
    <!-- Modal -->
    <div v-if="isModalVisible" class="modal fade" id="loanModal" tabindex="-1" aria-labelledby="loanModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header bg-success text-white">
            <h5 class="modal-title" id="loanModalLabel">Simulação de Empréstimo</h5>
            <button type="button" class="btn-close btn-close-white" @click="closeModal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
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
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Fechar</button>
            <button @click="handleSubmit" type="button" class="btn btn-primary">Simular</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabela de Resultados -->
    <div class="rounded-2 mt-4">
      <p v-if="error" class="text-danger">{{ error }}</p>
      <div class="card">
        <div class="card-header bg-success text-white d-flex justify-content-between align-items-center">
          <h5>Resultados da Simulação:</h5>
          <button @click="newSimulation"
            class="btn btn-outline-success bg-white btn-sm ms-auto text-success border-success hover-text-dark hover:border-dark">
            Nova Simulação
            <font-awesome-icon :icon="['fas', 'plus']" />
          </button>
        </div>
        <div class="card-body">
          <div class="table-responsive border-top" v-if="loanData && Object.keys(loanData).length">
            <table class="table table-hover">
              <thead class="table-success">
                <tr>
                  <th scope="col">Valor do Empréstimo</th>
                  <th scope="col">Quantidade de Parcelas</th>
                  <th scope="col">Mensalidade</th>
                  <th scope="col">Custo Total dos Meses</th>
                  <th scope="col">Custo Anual</th>
                  <th scope="col">Custo Total dos Anos</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(loan, index) in loanData" :key="index">
                  <td>{{ loan.loanAmount }}</td>
                  <td>{{ loan.installments }}</td>
                  <td>{{ loan.monthlyInstallment }}</td>
                  <td>{{ loan.totalCostMonth }}</td>
                  <td>{{ loan.totalAnnualCost }}</td>
                  <td>{{ loan.finalCostYears }}</td>
                  <td>
                    <button @click="deleteLoan(index)" class="btn btn-danger btn-sm fa fa-trash">
                      <font-awesome-icon :icon="['fas', 'trash']" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- Se não houver registro exibe a mensagem "Sem registro" -->
          <div v-else class="text-center text-muted">
            <p>Sem registro</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { simulateLoan } from '@/services/loanSimulatorApi';
import { getSimulateLoan } from '../services/loanSimulatorApi';
import { deleteSimulateLoan } from '../services/loanSimulatorApi';
import InputName from '@/components/InputName.vue'
import InputCpfCnpj from '@/components/InputCpfCnpj.vue'
import InputEmail from '@/components/InputEmail.vue'
import InputParcelas from '@/components/InputParcelas.vue'
import InputValorEmprestimo from '@/components/InputValorEmprestimo.vue'
import SelectBancos from '@/components/SelectBancos.vue'
import { Modal } from 'bootstrap';
import { nextTick } from 'vue';

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
      selectedBank: [],
      loanData: null,
      isModalVisible: false,
      error: null,
      loading: false,
      modalInstance: null,
    };
  },
  mounted() {
    this.getSimulation();
  },
  methods: {
    openModal() {
      this.isModalVisible = true;

      this.$nextTick(() => {
        const modalElement = document.getElementById('loanModal');

        this.modalInstance = new Modal(modalElement, {
          backdrop: 'static',
          keyboard: false,
        });

        this.modalInstance.show();
      });
    },

    closeModal() {
      this.isModalVisible = false;
      if (this.modalInstance) {
        this.modalInstance.hide();
      }
    },

    async handleSubmit() {
      if (
        this.valueName.trim() &&
        this.valueCpfCnpj.trim() &&
        this.valueEmail.trim() &&
        parseInt(this.quantidadeParcelas.trim()) > 0 &&
        parseFloat(this.valorEmprestimo.trim()) > 0 &&
        this.selectedBank
      ) {
        const data = {
          name: this.valueName,
          taxId: this.valueCpfCnpj,
          email: this.valueEmail,
          bankId: this.selectedBank,
          loanAmount: this.valorEmprestimo,
          installments: this.quantidadeParcelas,
        };

        try {
          this.loading = true;
          await simulateLoan(data);
          await this.getSimulation();

          alert('Empréstimo simulado com sucesso!');
        } catch (error) {
          this.error = error.response ? error.response.data : 'Erro ao realizar a solicitação.';
          console.error('Erro ao enviar os dados:', error);
        } finally {
          this.loading = false;

          this.closeModal();
        }
      } else {
        console.error('Preencha todos os campos corretamente.');
      }
    },
    async deleteLoan(index) {
      if (confirm('Você tem certeza que deseja excluir esta simulação?')) {
        const loanId = this.loanData[index].id;

        try {
          await deleteSimulateLoan(loanId);
          this.getSimulation();
          alert('Simulação excluída com sucesso!');
        } catch (error) {
          console.error('Erro ao excluir a simulação:', error);
          alert('Ocorreu um erro ao tentar excluir a simulação.');
        }
      }
    },
    async getSimulation() {
      try {
        const data = await getSimulateLoan();
        this.loanData = data;
      } catch (error) {
        console.error('Erro ao buscar dados de simulação:', error);
      }
    },

    newSimulation() {
      this.loanData = null;
      this.valueName = '';
      this.valueCpfCnpj = '';
      this.valueEmail = '';
      this.quantidadeParcelas = '';
      this.valorEmprestimo = '';
      this.selectedBank = '';

      this.openModal();
    },
  },
};
</script>

<style scoped>
/* Estilização extra opcional */
</style>
