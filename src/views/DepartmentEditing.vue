<template>
  <div class="form-all">
        <ul class="form-section">
            <li class="form-input-wide">
                <div class="form-header">
                    <div class="header-text">
                        <h1>部门信息</h1>
                    </div>
                </div>
            </li>

            <li class="form-line">部门名称
                <div class="form-input-wide">
                    <input type="text" class="form-input form-textbox" v-model="department.name">
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
import axios from "axios"
import router from '@/router';

const baseUrl = 'http://localhost:3000';

export default {
    props: ['data'],
    data(){
        return {
            department: {
                id: 0,
                name: ""
            }
        }
    },
    created(){
        if(this.data){
            // 绑定编辑信息
            this.department = this.data;
        }
    },
    methods: {
        // 检查数据
        checkData(){
            this.department.name = this.department.name.trim();
            return Boolean(this.department.name);
        },
        // 更新
        updateDepartment(){
            if(this.checkData()){
                axios.get(new URL("departments?name=" + this.department.name, baseUrl)).then(res => {
                    if(res.data.length == 0){ // 有同名部门
                        axios.put(new URL("departments/" + this.department.id, baseUrl), this.department).then(res => {
                            alert("修改成功");
                            router.push('DepartmentList');
                        });
                    }else{
                        alert('修改失败, 部门"' + this.department.name + '"已存在');
                    }
                });
            }else{
                alert("修改失败, 信息填写不完整");
            }
        },
        // 添加
        addDepartment(){
            if(this.checkData()){
                axios.get(new URL("departments?name=" + this.department.name, baseUrl)).then(res => {
                    if(res.data.length == 0){ // 有同名部门
                        axios.post(new URL("departments", baseUrl), this.department).then(res => {
                            alert("添加成功");
                            router.push('DepartmentList');
                        });
                    }else{
                        alert('添加失败, 部门"' + this.department.name + '"已存在');
                    }
                });
            }else{
                alert("添加失败, 信息填写不完整");
            }
        },
        // 保存按钮事件
        save(){
            if(this.department.id){
                this.updateDepartment();
            }else{
                this.addDepartment()
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