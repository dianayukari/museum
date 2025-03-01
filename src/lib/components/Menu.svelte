<script>
  import { base } from '$app/paths';
  import { page } from '$app/stores';

</script>

<div class="menu">
  <h1 class="title"><a href="{base}/"> The Social Museum</a></h1>
   <div>
    <a class="images" href="{base}/filterimages/" class:active={$page.url.pathname === base + '/filterimages/'}>
      Explore the images</a>
    <a class="protocol" href="{base}/protocol/" class:active={$page.url.pathname === base + '/protocol/'}> 
      Behind the research</a>
    <a class="captured" href="{base}/captured/" class:active={$page.url.pathname === base + '/captured/'}>
      Captured today</a>
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
  font-size: 26px;
}

.images, .captured, .protocol {
  flex: 1;
  font-size: 16px;
}

.protocol {
  padding: 1rem;
}

hr {
  margin: 0;
  border: none;
  height: 1.5px;
  background-color: #1C1C1A;
}

a.active {
  color: #8827FF;
  font-weight: 600;
}

a:hover {
  color: #8827FF;
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
