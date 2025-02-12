<script>
  import { base } from '$app/paths';
</script>

<div class="menu">
  <h1 class="title"><a href="{base}/"> The social museum</a></h1>
   <div>
    <a class="protocol" href="{base}/captured">Captured today</a>
    <a class="captured" href="https://docs.google.com/document/d/179_LOzVvq4IH9WjDdiJvk2bT6fvvuLKxquMQifcGMxY/edit?tab=t.0"> Research Protocol</a>
  </div>
</div>
<hr>


<style>

.menu {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 1rem;
  flex-wrap: nowrap;
}

.title {
  flex: 2;  
  text-align: left;
}

h1 {
  font-size: 24px;
}

.protocol {
  flex: 1;
  font-size: 14px;
}

.captured {
  flex: 1;
  font-size: 14px;
  padding: 1rem;
}

hr {
  margin: 0;
  border: none;
  height: 1.5px;
  background-color: #1C1C1A;
}


	@media (max-width:500px) {

    .menu {
      flex-wrap: wrap;
    }

    .title {
      text-align: left;
      font-size: 18px;
      margin-right: 20px;
    }

  }

</style>
