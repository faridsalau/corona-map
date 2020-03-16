<script>
  import { onMount } from "svelte";
  import Article from "./Article.svelte";
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 2);
  const finalDate = yesterday.toISOString();
  const url = `https://newsapi.org/v2/everything?q=covid-19&from=${finalDate}&apiKey=623b1adc559146dfae630fa2c426d95e`;
  let articles = [];
  onMount(async () => {
    const res = await fetch(url);
    const json = await res.json();
    articles = json.articles.slice(0, 10);
  });
</script>

<style>
  .scrolling-wrapper {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    -ms-overflow-style: none;
    margin: 10px;
  }
  .scrolling-wrapper::-webkit-scrollbar {
    display: none;
  }
</style>

<div class="scrolling-wrapper">

  {#if articles.lenght !== 0}
    {#each articles as article}
      <Article {article} />
    {/each}
  {/if}

</div>
