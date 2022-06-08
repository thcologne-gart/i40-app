<template>
    <b-card :title = point :img-src= image img-top class="shadow p-3 mb-5 bg-white rounded" id="point">
        <hr>
        <b-card-text>
            {{ text }}
        </b-card-text>
    </b-card>
</template>

<script>
export default {
  props: {
    point: String,
    image: Image,
    text: String
  }
}
</script>

<style scoped>
.card {
    margin-inline: 5%;
    margin-bottom: 30px;
    margin-top: 12rem;
    max-width: 20%;
}
#point:hover {
  background-color: #F2B705 !important;
  color: #F2F2F2;
  transition: all 0.5s ease;
}
#point:hover img{
   -webkit-filter: invert(1);
   filter: invert(1);
}
.card-img-top {
    max-height: 60px;
}
.card-title {
    font-size: 110%;
}
</style>
