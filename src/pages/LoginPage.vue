<script setup lang="ts">
  import { reactive, ref, watch } from 'vue'
  import { useAuth } from '@/composables/useAuth'
  import { useRouter } from 'vue-router'

  const { Login, Register } = useAuth()
  const router = useRouter()

  const stateLoginForm = ref(true)

  const formLogin = reactive({
    username: '',
    password: ''
  })

  const formRegister = reactive({
    name: '',
    email: '',
    telephone: '',
    password: ''
  })

  watch(
    () => stateLoginForm.value,
    () => {
      formLogin.username = ''
      formLogin.password = ''
      formRegister.name = ''
      formRegister.email = ''
      formRegister.telephone = ''
      formRegister.password = ''
    }
  )

  const onSubmit = () => {
    if (stateLoginForm.value)
      return Login(formLogin).then((data) => {
        if (data) router.replace({ name: 'dashboard' })
      })

    return Register(formRegister).then((data) => {
      if (data) stateLoginForm.value = true
    })
  }
</script>

<template>
  <div class="login">
    <div class="container-login">
      <div class="preview-login">
        <el-avatar :size="300" src="https://empty" @error="true">
          <img src="/images/aiot.png" />
        </el-avatar>
      </div>
      <div
        class="input-login"
        :style="{ 'margin-top': stateLoginForm ? '10%' : '3%' }"
      >
        <el-form v-if="stateLoginForm" :model="formLogin" @submit.prevent>
          <el-form-item>
            <el-input
              v-model="formLogin.username"
              placeholder="email or telephone"
              size="large"
            />
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="formLogin.password"
              type="password"
              show-password
              placeholder="password"
              size="large"
              @keyup.enter="onSubmit"
            />
          </el-form-item>
        </el-form>
        <el-form v-else :model="formRegister" @submit.prevent>
          <el-form-item>
            <el-input
              v-model="formRegister.name"
              placeholder="Input your name"
              size="large"
            />
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="formRegister.telephone"
              placeholder="Input your telephone"
              size="large"
            />
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="formRegister.email"
              placeholder="Input your email"
              size="large"
            />
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="formRegister.password"
              type="password"
              show-password
              placeholder="password"
              size="large"
              @keyup.enter="onSubmit"
            />
          </el-form-item>
        </el-form>
        <div class="button">
          <el-button
            type="button"
            round
            @click="stateLoginForm = !stateLoginForm"
            size="large"
            style="width: 50%"
            text
          >
            {{ stateLoginForm ? 'Tạo tài khoản' : 'Quay lại đăng nhập' }}
          </el-button>
          <el-button
            color="#a1bff0"
            style="color: #626aef; width: 30%"
            round
            plain
            size="large"
            @click="onSubmit"
            >Submit
          </el-button>
        </div>
        <div class="footer">
          <el-link href="" target="_blank" :underline="false" type="default">
            Bạn quên tài khoản ?
          </el-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  body {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .login {
    width: 100vw;
    height: 100vh;
    background-color: #f0f4f9;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;

    .container-login {
      width: 50%;
      height: 50%;
      background-color: rgb(255, 255, 255);
      border-radius: 35px;
      display: flex;
      justify-content: space-between;

      .preview-login {
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .input-login {
        width: 40%;
        margin-right: 5%;

        .el-input {
          height: 50px;
        }

        .button {
          margin-top: 15%;
          display: flex;
          gap: 15%;
        }

        .footer {
          margin-top: 15%;
          display: flex;
          justify-content: flex-end;
        }
      }
    }

    .el-form-item {
      margin-top: 30px;
    }
  }
</style>
