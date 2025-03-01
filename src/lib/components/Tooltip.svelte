<script>
	import { on } from "svelte/events";
  export let place
  export let position

  let x
  let y

  const positionDisplayNames = {
    'front': 'Giving their back to the artwork',
    'back': 'Facing the artwork',
    'sitting': 'Sitting',
    'side': 'On their side',
    'other': 'Unusual'
  };

  const placeDisplayNames = {
    'tate': 'Tate Modern',
    'mplusmuseum': 'M+ Museum',
    'centrepompidou': 'Centre Pompidou',
    'institutotomieohtake': 'Instituto Tomie Ohtake',
    'themuseumofmodernart': 'MoMA',
    'mca_australia': 'MCA Australia'
   };

	function mouseMove(event) {
		x = event.pageX + 5;
		y = event.pageY + 5;
	}

  function getDisplayName(pos) {
    return positionDisplayNames[pos] || placeDisplayNames[pos] || pos;
  }

</script >

<svelte:body on:mousemove={mouseMove}/>

<div>
    <div class="tooltip" style="left: {x}px; top: {y}px;">
        <div class="tooltip-content">
            <p>Place: <br><span class="hover-value">{getDisplayName(place)}</span></p>
            <p>Position: <br><span class="hover-value">{getDisplayName(position)}</span></p>
        </div>
    </div>
</div>

<style>

	@media (min-width:500px) {

  .tooltip {
    position: absolute;
    padding: 10px 12px;
    top: 100%;
    left: 0;
    background-color: #F6F1FA;
    border: none
    z-index: 1000;
    color: #8827FF;
    border: 2px solid #8827FF;
    border-radius: 4px;
  }

  .hover-value {
    font-weight: 500;
    color: #101010;
  }
  
  p {
    margin: 6px 0;
    padding: 0;
  }

}

</style>