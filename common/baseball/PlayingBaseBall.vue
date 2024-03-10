<template>
  <Navigation></Navigation>
  <div class="container">
    <h1 class="text-center text-danger py-2">숫.자.야.구.게.임</h1>
    <div class="d-flex justify-content-center" v-if="!isPlaying">
      <button class="btn btn-warning btn-lg text-white" v-on:click="handleInit">
        시작하기
      </button>
    </div>
    <!-- playing === true-->
    <div v-else>
      <div
        class="d-flex bg-danger text-white p-5 justify-content-around rounded-2"
        v-if="inputs.length > 0"
      >
        <span class="fs-1">{{ inputs[0] ?? "?" }}</span>
        <span class="fs-1">{{ inputs[1] ?? "?" }}</span>
        <span class="fs-1">{{ inputs[2] ?? "?" }}</span>
      </div>
      <div class="d-flex justify-content-end p-1" v-if="inputs.length > 0">
        <button class="btn btn-danger btn-sm" v-on:click="handleInputCancle">
          ←
        </button>
      </div>
      <div class="row row-cols-5 g-0">
        <div class="p-1" v-for="one of digits">
          <button
            class="btn btn-warning text-white w-100"
            v-on:click="handleInput(one)"
          >
            {{ one }}
          </button>
        </div>
      </div>
      <div class="d-flex justify-content-end p-1">
        <button class="btn btn-secondary btn-sm" v-on:click="handleGiveup">
          포기하기
        </button>
      </div>
      <div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item gap-1 d-flex" v-for="one of history">
            <span class="badge text-bg-warning">{{ one.raw[0] }}</span>
            <span class="badge text-bg-warning">{{ one.raw[1] }}</span>
            <span class="badge text-bg-warning">{{ one.raw[2] }}</span>
            <span class="badge text-bg-danger">{{ one.strike + "S" }}</span>
            <span class="badge text-bg-danger">{{ one.ball + "B" }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Navigation from "@/common/Navigation.vue";

export default {
  components: { Navigation },
  //
  data: function () {
    return {
      isPlaying: false,
      digits: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      inputs: [],
      targets: [],
      history: [],
    };
  },
  methods: {
    printQuery: function () {
      console.log(this.$route.query);
    },
    handleInput: function (value) {
      if (this.inputs.length === 3) {
        this.inputs = [];
      }

      this.inputs.push(value);
      if (this.inputs.length === 3) {
        this.proceedMatchTargets();
      }
    },
    handleInputCancle: function () {
      this.inputs.pop();
    },
    handleInit: function () {
      while (this.targets.length < 3) {
        const number = Math.floor(Math.random() * 10);
        if (!this.targets.includes(number)) {
          this.targets.push(number);
        }
      }
      console.log(this.targets);
      this.isPlaying = true;
    },
    handleGiveup: function () {
      this.isPlaying = false;
      this.inputs = [];
      this.targets = [];
    },
    proceedMatchTargets: function () {
      const result = this.inputs.map((elm, idx) => {
        const foundIdx = this.targets.indexOf(elm);
        if (foundIdx == -1) {
          return null;
        } else {
          return idx === foundIdx ? "S" : "B";
        }
      });
      const strike = result.filter((elm) => elm === "S").length;
      const ball = result.filter((elm) => elm === "B").length;

      this.history.unshift({
        raw: this.inputs,
        strike,
        ball,
      });

      if (strike === 3) {
        window.alert("축하드립니다.");
        this.isPlaying = false;
        this.$router.push("/baseball/ranking");
      }
    },
  },
  mounted: function () {
    this.printQuery();
  },
};
</script>
<style scoped>
/* */
</style>
