<template>
  <div>
    <b-container>
      <b-row>
        <b-col class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <b-breadcrumb>
            <b-breadcrumb-item active>Home</b-breadcrumb-item>
          </b-breadcrumb>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <b-table striped hover :items="links" :fields="fields">
            <template #cell(uuid)="data">
              <router-link :to="{ name: 'LinkPage', params: { id: data.item.uuid }}">Visits</router-link>
            </template>
            <template #cell(created)="data">
              {{ data.item.created | moment("DD.MM.YYYY, h:mm:ss") }}
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import * as axios from 'axios'

export default {
  name: 'HomePage',
  data: function() {
    return {
      fields: [
        {
          key: 'uuid',
          label: 'Visits',
        },
        {
          key: 'original_link',
          label: "Original",
          sortable: true
        },
        {
          key: 'visited_count',
          label: "Visited count",
          sortable: true
        },
        {
          key: 'created',
          sortable: false
        },
      ],
      links: [],
    }
  },
  methods: {

  },
  created() {
    axios
        .get(`link`)
        .then(response => {
          this.links = response.data.results
        })
        .catch(error => {
          this.$notify({
            group: 'main',
            type: 'warn',
            title: 'Error',
            text: `Loading links list was failure`,
          })
        })
  },
}
</script>
