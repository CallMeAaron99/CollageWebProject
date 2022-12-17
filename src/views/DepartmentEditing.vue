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
                // 创建 name 搜索 url
                let nameUrl = new URL("departments", baseUrl)
                nameUrl.searchParams.append('name', this.department.name);
                axios.get(nameUrl.href).then(res => {
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
                // 创建 name 搜索 url
                let nameUrl = new URL("departments", baseUrl)
                nameUrl.searchParams.append('name', this.department.name);
                axios.get(nameUrl.href).then(res => {
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
