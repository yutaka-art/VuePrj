<template>
  <div id="inspire">
    <v-app>
      <sidebar/>
      <v-app-bar app shrink-on-scroll>
        <v-toolbar-title>社員メンテナンス【{{this.disp}}】</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-app-bar>
      <v-main>
        <v-container>
          <v-form ref="test_form">
            <v-row>
              <v-col>
                <!-- <app-text-field
                  required-mark
                  clearable
                  append-outer-icon="mdi-magnify"
                ></app-text-field> -->
                <v-text-field outlined v-model="employee_No" disabled label="社員番号"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field outlined v-model="srh_Result.employeeName" label="社員名" v-bind:rules="[required]"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-radio-group v-model="srh_Result.sex" row v-bind:rules="[required]">
                  <template v-slot:label>
                    <div>性別</div>
                  </template>
                  <v-radio label="男性" value="0"></v-radio>
                  <v-radio label="女性" value="1"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <template>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-menu
                        v-model="menu_birthDate"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="srh_Result.birthDate"
                            label="生年月日"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            v-bind:rules="[required]"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="srh_Result.birthDate"
                          @input="menu_birthDate = false"
                          :first-day-of-week="0"
                          locale="ja-jp"
                          no-title
                          type="date"
                          color="primary"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-spacer></v-spacer>
                  </v-row>
                </template>
              </v-col>
            </v-row>
            
            <v-row>
              <v-col>
                <v-select
                  v-model="selectedTenureItem"
                  v-bind:items="tenureMasterItems"
                  item-text="tenureStatus"
                  item-value="tenureCode"
                  label="在職状態"
                  persistent-hint
                  return-object
                  single-line
                  outlined
                >
                </v-select>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-select
                  v-model="selectedEmploymentItem"
                  v-bind:items="employmentMasterItems"
                  item-text="employmentStatus"
                  item-value="employmentCode"
                  label="雇用形態"
                  persistent-hint
                  return-object
                  single-line
                  outlined
                >
                </v-select>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-radio-group v-model="srh_Result.locationCode" row v-bind:rules="[required]">
                  <template v-slot:label>
                    <div>勤務地</div>
                  </template>
                  <!-- <v-radio label="大阪本社" value="1"></v-radio>
                  <v-radio label="東京本部" value="2"></v-radio> -->
                  <v-radio
                    v-for="item in locationMasterItems"
                    :key="item.locationCode"
                    :label="item.locationName"
                    :value="item.locationCode"
                  ></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <template>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-menu
                        v-model="menu_joinedDate"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="srh_Result.joinedDate"
                            label="入社年月日"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            v-bind:rules="[required]"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="srh_Result.joinedDate"
                          @input="menu_joinedDate = false"
                          :first-day-of-week="0"
                          locale="ja-jp"
                          no-title
                          type="date"
                          color="primary"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-spacer></v-spacer>
                  </v-row>
                </template>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <template>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-menu
                        v-model="menu_retirementDate"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="srh_Result.retirementDate"
                            label="退職年月日"
                            prepend-icon="mdi-calendar"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="srh_Result.retirementDate"
                          @input="menu_retirementDate = false"
                          :first-day-of-week="0"
                          locale="ja-jp"
                          no-title
                          type="date"
                          color="primary"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-spacer></v-spacer>
                  </v-row>
                </template>
              </v-col>
            </v-row>


            <v-row>
              <v-col>
                <v-btn v-on:click="executeUpdate" v-if="editFlg">編集</v-btn>
                <v-btn v-on:click="executeCreate" v-if="createFlg">作成</v-btn>                
              </v-col>
              <v-col>
                <v-btn v-on:click="executeDelete" v-if="editFlg">削除</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-main>
    </v-app>
    <app-confirm-dialog ref="confirmDialog"></app-confirm-dialog>
</div>
</template>

