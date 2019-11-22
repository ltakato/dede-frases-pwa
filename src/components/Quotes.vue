<template>
  <div>
    <h1>Frases do Icônico Dedé</h1>

    <p v-if="requestFailed">Falha ao pegar as Frases. Tá fodda</p>

    <card v-for="frase in frases" :key="frase._id">
      <p class="quote">{{ frase.texto }}</p>
      <p>{{ frase.significado }}</p>
    </card>

    <modal width="100%" name="quote-form">
      <form>
        <h1>Nova Frase</h1>

        <label>Texto</label>
        <input v-model="quote.texto">

        <label>Significado</label>
        <input v-model="quote.significado">

        <button :disabled="!quote.significado && !quote.texto" @click.prevent="createQuote(quote)">Criar</button>
        <p v-if="creating">Perai que to criando ja...</p>
        <p v-if="failedToCreate">Deu ruim pra criar a frase... :/</p>
      </form>
    </modal>
  </div>
</template>

<style scoped>
  h1 {
    margin: 16px;
  }
  .quote {
    font-weight: 600;
    font-size: 24px;
  }

  form {
    padding: 20px;
    display: flex;
    flex-direction: column;
  }

  form input { margin: 10px 0; }
</style>

<script>
  import quotesService from '../services/quotes.http';
  import Card from './Card';

  export default {
    components: {
      card: Card
    },

    data: () => ({
      frases: [],
      requestFailed: false,
      creating: false,
      failedToCreate: false,
      pressTimer: null,
      quote: {
        texto: '',
        significado: ''
      }
    }),

    mounted() {
      let start = (e) => {
        if (e.type === 'click' && e.button !== 0) {
            return;
        }

        if (this.pressTimer === null) {
          this.pressTimer = setTimeout(() => {
            this.$modal.show('quote-form');
          }, 2300)
        }
      };

      let cancel = (e) => {
        if (this.pressTimer !== null) {
          clearTimeout(this.pressTimer);
          this.pressTimer = null;
        }
      };

      addEventListener("mousedown", start);
      addEventListener("touchstart", start);
      addEventListener("click", cancel);
      addEventListener("mouseout", cancel);

      quotesService.getAll()
        .then(res => {
          this.frases = res.data;
        })
        .catch((e) => {
          this.requestFailed = true;
        });
    },
    methods: {
      createQuote(quote) {
        try {
          this.creating = true;
          quotesService.create(quote);
          this.$modal.hide('quote-form');
        } catch (e) {
          this.failedToCreate = true;
          console.log('deu ruim pra criar', e);
        } finally {
          this.creating = false;
        }
      }
    }
  }
</script>
