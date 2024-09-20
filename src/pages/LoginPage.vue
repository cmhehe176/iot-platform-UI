<script setup lang="ts">
  import { reactive, ref } from 'vue'
  import { useAuth } from '@/composables/useAuth'
  import { useRouter } from 'vue-router'

  const { Login } = useAuth()
  const router = useRouter()

  const formRef = ref()
  const form = reactive({
    username: '',
    password: ''
  })

  const onSubmit = () => {
    Login(form).then((data) => {
      if (data) router.replace({ name: 'dashboard' })
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
      <div class="preview-login">
        <el-avatar :size="300" src="https://empty" @error="true">
          <img src="/images/aiot.png" />
        </el-avatar>
      </div>
      <div class="input-login">
        <el-form ref="formRef" :model="form" @submit.prevent>
        <el-form ref="formRef" :model="form" @submit.prevent>
          <el-form-item>
            <el-input
              v-model="form.username"
              placeholder="email or telephone"
              size="large"
            />
            <el-input
              v-model="form.username"
              placeholder="email or telephone"
              size="large"
            />
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="form.password"
              type="password"
              show-password
              placeholder="password"
              size="large"
            />
            <el-input
              v-model="form.password"
              type="password"
              show-password
              placeholder="password"
              size="large"
            />
          </el-form-item>
          <div class="button">
            <el-button type="button" round size="large" style="width: 50%" text>
              Tạo tài khoản
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
            <el-link href="" target="_blank" :underline="false" type="default"
              >Bạn quên tài khoản ?
            </el-link>
          </div>
          <div class="button">
            <el-button type="button" round size="large" style="width: 50%" text>
              Tạo tài khoản
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
            <el-link href="" target="_blank" :underline="false" type="default"
              >Bạn quên tài khoản ?
            </el-link>
          </div>
        </el-form>
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
        margin: 10% 5%;
      .input-login {
        width: 40%;
        margin: 10% 5%;

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
