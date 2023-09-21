<template>
    <div id="big-box" class="min-h-screen flex items-center justify-center">
        <el-card class="p-8 w-96">
            <h1 class="text-xl font-semibold mb-4">{{ isRegister ? '注册' : '登录' }}</h1>
            <div class="space-y-4">
                <el-input v-model="authForm.username" placeholder="用户名" prefix-icon="User">
                </el-input>
                <el-input v-model="authForm.password" type="password" placeholder="密码" prefix-icon="Lock">
                </el-input>
                <div v-if="isRegister">
                    <el-input v-model="authForm.confirmPassword" type="password" placeholder="确认密码" prefix-icon="Lock">
                    </el-input>
                </div>
                <div class="flex justify-between items-center mt-6">
                    <el-button @click="handleAuth" type="primary">{{ isRegister ? '注册' : '登录' }}</el-button>
                    <button @click="toggleMode" class="text-blue-500 hover:text-blue-600">{{ isRegister ? '已有账号？登录' :
                        '没有账号？注册' }}</button>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import router from '../router/index'
//导入axios请求方法
import http from '../utils/axios';
const authForm = ref({
    username: '',
    password: '',
    confirmPassword: ''
});
const isRegister = ref(false);
const handleAuth = async () => {
    try {
        if (isRegister.value) {
            const response = await http.post('/register', {
                username: authForm.value.username,
                password: authForm.value.password
            });
            ElMessage.success('注册成功');
            //转换为登录模式
            toggleMode();
            console.log("User registered:", response);
        } else {
            //登录
            const response = await http.post('/login', {
                username: authForm.value.username,
                password: authForm.value.password
            });
            ElMessage.success('登录成功');
            //等待1秒后跳转到首页
            setTimeout(() => {
                router.push('/layout');
            }, 1000);
            //将jwt存储到localStorage中
            localStorage.setItem('authToken', response.data);
            console.log("Logged in:", response);
        }
    } catch (error) {
        //如果是400错误，说明是用户输入错误，直接提示错误信息
        if (error.response && error.response.status === 400) {
            const errorMessage = error.response.data.error;
            ElMessage.error(errorMessage);
        } else {
            console.error("操作失败:", error);
            ElMessage.error('操作失败');
        }
    }
};
// 切换登录注册
const toggleMode = () => {
    isRegister.value = !isRegister.value;
    authForm.value.password = '';
    authForm.value.confirmPassword = '';
};

</script>
<style scoped>
#big-box {
    background-image: linear-gradient(0deg, #accbee 0%, #e7f0fd 100%)
}
</style>