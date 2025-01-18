<script>
  import { base } from '$app/paths';
</script>

<div class="menu">
  <div class="left-spacer"></div>
  <h1 class="title"><a href="{base}/"> The social museum</a></h1>
  <a class="protocol" href="https://docs.google.com/document/d/179_LOzVvq4IH9WjDdiJvk2bT6fvvuLKxquMQifcGMxY/edit?tab=t.0"> Research Protocol</a>
</div>
<hr>


<style>

h1 {
  padding: 10px;
}

.menu {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 1rem;
  flex-wrap: nowrap;
}

.left-spacer {
  flex: 1;
}

.title {
flex: 2;  
text-align: center;
}

h1 {
  font-size: 24px;
  margin: 0;
}

.protocol {
  flex: 1;
  font-size: 14px;
  text-align: right;
}

hr {
  margin: 0;
  border: none;
  height: 1.5px;
  background-color: #1C1C1A;
}


	@media (max-width:500px) {

    .left-spacer{
      display: none;
    }

    .menu {
      flex-wrap: wrap;
    }

    .title {
      text-align: left;
    }

  }

</style>
