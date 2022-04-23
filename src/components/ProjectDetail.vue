<template>
  <div class="project-detail">
    <v-card elevation="0">
      <v-card-title>
        <div class="project-detail-title">Details</div>
      </v-card-title>

      <v-card-text class="project-detail-content">
        <div class="project-detail-details">
          <div class="project-detail-label">Name</div>
          <v-text-field v-model="projectName" dense outlined></v-text-field>

          <div class="project-detail-label">Key</div>
          <v-text-field v-model="projectKey" dense outlined></v-text-field>

          <div class="project-detail-label">Project lead</div>
          <v-select
            v-model="projectLeadComputed"
            :items="members"
            :menu-props="{ bottom: true, offsetY: true }"
            cache-items
            outlined
            clearable
            dense
          >
            <template v-slot:selection="{ item, attrs }">
              <v-list-item v-bind="attrs">
                <v-avatar size="16" class="mr-2">
                  <img src="@/assets/defaultAvatar2.jpg" />
                </v-avatar>

                <v-list-item-content>
                  <v-list-item-title class="combobox-item-name">
                    {{ item.name }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>

            <template v-slot:item="{ item, attrs, on }">
              <v-list-item v-on="on" v-bind="attrs">
                <v-avatar size="16" class="mr-2">
                  <img src="@/assets/defaultAvatar2.jpg" />
                </v-avatar>

                <v-list-item-content>
                  <v-list-item-title class="combobox-item-name">
                    {{ item.name }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-select>

          <div class="project-detail-label">
            <v-btn small depressed color="primary"> Save</v-btn>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "project-detail",

  data() {
    return {
      projectName: "",
      projectKey: "",
      projectLead: null,
      members: [
        { id: 1, name: "Nguyen Thanh Dung" },
        { id: 2, name: "Le Canh Kieu Oanh" },
        { id: 3, name: "Pham Van Tanh" },
      ],
      isEditCombobox: true,
    };
  },

  computed: {
    projectLeadComputed: {
      get() {
        console.log("get");
        if (this.projectLead) {
          return this.projectLead;
        } else {
          return {};
        }
      },
      set(item) {
        const selectedItem = JSON.parse(JSON.stringify(item));
        this.projectLead = selectedItem;
      },
    },
  },
};
</script>

<style scoped>
.project-detail {
  margin-bottom: 40px;
}

.project-detail-content {
  margin: 8px 0px;
}

.project-detail-details {
  padding: 0px 25%;
}

.project-detail-label {
  display: flex;
  margin-bottom: 5px;
  font-weight: 500;
}

.combobox-item-name {
  display: flex !important;
  align-items: flex-start !important;
  padding: 0px 5px;
}
</style>