<template>
  <div class="project-detail-access">
    <v-card elevation="0">
      <v-card-title>
        <div class="project-detail-title">Access</div>

        <v-spacer></v-spacer>

        <v-btn
          small
          depressed
          color="primary"
          @click="showAddPeopleDialog = true"
        >
          Add people
        </v-btn>

        <v-dialog v-model="showAddPeopleDialog" max-width="500px">
          <v-card class="add-people-form">
            <v-card-title class="add-people-form-title">
              Add people
            </v-card-title>
            <v-autocomplete
              v-model="friends"
              :items="people"
              filled
              chips
              label="Select"
              item-text="name"
              return-object
              multiple
            >
              <template v-slot:selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  close
                  @click="data.select"
                  @click:close="remove(data.item)"
                >
                  <v-avatar left>
                    <v-img src=""></v-img>
                  </v-avatar>
                  {{ data.item.name }}
                </v-chip>
              </template>

              <template v-slot:item="data">
                <template>
                  <v-list-item-avatar size="30">
                    <img src="@/assets/defaultAvatar2.jpg" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ data.item.name }}
                    </v-list-item-title>
                  </v-list-item-content>
                </template>
              </template>
            </v-autocomplete>

            <v-card-actions class="add-people-form-actions">
              <v-btn @click="showAddPeopleDialog = false">Cancel</v-btn>
              <v-btn color="primary" @click="submit">Add</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-title>

      <v-text-field
        class="access-search-input"
        v-model="search"
        dense
        clearable
        label="Search"
        outlined
        type="text"
      >
        <template v-slot:append>
          <v-icon small>fas fa-search</v-icon>
        </template>
      </v-text-field>

      <v-data-table :headers="headers" :items="members" :search="search">
        <template v-slot:[`item.role`]="{ item }">
          <div v-if="item.pivot.role === 1">Lead</div>
          <div v-else>Member</div>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon x-small @click="deleteItem(item)"> fas fa-trash </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "project-detail-access",

  props: {
    members: Array,
  },

  data() {
    return {
      search: "",
      showAddPeopleDialog: false,
      headers: [
        {
          text: "Name",
          align: "start",
          value: "name",
          width: "35%",
        },
        { text: "Email", value: "email", width: "35%" },
        { text: "Role", value: "role", width: "30%" },
        {
          text: "",
          value: "actions",
          sortable: false,
          align: "end",
          width: "10%",
        },
      ],
      membersClone: [],
      people: [
        {
          name: "Sandra Adams",
          group: "Group 1",
          avatar: "@/assets/defaultAvatar2.jpg",
        },
        {
          name: "Ali Connors",
          group: "Group 1",
          avatar: "@/assets/defaultAvatar2.jpg",
        },
        {
          name: "Trevor Hansen",
          group: "Group 1",
          avatar: "@/assets/defaultAvatar2.jpg",
        },
        {
          name: "Tucker Smith",
          group: "Group 1",
          avatar: "@/assets/defaultAvatar2.jpg",
        },
        {
          name: "Britta Holt",
          group: "Group 2",
          avatar: "@/assets/defaultAvatar2.jpg",
        },
        {
          name: "Jane Smith ",
          group: "Group 2",
          avatar: "@/assets/defaultAvatar2.jpg",
        },
      ],
      friends: [],
    };
  },

  methods: {
    remove(item) {
      const index = this.friends.indexOf(item);
      if (index >= 0) this.friends.splice(index, 1);
    },

    submit() {
      console.log(this.friends);
    },
  },

  watch: {
    isUpdating(val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000);
      }
    },
  },

  members() {
    this.membersClone = this.members;
  },
};
</script>

<style scoped>
.project-detail-access {
  margin-bottom: 40px;
}

.access-search-input {
  width: 25%;
}

.add-people-form {
  padding: 20px 15px 20px 15px;
}

.add-people-form-title {
  padding: 0px 0px 20px !important;
}

.add-people-form-actions {
  justify-content: flex-end;
}

.v-list-item__title {
  display: flex;
  justify-content: flex-start;
}
</style>