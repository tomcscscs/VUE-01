<template>
  <Navigation />
  <div class="container">
    <div>
      <h1 class="">오.목</h1>
    </div>
    <div>{{ turn }} 님 차례</div>
    <div class="d-flex justify-content-center table table-bordered">
      <table class="border-dark">
        <tr v-for="(row, rowIdx) in field">
          <td
            v-for="(col, colIdx) in row"
            v-on:click="handleClick(rowIdx, colIdx)"
          >
            {{ convert(col) }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import Navigation from "@/common/Navigation.vue";

export default {
  components: { Navigation },
  data: function () {
    return {
      turn: "B",
      field: [
        new Array(10),
        new Array(10),
        new Array(10),
        new Array(10),
        new Array(10),
        new Array(10),
        new Array(10),
        new Array(10),
        new Array(10),
        new Array(10),
      ],
    };
  },
  methods: {
    convert: function (value) {
      if (value === "B") return "●";
      else if (value === "W") return "○";
      else return;
    },
    handleClick: function (rowIdx, colIdx) {
      console.log(rowIdx, colIdx);
      const row = this.field[rowIdx];
      if (row[colIdx]) {
        alert("같은 자리에 둘 수 없습니다.");
        return;
      }
      row[colIdx] = this.turn;
      // 검사해야될 후보군 가로
      this.field[rowIdx];

      // 검사해야될 후보군 세로
      this.field.map((elm) => elm[colIdx]);
      // 대각선 ↘ : 최상단 0의 컬럼인덱스 : colIdx-rowIdx
      this.field.map((elm, idx) => elm[colIdx - rowIdx + idx]);
      // 대각선 ↙ : 최상단 0의 컬럼인덱스 :
      this.field.map((elm, idx) => elm[colIdx + rowIdx - idx]);

      this.turn = this.turn === "B" ? "W" : "B";
    },
  },
  watch: {
    turn: function (newValue, oldValue) {
      console.log(newValue, oldValue);
    },
  },
  mounted: function () {
    console.log("mounted GameOmok");
  },
  unmounted: function () {
    console.log("unmounted GameOmok");
  },
};
</script>
<style scoped>
td {
  width: 48px;
  height: 48px;
  font-size: 1.5em;
  text-align: center;
  padding: 0;
  cursor: pointer;
}
</style>
