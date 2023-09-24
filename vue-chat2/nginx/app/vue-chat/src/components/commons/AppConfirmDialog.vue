<template>
  <v-dialog v-model="dialog"
            :max-width="width"
            :persistent="true"
            @keydown.esc="choose(false)">
    <v-card tile>
      <v-toolbar v-if="Boolean(title)" dense flat>
        <v-icon v-if="Boolean(icon)" left>{{ icon }}</v-icon>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text class="body-1 text-body-1 py-3">{{ message }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="choose(true)">
          はい
        </v-btn>
        <v-btn @click="choose(false)">
          いいえ
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
/**
 * 確認ダイアログを定義します。
 */
export default {
  props: {
    /**
     * アイコンを指定します。
     */
    icon: {
      type: String,
      default () {
        return this.$vuetify.icons.values.warning
      }
    },
    /**
     * 幅を指定します。
     */
    width: {
      type: Number,
      default: 450
    }
  },
  data () {
    return {
      dialog: false,
      title: "確認",
      message: "よろしいですか？",
    }
  },
  mounted () {
    document.addEventListener('keyup', this.onEnterPressed)
  },
  destroyed () {
    document.removeEventListener('keyup', this.onEnterPressed)
  },
    methods: {
    /**
     * タイトルとメッセージを指定してダイアログを表示します。戻り値として Promise が戻るため完了まで待機させられます。
     * @param title ダイアログに表示するタイトルです。
     * @param message ダイアログに表示するメッセージです。
     */
    open(title, message) {
      this.title = title || "確認"
      this.message = message
      this.dialog = true
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    onEnterPressed (e) {
      if (e.keyCode === 13) {
        e.stopPropagation()
        this.choose(true)
      }
    },
    choose (value) {
      this.resolve(value)
      this.dialog = false
    }
  }
}
</script>
