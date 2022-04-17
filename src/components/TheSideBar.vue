<template>
  <div class="sidebar">
    <input type="checkbox" id="check" />

    <label for="check" @click="toggleSidebar()">
      <i id="toggle-button" class="fa fa-angle-left"></i>
    </label>

    <div class="sidebar-content">
      <div v-if="isShowSidebar" class="sidebar-content-detail">
        <div class="sidebar-header">
          <div class="project-icon">
            <i class="fa fa-building-o fa-2x" aria-hidden="true"></i>
          </div>

          <div class="project-name">Project Name</div>
        </div>

        <div class="sidebar-item">
          <div class="sidebar-item-icon">
            <i class="fa fa-th-list fa-lg" aria-hidden="true"></i>
          </div>

          <div class="sidebar-item-name">Product Backlog</div>
        </div>

        <div class="sidebar-sprint" v-for="sprint in sprints" :key="sprint.id">
          <div class="sidebar-item" @click="changeShowingSprintId(sprint.id)">
            <div class="sidebar-item-icon">
              <i class="fa fa-repeat fa-lg" aria-hidden="true"></i>
            </div>

            <div class="sidebar-item-name">{{ sprint.name }}</div>
          </div>

          <div v-if="showingSprintId === sprint.id">
            <div class="sidebar-subitem">
              <div class="sidebar-item-icon">
                <i class="fa fa-th-list fa-lg" aria-hidden="true"></i>
              </div>

              <div class="sidebar-item-name">Backlog</div>
            </div>

            <div class="sidebar-subitem">
              <div class="sidebar-item-icon">
                <i class="fa fa-tasks fa-lg" aria-hidden="true"></i>
              </div>

              <div class="sidebar-item-name">Board</div>
            </div>

            <div class="sidebar-subitem">
              <div class="sidebar-item-icon">
                <i class="fa fa-check-square fa-lg" aria-hidden="true"></i>
              </div>

              <div class="sidebar-item-name">Review</div>
            </div>

            <div class="sidebar-subitem">
              <div class="sidebar-item-icon">
                <i class="fa fa-thumb-tack fa-lg" aria-hidden="true"></i>
              </div>

              <div class="sidebar-item-name">Retrospective</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "the-side-bar",

  data() {
    return {
      isShowSidebar: true,
      showingSprintId: -1,

      sprints: [
        {
          id: 1,
          name: "Sprint 1",
        },
        {
          id: 2,
          name: "Sprint 2",
        },
        {
          id: 3,
          name: "Sprint 3",
        },
      ],
    };
  },

  methods: {
    toggleSidebar() {
      this.isShowSidebar = !this.isShowSidebar;
      console.log(this.isShowSidebar);
    },

    changeShowingSprintId(id) {
      if (id === this.showingSprintId) {
        this.showingSprintId = -1;
      } else {
        this.showingSprintId = id;
      }
    },
  },
};
</script>

<style>
.sidebar {
  background-color: #fafbfc;
  border-right: 1px solid #cccccc;
  font-size: 14px;
  padding: 7px 8px;
}

.sidebar-checkbox {
  background-color: #fafbfc;
}

.sidebar-content {
  width: 240px;
  height: 100%;
  background-color: #fafbfc;
  transition: all 0.3s ease;
}

#check {
  display: none;
  width: 0;
  height: 0;
}

label #toggle-button {
  position: absolute;
  cursor: pointer;
  left: 229px;
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
  width: 25px;
}

#check:checked ~ label #toggle-button {
  left: 14px;
  transform: rotate(180deg);
  transition: all 0.3s ease;
}

.sidebar-content-detail {
  display: block;
}

.sidebar-header {
  display: flex;
  justify-content: center;
  align-items: center;
}

.project-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
}

.project-name {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 70%;
  font-weight: 500;
}
.sidebar-sprint {
  display: block;
  width: 100%;
}

.sidebar-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 40px;
  width: 100%;
  margin: 2px 0px;
  padding: 8px 10px;
  border-radius: 3px;
  cursor: pointer;
}

.sidebar-item:hover {
  background-color: #94a0ac;
  color: #343a40;
  font-weight: 500;
}

.sidebar-item-icon {
  min-width: 45px;
}

.sidebar-subitem {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 40px;
  width: 80%;
  margin: 2px 30px;
  padding: 8px 10px;
  border-radius: 3px;
  cursor: pointer;
}

.sidebar-subitem:hover {
  background-color: #94a0ac;
  color: #343a40;
  font-weight: 500;
}
</style>