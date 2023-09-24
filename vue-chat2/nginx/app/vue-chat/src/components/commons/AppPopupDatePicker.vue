<template>
  <div>
    <v-menu
      v-model="isOpenMenu"
      :close-on-content-click="false"
      offset-y
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <app-text-field
          v-model="textDate"
          :label="label"
          :error-messages="errorMessages"
          :hint="hint"
          :persistent-hint="persistentHint"
          v-on="on"
          @blur="blur"
          autocomplete="off"
          :required-mark="requiredMark"
        />
      </template>
      <v-date-picker
        ref="datePicker"
        v-model="calendarDate"
        @input="selectedDate"
        :min="textMinDate"
        :locale="locale"
        no-title
        type="date"
        color="primary"
      />
    </v-menu>
  </div>
</template>
<script>

const parseSourceDateTime = -62167252740000 // 0-1-1T0:0:0.0
const calendarDateFormat = 'yyyy-MM-dd'
// set min property
// because v-date-picker raise unknown exception when set minimum value.
const calendarMinDate = (new Date(1000, 0, 1, 0, 0, 0, 0)).getTime()

  /**
 * 日付を選択するためにポップアップしてカレンダーが表示されるテキストボックスです。
 */
export default {
  name: 'AppPopupDatePicker',
  props: {
    /**
     * 項目名
     */
    label: {
      type: String,
      default: null
    },
    /**
     * 選択された日付
     * @model
     */
    value: {
      type: Date,
      default: null
    },
    /**
     * エラーメッセージ 
     */
    errorMessages: {
      type: Array,
      default: () => []
    },
    /**
     * ロケール
     * @values ja, en
     */
    locale: {
      validator: function (value) {
        return ['ja', 'en'].indexOf(value) !== -1
      },
      default: 'ja'
    },
    /**
     * 入力ヒント
     */
    hint: {
      type: String,
      default: null
    },
    /**
     * 入力ヒントを表示し続けるかどうか
     */
    persistentHint: {
      type: Boolean,
      default: false
    },
    /**
     * 表示する日付のフォーマット
     */
    displayTextFormat: {
      type: String,
      default: null
    },
    /**
     * ラベルに必須のマークをつけるかどうか。デフォルトは false
     */
    requiredMark: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isOpenMenu: false,
      calendarDate: null,
      textDate: null,
      textMinDate: this.date_fns.format(new Date(calendarMinDate), calendarDateFormat)
    }
  },
  watch: {
    value(newVal) {
      this.consistent(newVal)
    },
    locale() {
      this.consistent(this.value)
    }
  },
  mounted() {
    this.consistent(this.value)
  },
  methods: {
    consistent(value) {
      if (!this.Libs.is.isValidDate(value)) {
        this.textDate = null
        this.calendarDate = null
        if (this.$refs.datePicker) this.$refs.datePicker.tableDate = this.date_fns.format(new Date(), calendarDateFormat)
        return
      }
      this.textDate = this.date_fns.format(value, this.getDisplayTextFormat())
      this.calendarDate = this.date_fns.format(value, calendarDateFormat)
    },
    blur(e) {
      const inputvalue = e.target.value
      if (!inputvalue) {
        this.setNull()
        /**
         * フォーカスが外れた時に発生します。
         *
         * @event blue
         */
        this.$emit('blur')
        return
      }
      const newValue = this.parseDateText(inputvalue, this.getDisplayTextFormat())
      this.setParsedNewValue(newValue)
      /**
       * フォーカスが外れた時に発生します。
       *
       * @event blue
       */
      this.$emit('blur')
    },
    selectedDate() {
      this.isOpenMenu = false
      const newValue = this.parseDateText(this.calendarDate, calendarDateFormat)
      this.setParsedNewValue(newValue)
    },
    getDisplayTextFormat() {
      if (this.displayTextFormat) return this.displayTextFormat
      const targetLocale = this.getLocale()
      return this.getDateFormat(targetLocale)
    },
    getLocale() {
      return (this.locale || this.$vuetify.lang?.current) || 'ja'
    },
    getDateFormat(locale) {
      return this.$vuetify.lang?.locales?.[locale]?.app?.dateDisplayFormat || 'yyyy-MM-dd'
    },
    setParsedNewValue(value) {
      if (!this.Libs.is.isValidDate(value) || this.isTooSmallDate(value)) {
        this.setNull()
      } else {
        this.valueChanged(value)
      }
    },
    isTooSmallDate(value) {
      return this.date_fns.compareAsc(value, new Date(calendarMinDate)) < 0
    },
    parseDateText(text, format) {
      const value = this.date_fns.parse(text, format, new Date(parseSourceDateTime))
      if (value.getTime() === parseSourceDateTime) {
        return new Date(undefined)
      }
      return value
    },
    setNull() {
      const oldValue = this.value
      this.valueChanged(null)
      if (oldValue === null) {
        this.consistent(null)
      }
    },
    valueChanged(newValue) {
      if (this.Libs.is.isNull(newValue) && this.Libs.is.isNull(this.value)) return
      if (Number.isNaN(newValue) && Number.isNaN(this.value)) return
      if (this.date_fns.isEqual(newValue, this.value)) return

      /**
       * v-modelの値が変わったときに発生します。
       *
       * @event input
       * @property {date} 新しい値
       */
      this.$emit('input', newValue)
      /**
       * 値が変わったときに発生します。
       * 
       * @event change
       */
      this.$emit('change')
    }
  }
}
</script>
