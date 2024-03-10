<template>
  <Navigation />
  <div class="container">
    <!-- 배너 영역-->
    <div class="p-3 bg-dark text-white rounded-2">
      <h3 class="m-0">방.문.후.기</h3>
    </div>
    <!-- 글 작성 폼 영역-->
    <div>
      <div class="py-2 text-secondary"># 후기를 남겨주세요.</div>
      <form v-on:submit.prevent="handleSubmit">
        <div class="row g-1">
          <div class="col-3">
            <input
              type="text"
              class="form-control"
              placeholder="작성자.."
              @:input="handleWriterInput"
              :value="enteredWriter"
            />
          </div>
          <div class="col-3">
            <input
              type="password"
              class="form-control"
              placeholder="비밀번호.."
              v-model="enteredPassword"
            />
          </div>
        </div>
        <div class="row g-1 align-items-stretch mt-1">
          <div class="col-10">
            <textarea
              placeholder="남길말..."
              class="form-control"
              style="resize: none"
              ref="message"
            ></textarea>
          </div>
          <div class="col-2">
            <button type="submit" class="form-control h-100 btn btn-secondary">
              등록
            </button>
          </div>
        </div>
      </form>
    </div>
    <!-- 작성된 글 리스트 영역-->
    <div>
      <div class="py-2 text-secondary"># 작성된 후기들</div>
      <div v-if="isLoading" class="p-5 d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <ul v-else class="p-1">
        <li v-for="one in comments" class="row g-1">
          <span class="col-2">{{ one.writer }}</span>
          <span class="col-10">{{ one.message }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Navigation from "@/common/Navigation.vue";
export default {
  components: { Navigation },
  data: function () {
    return {
      isLoading: true,
      comments: [],
      enteredWriter: "",
      enteredPassword: "",
    };
  },
  methods: {
    handleWriterInput: function (e) {
      this.enteredWriter = e.target.value;
    },
    handleSubmit: function (e) {
      const data = {
        writer: this.enteredWriter,
        password: this.enteredPassword,
        message: this.$refs.message.value,
      };

      fetch("http://192.168.4.22:8080/api/visitbook", {
        method: "post",
        headers: {
          "content-type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          this.enteredPassword = "";
          this.$refs.message.value = "";
          this.enteredWriter = ""; // X
          this.handleReload();
        })
        .catch();
    },
    handleReload: function () {
      this.isLoading = true;
      fetch("http://192.168.4.22:8080/api/visitbook", {
        method: "get",
      })
        .then((response) => response.json())
        .then((result) => {
          this.isLoading = false;
          this.comments = result;
        })
        .catch((err) => {
          window.alert("데이터 로드에 실패 : " + err);
        });
    },
  },

  mounted: function () {
    this.handleReload();
  },
};

// export default component;
</script>
