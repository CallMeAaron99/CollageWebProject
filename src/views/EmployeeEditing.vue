<template>
  <div class="form-all">
        <ul class="form-section">
            <li class="form-input-wide">
                <div class="form-header">
                    <div class="header-text">
                        <h1>员工信息</h1>
                    </div>
                </div>
            </li>

            <li class="form-line form-line-column">姓名
                <div class="form-input-wide">
                    <input type="text" class="form-input form-textbox" v-model="employee.name">
                </div>
            </li>

            <li class="form-line form-line-column">性别
                <div class="form-input-wide">
                    <select class="form-input" v-model="employee.gender">
                        <option value="">请选择</option>
                        <option value="男">男</option>
                        <option value="女">女</option>
                        <option value="N/A">N/A</option>
                    </select>
                </div>
            </li>

            <li class="form-line form-line-column">部门
                <div class="form-input-wide">
                    <select class="form-input" v-model="employee.department_id">
                        <option value="">请选择</option>
                        <option v-for="(item, index) in departments" :key="index" :value="item.id">{{item.name}}</option>
                    </select>
                </div>
            </li>

            <li class="form-line form-line-column">职称
                <div class="form-input-wide">
                    <input type="text" class="form-input form-textbox" v-model="employee.title">
                </div>
            </li>

            <li class="form-line">
                <div class="form-input-wide">
                    <div class="form-buttons-wrapper">
                        <button class="buttons" @click="save">保存</button>
                        <button class="buttons" @click="cancel">取消</button>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';
import router from '@/router';

const baseUrl = 'http://localhost:3000';

export default {
    props:['data'],
    data(){
        return {
            employee: {
                id: 0,
                name: "",
                gender: "",
                department_id: 0,
                title: ""
            },
            departments: []
        }
    },
    created(){
        this.getDepartmentList();
        if(this.data){
            // 绑定编辑信息
            this.employee = this.data;
        }
    },
    methods: {
        // 获取列表
        getDepartmentList(){
            axios.get(new URL("departments", baseUrl)).then(res=>{
                this.departments = res.data; // 获得部门信息
            });
        },
        // 检查数据
        checkData(){
            this.employee.name = this.employee.name.trim();
            this.employee.title = this.employee.title.trim();
            this.employee.department_id = parseInt(this.employee.department_id);
            return this.employee.name && this.employee.gender && this.employee.department_id && this.employee.title;
        },
        // 添加
        addEmployee(){
            if(this.checkData()){
                this.employee.hire_date = new Date().toJSON().slice(0, 10); // 雇佣时间 now
                axios.post(new URL("employees", baseUrl), this.employee).then(res=>{
                    alert("添加成功");
                    router.push('/');
                });
            }else{
                alert("添加失败, 信息填写不完整");
            }
        },
        // 更新
        updateEmployee(){
            if(this.checkData()){
                axios.put(new URL("employees/" + this.employee.id, baseUrl), this.employee).then(res=>{
                    alert("修改成功");
                    router.push('/');
                });
            }else{
                alert("修改失败, 信息填写不完整");
            }
        },
        // 保存按钮事件
        save(){
            if(this.employee.id){
                this.updateEmployee();
            }else{
                this.addEmployee()
            }
        },
        // 取消按钮事件
        cancel(){ router.push('/'); }
    }
}
</script>
