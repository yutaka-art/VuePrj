<template>
  <v-text-field v-bind="$attrs"
                v-on="$listeners"
                :class="textAlign === 'end' ? $style.end : textAlign === 'center' ? $style.center : $style.start">
    <template v-for="slot in parentSlots" #[slot]>
      <slot :name="slot" />
    </template>
    <template v-slot:label>
      <slot v-if="!requiredMark" name="label" />
      <label v-else>{{ $attrs.label }}※</label>
    </template>
  </v-text-field>
</template>

<script>
  /**
   * Vuetify の VTextField に機能を追加したコンポーネントを提供します。
   * @displayName App Text Field
   */
  export default {
    name: 'AppTextField',
    inheritAttrs: false,
    props: {
      /**
       * テキストの表示位置を指定します。
       * @values start, center, end
       */
      textAlign: {
        value: null,
        default: 'start',
        validator: function (value) {
          return !value || ['start', 'end', 'center'].indexOf(value) >= -1;
        },
      },
      /**
       * ラベルに必須のマークをつけるかどうか。デフォルトは false
       */
      requiredMark: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      parentSlots() {
        return Object.keys(this.$slots).filter(s => s !== 'label')
      },
    }
  }
</script>

<style module>
  .end input {
    text-align: right;
  }
  .start input {
    text-align: left;
  }
  .center input {
    text-align: center;
  }
</style>