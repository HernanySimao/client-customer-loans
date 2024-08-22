<script lang="ts" setup>
const data = ref({
  name: "",
  cpf: "",
  age: null as number | null,
  income: null as number | null,
  location: "",
});

const loans = ref<any[]>([]);

const save = async () => {
  if (!validateCPF(data.value.cpf)) {
    alert("CPF inválido!");
    return;
  }

  try {
    const res = await useIFetch("/customer-loans", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.value.name,
        cpf: data.value.cpf,
        age: data.value.age,
        income: data.value.income,
        location: data.value.location,
      }),
    });
    loans.value = res.data.value.loans;
  } catch (error) {
    throw createError({
      message: "Erro ao salvar os dados.",
    });
  }
};
</script>

<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="d-flex justify-content-center mt-5">
          <div class="col-md-6">
            <h1 class="text-center text-uppercase">Empréstimos</h1>
            <form @submit.prevent="save">
              <div class="form-floating mb-3">
                <input
                  v-model="data.name"
                  type="text"
                  class="form-control"
                  placeholder="John Doe"
                  required
                />
                <label>O seu nome</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  v-model="data.cpf"
                  type="text"
                  class="form-control"
                  placeholder="CPF"
                  required
                />
                <label>O seu CPF</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  v-model.number="data.age"
                  type="number"
                  class="form-control"
                  required
                  placeholder="Idade"
                />
                <label>A sua idade</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  v-model.number="data.income"
                  type="number"
                  class="form-control"
                  placeholder="Saldo disponível"
                  required
                />
                <label>Saldo disponível</label>
              </div>
              <div class="form-floating mb-3">
                <span></span>
                <select v-model="data.location" class="form-select" required>
                  <option value="" disabled selected>
                    Selecione o seu estado
                  </option>
                  <option value="SP">SP</option>
                  <option value="RJ">RJ</option>
                  <option value="MG">MG</option>
                </select>
                <label>Selecione o seu estado</label>
              </div>

              <button
                class="btn btn-dark rounded-0 w-100 text-uppercase p-2 fw-bold"
                type="submit"
              >
                Validar
              </button>
            </form>

            <div>
              <div class="mt-4">
                <span
                  class="border p-2 d-flex justify-content-center"
                  v-for="(item, i) in loans"
                  :key="i"
                >
                  {{ item.type }} {{ item.interest_rate }} %
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped>
.form-control
    box-shadow: none
</style>
