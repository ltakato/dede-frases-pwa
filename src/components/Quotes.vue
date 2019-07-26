<template>
  <div>
    <h1>Frases do Icônico Dedé</h1>

    <p v-if="requestFailed">Falha ao pegar as Frases. Tá fodda</p>

    <card v-for="frase in frases" :key="frase._id">
      <p class="quote">{{ frase.texto }}</p>
      <p>{{ frase.significado }}</p>
    </card>
  </div>
</template>

<style scoped>
  .quote {
    font-weight: 600;
    font-size: 24px;
  }
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
      requestFailed: false
    }),
    
    mounted() {
      quotesService.getAll()
        .then(res => {
          this.frases = res.data;
        })
        .catch((e) => {
          this.requestFailed = true;
        });
    }
  }
</script>