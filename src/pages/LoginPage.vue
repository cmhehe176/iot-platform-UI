<script setup>
import { reactive } from 'vue'

const form = reactive({
  username: '',
  password: ''
})
</script>
<template>
  <div class="login">
    <div class="container-login">
      <div class="preview-login">dd</div>
      <div class="input-login">
        <el-form>
          <el-form-item>
            <el-input v-model="form.username" placeholder="email or telephone" size="large" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.password" placeholder="password" size="large" />
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style scoped type="scss">
.login {
  width: 100vw;
  height: 100vh;
  background-color: #f0f4f9;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  .container-login {
    width: 50%;
    height: 50%;
    background-color: rgb(255, 255, 255);
    border-radius: 35px;

    .input-login {
      width: 40%;

      .el-input {
        height: 50px;
      }
    }
  }
}
</style>