<script>
  import Sidebar from '@/components/layouts/Sidebar'
  // import AppTextField from '@/components/layouts/AppTextField.vue'

  export default{
    components:{
      'sidebar': Sidebar,
    },
    data: () => ({
      menu_joinedDate: false,
      menu_retirementDate: false,
      menu_birthDate: false,
      employee_No :'',
      disp:'',
      mode:'',
      editFlg:false,
      createFlg:false,
      tenureMasterItems:[],
      employmentMasterItems:[],
      locationMasterItems:[],
      selectedTenureItem:{},
      selectedEmploymentItem:{},
      selectedLocationItem:{},
      srh_Result:{
        employeeNo:"",
        employeeName:"",
        sex:"",
        birthDate:"",
        tenureCode:"",
        tenureStatus:"",
        employmentCode:"",
        employmentStatus:"",
        locationCode:"",
        locationName:"",
        joinedDate:"",
        retirementDate:"",
        joinPeriod:"",
        departmentCode:"",
        departmentName:"",
        positionCode:"",
        positionName:"",
        responsibility:"",
      },
      required: value => !!value || "必ず入力してください", // 入力必須の制約
      rules: {
        select: [(v) => !!v || "Item is required"],
        select2: [(v) =>  v.length>0 || "Item is required in select 2"], 
      }
    }),
    async created() {
      this.employee_No = this.$route.query.employee_No;
      let wkMode = this.$route.query.mode;
      this.mode = wkMode;

      switch(wkMode){
        case "1":
          this.disp = '追加'
          this.createFlg = true;

          return;
        case "2":
          this.disp = '編集'
          this.editFlg = true;
          break;
      }

      console.log('employee_No', this.employee_No);

      let targetUrl = "/api/EmployeeMaster/" + this.employee_No;

      let result = await this.axios.get(targetUrl)
                  .catch(e => {
                    alert(e);
                  });
      if (!result) return;

      this.srh_Result.employeeNo = result.data.employeeNo;
      this.srh_Result.employeeName = result.data.employeeName;
      this.srh_Result.sex = result.data.sex.toString(10);

      if (result.data.birthDate != null){
        this.srh_Result.birthDate = result.data.birthDate.substr(0,10);
      }

      this.srh_Result.tenureCode = result.data.tenureCode;
      this.srh_Result.tenureStatus = result.data.tenureStatus;
      this.srh_Result.employmentCode = result.data.employmentCode;
      this.srh_Result.employmentStatus = result.data.employmentStatus;

      this.srh_Result.locationCode = result.data.locationCode;
      this.srh_Result.locationName = result.data.locationName;

      if (result.data.joinedDate != null){
        this.srh_Result.joinedDate = result.data.joinedDate.substr(0,10);
      }
      if (result.data.retirementDate != null){
        this.srh_Result.retirementDate = result.data.retirementDate.substr(0,10);
      }

      this.srh_Result.joinPeriod = result.data.joinPeriod;
      this.srh_Result.departmentCode = result.data.departmentCode;
      this.srh_Result.departmentName = result.data.departmentName;
      this.srh_Result.positionCode = result.data.positionCode;
      this.srh_Result.positionName = result.data.positionName;
      this.srh_Result.responsibility = result.data.responsibility;

      this.selectedTenureItem.tenureCode = result.data.tenureCode;
      this.selectedEmploymentItem.employmentCode = result.data.employmentCode;
      this.selectedLocationItem.locationCode = result.data.locationCode;
    },
    async mounted(){

      let targetUrl = "/api/TenureMaster";
      let result = await this.axios.get(targetUrl)
                  .catch(e => {
                    alert(e);
                  });
      if (!result) return;

      this.tenureMasterItems = result.data;

      targetUrl = "/api/EmploymentMaster";
      result = await this.axios.get(targetUrl)
                  .catch(e => {
                    alert(e);
                  });
      if (!result) return;

      this.employmentMasterItems = result.data;

      targetUrl = "/api/LocationMaster";
      result = await this.axios.get(targetUrl)
                  .catch(e => {
                    alert(e);
                  });
      if (!result) return;

      this.locationMasterItems = result.data;

    },
    methods:{
      async executeUpdate(){
        // alert('osada');
        if (!this.$refs.test_form.validate()){
          alert('入力チェックエラー')
          return;
        }

        // 確認メッセージ
        const confirm = await this.$refs.confirmDialog.open("変更確認", "データを変更します。よろしいですか？")
        if (!confirm) return

        let reqUrl = "/api/EmployeeMaster/" + this.employee_No;

        const params = {
          employeeNo: this.employee_No,
          employeeName: this.srh_Result.employeeName,
          sex: this.srh_Result.sex,
          birthDate: this.srh_Result.birthDate,
          tenureCode: this.selectedTenureItem.tenureCode,
          employmentCode: this.selectedEmploymentItem.employmentCode,
          locationCode: this.srh_Result.locationCode,
          joinedDate: this.srh_Result.joinedDate,
          retirementDate: this.srh_Result.retirementDate
        };

        if (params.retirementDate == ""){
          params.retirementDate = null;
        }

        let result = await this.axios.put(reqUrl, params)
                    .catch(e => {
                      alert(e);
                    });
        if (!result) return;

        alert('Success')
      },
      async executeDelete(){

        // 確認メッセージ
        const confirm = await this.$refs.confirmDialog.open("削除確認", "データを削除します。よろしいですか？")
        if (!confirm) return

        let reqUrl = "/api/EmployeeMaster/" + this.employee_No;
        let result = await this.axios.delete(reqUrl)
                    .catch(e => {
                      alert(e);
                    });
        if (!result) return;

        alert('Success')
        this.$router.push({path:'/about'})
      },
      async executeCreate(){
        // alert('osada');
        if (!this.$refs.test_form.validate()){
          alert('入力チェックエラー')
          return;
        }

        // 確認メッセージ
        const confirm = await this.$refs.confirmDialog.open("追加確認", "データを追加します。よろしいですか？")
        if (!confirm) return

        let reqUrl = "/api/EmployeeMaster/"

        const params = {
          employeeNo: this.employee_No,
          employeeName: this.srh_Result.employeeName,
          sex: this.srh_Result.sex,
          birthDate: this.srh_Result.birthDate,
          tenureCode: this.selectedTenureItem.tenureCode,
          locationCode: this.srh_Result.locationCode,
          employmentCode: this.selectedEmploymentItem.employmentCode,
          joinedDate: this.srh_Result.joinedDate,
          retirementDate: this.srh_Result.retirementDate
        };

        if (params.retirementDate == ""){
          params.retirementDate = null;
        }

        let result = await this.axios.post(reqUrl, params)
                    .catch(e => {
                      alert(e);
                    });
        if (!result) return;

        this.employee_No = result.data.employeeNo;

        alert('Success')
      },
    }
  }
</script>

<style>
</style>