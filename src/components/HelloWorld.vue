<template>
  <div class="home-page">
    <div class="home-page-left">
      <div class="home-page-content">
        <div class="home-page-content-block">
          <div class="content-title">The development tool</div>
          <div class="content-title">used by agile teams</div>
        </div>
      </div>
    </div>

    <div class="home-page-right">
      <div class="home-page-img-border">
        <div class="home-page-img" :style="cssIamgeDiv"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      image: "@/assets/sprint-cycle.png",
      cssIamgeDiv: {
        backgroundImage: `url(${require("@/assets/sprint-cycle.png")})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
      },
    };
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.home-page {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;
  width: 100%;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 0.8743872549019608) 3%,
    rgba(9, 9, 121, 0.9192051820728291) 51%,
    rgba(6, 189, 226, 0.8995973389355743) 100%
  );
}

.home-page-left {
  display: flex;
  justify-content: center;
  align-items: center;
}

.home-page-right {
  display: flex;
  justify-content: center;
  align-items: center;
}

.home-page-content {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}

.home-page-content-block {
  display: block;
}

.home-page-img {
  height: 90%;
  width: 90%;
}

.home-page-img-border {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  height: 55%;
  width: 65%;
  border-radius: 10px;
}

.content-title {
  font-size: 55px;
  font-weight: 500;
}
</style>
