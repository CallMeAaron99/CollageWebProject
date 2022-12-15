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

<style>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: Inter, sans-serif;
    background-color: #19191d;
    color: #FFFFFF;
    line-height: 1.5;
}

ul {
    list-style-type: none;
}

input,
select,
button {
    outline: 0;
}

.form-all {
    border-radius: 3px;
    box-shadow: 0 4px 4px rgb(87 100 126 / 21%);
    background-color: #424756;
    max-width: 752px;
    margin: 72px auto;
}

.form-line {
    padding: 12px 10px;
    margin: 12px 4px;
    border-radius: 3px;
    position: relative;
    transition: background-color .15s;
    width: 100%;
}

.form-line-column {
    width: calc(50% - 8px);
}

.form-input {
    font-size: 1em;
    border-radius: 4px;
    border-width: 1px;
    border-style: solid;
    min-width: 100%;
    max-width: 100%;
    background-color: #838895;
    border-color: rgba(17, 17, 27, 0.75);
    color: #2c3345;
    height: 2.5em;
}

.form-input-wide {
    width: 100%;
}

.form-textbox {
    padding: 0 0.625em;
}

.form-section {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    border-bottom: 1px solid;
    padding: 1em 52px;
    border-color: #11111B;
}

.form-header {
    border-bottom: 1px solid;
    margin: 0 -38px;
    padding: 1em 52px;
    border-color: #11111B;
}

.header-text {
    text-align: left;
    flex-grow: 1;
    margin-bottom: auto;
    margin-top: auto;
}

.form-input:hover {
    border-color: rgba(17, 17, 27, 0.5);
    box-shadow: 0 0 0 2px rgba(17, 17, 27, 0.25);
}

.form-input:focus {
    border-color: #66afe9;
    box-shadow: 0 0 0 3px rgba(17, 17, 27, 0.25);
}

.form-buttons-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    position: relative;
    margin: 0 -56px;
    padding: 1em 52px;
    border-top: 1px solid;
    border-color: #11111B;
}

.buttons {
    background-color: #2E69FF;
    border-color: #2E69FF;
    width: auto;
    min-width: 180px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 3em;
    border-radius: 4px;
    border: 1px;
    cursor: pointer;
    font-weight: 500;
    margin-left: 10px;
}

.buttons:hover {
    background-color: #1C3F99;
    border-color: #1C3F99;
}
</style>