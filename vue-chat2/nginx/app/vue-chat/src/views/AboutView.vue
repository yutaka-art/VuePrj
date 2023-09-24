<template>
  <div id="inspire">
    <v-app>
      <sidebar/>
      <v-app-bar app shrink-on-scroll>
        <v-toolbar-title>社員検索</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-app-bar>

      <v-main>
        <v-container fluid>
          <div style="margin-left: 15px; margin-right: 15px;">
            <v-row>
              <v-text-field
                append-icon="mdi-magnify"
                label="検索"
                single-line
                hide-details
                v-model="searchVal"
              ></v-text-field>
              <v-spacer></v-spacer>
              <v-btn elevation="2" v-on:click="getData" outlined>検索</v-btn>
              &nbsp;
              <v-btn elevation="2" v-on:click="onClickAdd" outlined>新規追加</v-btn>
            </v-row>
            <v-row>
              <v-col>
                <v-data-table 
                      v-bind:headers="headers"
                      v-bind:items="items"
                      v-bind:fixed-header="true"
                      height="100%"
                      show-select
                      item-key="employeeNo"
                      v-model="selected"
                      v-bind:loading="loading"
                      locale="ja-jp"
                      loading-text="読込中"
                      no-data-text="データがありません。"
                      v-bind:items-per-page="10">

                    <!-- <template v-slot:[`item.action`]="{ item }">
                      <v-btn elevation="2" v-on:click="onClickEdit(item)" outlined>編集</v-btn>
                    </template> -->

                    <template v-slot:item="{ item, isSelected }">
                      <tr :class="tableRowClass(item, isSelected)">
                        <td>
                          <v-simple-checkbox :value="isSelected" v-on:input="toggleRow(item)" class="v-data-table__checkbox" hide-details />
                        </td>
                        <td>{{ item.employeeNo }}</td>
                        <td>{{ item.employeeName }}</td>
                        <td>{{ item.sex }}</td>
                        <td>{{ item.birthDate }}</td>
                        <td>{{ item.tenureStatus }}</td>
                        <td>{{ item.employmentStatus }}</td>
                        <td>{{ item.locationName }}</td>
                        <td>{{ item.joinedDate }}</td>
                        <td>{{ item.retirementDate }}</td>
                        <td>{{ item.joinPeriod }}</td>
                        <td>{{ item.departmentName }}</td>
                        <td>{{ item.positionName }}</td>
                        <td>{{ item.responsibility }}</td>
                        <td>
                          <v-btn elevation="2" v-on:click="onClickEdit(item)" outlined>編集</v-btn>
                        </td>
                      </tr>
                    </template>
                </v-data-table>
              </v-col>
            </v-row>
          </div>

        </v-container>
      </v-main>

    </v-app>
  </div>
</template>

<script>
  import Sidebar from '@/components/layouts/Sidebar'

  export default {
    components:{
      Sidebar
    },
    data() {
        return {
            loading: false,
            selected: [],
            headers: [
                { text: '社員番号', value: 'employeeNo' },
                { text: '氏名', value: 'employeeName' },
                { text: '性別', value: 'sex' },
                { text: '生年月日', value: 'birthDate' },
                { text: '在職状態', value: 'tenureStatus' },
                { text: '雇用形態', value: 'employmentStatus' },
                { text: '勤務地', value: 'locationName' },
                { text: '入社年月日', value: 'joinedDate' },
                { text: '退職年月日', value: 'retirementDate' },
                { text: '入社期', value: 'joinPeriod' },
                { text: '部署', value: 'departmentName' },
                { text: '役職', value: 'positionName' },
                { text: '職責', value: 'responsibility' },
                { text: "操作", value: "action" },
            ],
            items: [
                // {
                //   employeeNo: '17', 
                //   employeeName: '森川 順二',
                //   sex: 0,
                //   birthDate: '1943/10/29',
                //   joinedDate: '2016/10/15',
                // },
           ],
           searchVal:''
        }
    },
    computed: {
    },
    methods: {
      // getIp() {
      //   this.axios.get('https://httpbin.org/get')
      //     .then((response) => {
      //       alert(response.data.origin);
      //     })
      //     .catch((e) => {
      //       alert(e);
      //     });
      // },

      async getData() {
        //this.axios.get('http://localhost:34587/api/EmployeeMaster')
        // this.axios.get('/api/EmployeeMaster')
        //   .then((response) => {
        //     this.members = response.data
        //   })
        //   .catch((e) => {
        //     alert(e);
        //   });
        // const params = {}

        this.loading = true;

        this.selected =[];

        let params = {
          name: this.searchVal
        }

        // if (this.searchVal == ''){
        //   params.name = '*'
        //   //return;
        // }

        this.axios.headers
        let result = await this.axios.get('/api/EmployeeMaster', {
                        params
                    })
                    .catch(e => {
                      alert(e);
                    });
        if (!result) return;

        this.items = [];
        result.data.forEach(t =>{
          // console.log(t.employeeNo);

          // 性別
          switch(t.sex){
            case 0:
              t.sex = "男性";
              break;
            case 1:
              t.sex = "女性";
              
              break;
            default:
              break;
          }

          if (t.birthDate != null){
            t.birthDate = t.birthDate.substr(0,10);
          }
          if (t.joinedDate != null){
            t.joinedDate = t.joinedDate.substr(0,10);
          }
          if (t.retirementDate != null){
            t.retirementDate = t.retirementDate.substr(0,10);
          }

          this.items.push(t);

        });

        this.loading = false;

        //this.members = result.data
      },
      onClickAdd() {
        let targetUrl = "edit?employee_No=0&mode=1";
        //window.location.assign(targetUrl);
        //location.href = targetUrl;
        this.$router.push({path:targetUrl})
        // this.$router.push({
        //   name: 'EditView',
        //   params: {
        //     employee_No: 0,
        //     mode: 1
        //   }
        // })

      },
      onClickEdit(item) {
        let targetUrl = "edit?employee_No=";
        targetUrl += item.employeeNo + "&mode=2"
        this.$router.push({path:targetUrl})
      },
      toggleRow (item) {
        if (this.selected.includes(item)) {
          // item が含まれていたら除去する
          this.selected = this.selected.filter(v => v !== item)
        }
        else
        {
          // item を追加する
          this.selected.push(item)
        }
      },
      tableRowClass (item, isSelected) {
        let klasses = []
        if (item.retirementDate != null) klasses.push('grey') // status が active だったら tr に grey クラスを追加する
        if (isSelected) klasses.push('v-data-table__selected') // checkbox が選択されていたら tr に v-data-table__selected クラスを追加する
        return klasses.join(' ')
      }
    },
  }
</script>