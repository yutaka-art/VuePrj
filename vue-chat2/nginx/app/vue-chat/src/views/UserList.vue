<template>
  <v-app id="inspire">
    <sidebar/>
    <v-app-bar app shrink-on-scroll>
      <v-toolbar-title>ユーザ一覧</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- <v-toolbar dense>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Title</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar> -->

    <v-main>
      <v-container>
        <v-btn v-on:click="apiCall">test</v-btn>

        <v-row>
          <v-col
            v-for="n in 24"
            :key="n"
            cols="4"
          >
          <router-link :to="{ path: '/chat', query: { user_id: n }}">
            <v-avatar color="grey lighten-2" size="128"></v-avatar>
          </router-link>
          </v-col>
        </v-row>

        <template>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    label="Picker without buttons"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
        </template>

      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Sidebar from '@/components/layouts/Sidebar'
export default {
  components:{
    Sidebar
  },
  data: () => ({
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      // menu: false,
      // modal: false,
      menu2: false,
  }),
  methods:{
    async apiCall(){
      // alert('test')
      //this.axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
      let result = await this.axios.get('/api/todoItems', {
                    })
                    .catch(e => {
                      alert(e);
                    });
        if (!result) return;
    }
  }
}
</script>