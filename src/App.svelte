<script>
  import { onMount } from "svelte";
  import { convertTime } from "./util/timezone.js";
  import Map from "./components/Map.svelte";
  import Articles from "./components/Articles.svelte";
  export let ready;
  let cases = [];
  let lastChecked = "";
  let loading = true;
  let totalAmountOfCases = 0;
  let stateWithMostCases = "";
  let highestAmountOfCases = 0;
  onMount(async () => {
    const res = await fetch(
      "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats?country=USA",
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
          "x-rapidapi-key": "704cfcb0e1mshf21690e8e0c9810p18115bjsn95c3d3ce320a"
        }
      }
    );
    const json = await res.json();
    cases = json.data.covid19Stats;
    lastChecked = json.data.lastChecked;
    if (cases.length !== 0) {
      loading = false;
      cases.forEach(covidCase => {
        totalAmountOfCases += covidCase.confirmed;
        if (covidCase.confirmed > highestAmountOfCases) {
          highestAmountOfCases = covidCase.confirmed;
          stateWithMostCases = covidCase.province;
        }
      });
    }
    if (lastChecked !== "") {
      lastChecked =
        convertTime(lastChecked) === undefined
          ? lastChecked
          : convertTime(lastChecked);
    }
  });
</script>

<style>
  :global(body) {
    padding: 0;
  }

  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  div {
    border: black 1px solid;
    margin: 5px 0;
  }

  @media (min-width: 2px) {
    main {
      max-width: none;
    }
  }
</style>

<svelte:head>

  <script
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAmcKSbu2c0vVsK6HMARddIqYXfp_udkS8&callback=initMap"
    async
    defer>

  </script>
</svelte:head>

<main>
  {#if ready && !loading}
    <h1>Covid-19 cases in the USA</h1>
    <h3>Most recent update: {lastChecked}</h3>
    <div>
      <p>
        There are currently
        <b>{totalAmountOfCases}</b>
        total cases in the USA
      </p>
    </div>
    <div>
      <p>
        {stateWithMostCases} has the most cases with
        <b>{highestAmountOfCases}</b>
        total cases recorded.
      </p>
    </div>
    <Articles />
    <Map {cases} />
  {:else}
    <p>Loading...</p>
  {/if}

</main>
