<template>
  <div>
    <b-container>
      <b-row>
        <b-col lg="12" sm="12">
          <b-breadcrumb>
            <b-breadcrumb-item :to="{ name: 'Home'}">Home</b-breadcrumb-item>
            <b-breadcrumb-item active>Link page</b-breadcrumb-item>
          </b-breadcrumb>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <ul class="list-unstyled">
            <li>
              <b>Original link</b>: <a :href="link.original_link">{{ link.original_link }}</a>
            </li>
            <li>
              <b>Created at</b>: {{ link.created | moment("DD.MM.YYYY, h:mm:ss") }}
            </li>
          </ul>
          <hr>
          <b-table striped hover :items="visits.items" :fields="visits.fields">
            <template #cell(ip)="data">
              {{ data.item.visitor_data.ip }}
            </template>
            <template #cell(country)="data">
              {{ data.item.visitor_data.country }}
            </template>
            <template #cell(region)="data">
              {{ data.item.visitor_data.region }}
            </template>
            <template #cell(country)="data">
              {{ data.item.visitor_data.country }}
            </template>
            <template #cell(city)="data">
              {{ data.item.visitor_data.city }}
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
  name: 'LinkPage',
  data: function() {
    return {
      link: {},
      visits: {
        items: [],
        fields: [
          {
            key: 'ip',
            label: 'IP',
          },
          {
            key: 'country',
            label: 'Country',
          },
          {
            key: 'region',
            label: 'Region',
          },
          {
            key: 'city',
            label: 'City',
          },
          {
            key: 'created',
            label: 'Created',
          },
        ],
      },
    }
  },
  methods: {

  },
  created() {
    axios
        .get(`link/${this.$route.params.id}`)
        .then(response => {
          this.link = response.data
          this.visits.items = response.data.visits
        })
        .catch(error => {
          this.$notify({
            group: 'main',
            type: 'warn',
            title: 'Error',
            text: `Loading LinkID=${this.$route.params.id} was failure`,
          })
        })
  },
}
</script>
