<template>
  <div class="sidebar">
    <input type="checkbox" id="check" />

    <label for="check">
      <i id="toogle-button" class="fa fa-angle-right"></i>
    </label>
    <div class="sidebar-content"></div>
  </div>
</template>

<script>
export default {
  name: "the-side-bar",
};
</script>

<style>
.sidebar {
  background-color: #fafbfc;
  border-right: 1px solid #cccccc;
}

.sidebar-checkbox {
  background-color: #fafbfc;
}

.sidebar-content {
  width: 25px;
  height: 100%;
  background-color: #fafbfc;
  transition: all 0.3s ease;
}

#check {
  display: none;
  width: 0;
  height: 0;
}

label #toogle-button {
  position: absolute;
  cursor: pointer;
  left: 14px;
  top: 95px;
  width: 22px;
  height: 22px;
  border-radius: 100%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  border: 1px solid #cccccc;
}

#check:checked ~ .sidebar-content {
  width: 240px;
}

#check:checked ~ label #toogle-button {
  left: 229px;
  transform: rotate(180deg);
  transition: all 0.3s ease;
}
</style>