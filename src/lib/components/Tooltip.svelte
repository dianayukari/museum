<script>
	import { on } from "svelte/events";
  export let data

  let x
  let y

	function mouseMove(event) {
		x = event.pageX + 5;
		y = event.pageY + 5;
	}

</script >

<svelte:body on:mousemove={mouseMove}/>

<div>
    <div class="tooltip" style="left: {x}px; top: {y}px;">
        <div class="tooltip-content">
            <p>Posted at: {data}</p>
        </div>
    </div>
</div>

<style>


	@media (min-width:500px) {

  .tooltip {
    position: absolute;
    padding: 6px 10px;
    top: 100%;
    left: 0;
    background-color: #E9E6FB;
    border: none
    padding: 5px;
    z-index: 1000;
  }

}

</style>