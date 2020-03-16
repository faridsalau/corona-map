<script>
  export let cases;
  import states from "../util/states.js";
  import { convertTime } from "../util/timezone.js";
  import { onMount } from "svelte";

  const minZoom = 4;
  const gestureHandling = "auto";
  let container;
  let map;
  let zoom = 4;
  let center = { lat: 39.381, lng: -97.922 };
  let sum = 0;

  onMount(async () => {
    var openWindow;
    map = new google.maps.Map(container, {
      minZoom,
      zoom,
      center,
      gestureHandling
    });
    let sum = 0;
    cases.forEach(covidCase => {
      states.forEach(state => {
        if (state.state === covidCase.province) {
          let content = `
              <div id="content">
                <div id="siteNotice"></div>
                <h1 id="firstHeading" class="firstHeading">${state.state}</h1>
                <div id="bodyContent">
                  <p>
                    <ul>
                      <li><b>Last updated:</b> ${
                        convertTime(covidCase.lastUpdate) === undefined
                          ? covidCase.lastUpdate
                          : convertTime(covidCase.lastUpdate)
                      }
                      </li>
                      <li>
                        <b>Confirmed cases:</b> ${covidCase.confirmed}
                      </li>  
                      <li>
                        <b>Deaths:</b> ${covidCase.deaths}
                      </li>  
                      <li>
                        <b>Recovered:</b> ${covidCase.recovered}
                      </li>  
                    </ul>
                  </p>
                </div>
              </div>`;
          const infowindow = new google.maps.InfoWindow({
            content
          });
          let position = {
            lat: state.latitude,
            lng: state.longitude
          };
          var marker = new google.maps.Marker({
            map: map,
            draggable: false,
            animation: google.maps.Animation.DROP,
            position,
            title: state.state
          });
          marker.addListener("click", function() {
            if (openWindow) {
              openWindow.close();
            }
            infowindow.open(map, marker);
            openWindow = infowindow;
          });
        }
      });
    });
  });
</script>

<style>
  .full-screen {
    height: 95vh;
  }
</style>

<div class="full-screen" bind:this={container} />
