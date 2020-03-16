<script>
  export let article;
  import { convertTime } from "../util/timezone.js";
</script>

<style>
  .card-img-top {
    min-height: 200px;
  }
  a:visited {
    color: white;
  }
  .btn-primary {
    background-color: #ff3e00;
    border-color: #ff3e00;
  }
  .btn-primary:hover {
    background-color: #f56332;
    border-color: #f56332;
  }
  .card {
    min-height: 50vh;
    max-height: 50vh;
  }
</style>

<div class="container">
  <div class="card" style="width: 18rem;">
    <img class="card-img-top" src={article.urlToImage} alt="Card image cap" />
    <div class="card-body">
      Published: {convertTime(article.publishedAt)}
      <h5 class="card-title">{article.title}</h5>
      <a href={article.url} target="_blank" class="btn btn-primary">
        Go to article
      </a>
    </div>
  </div>
</div>
