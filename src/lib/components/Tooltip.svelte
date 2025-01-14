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
            <p>{data.image_id}</p>
        </div>
    </div>
</div>

<style>

	.tooltip {
    position: absolute;
  }

</style>