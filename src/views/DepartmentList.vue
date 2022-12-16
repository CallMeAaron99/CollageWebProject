<template>
  <div class="content">
    <div class="container">
      <div class="search-wrapper">
        部门名称:
        <input type="text" class="search-bar" v-model="departmentName">
        <button class="buttons" @click="searchDepartment(departmentName)">搜索</button>
      </div>
      <table class="custom-table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">部门名称</th>
          </tr>
        </thead>
        <tbody v-for="(item, index) in departments" :key="index">
          <tr scope="row">
            <td>{{item.id}}</td>
            <td>{{item.name}}</td>
            <td>
              <div class="action">
                <button class="btn btn-primary btn-xs" data-toggle="modal" data-target="#editStudentModal" @click="updateDepartment(item)">修改</button>
                <button class="btn btn-danger btn-xs" @click="deleteDepartment(item)">删除</button>
              </div>
            </td>
          </tr>
          <tr class="spacer">
            <td colspan="100"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import router from '@/router';

const baseUrl = 'http://localhost:3000';

export default {
  data(){
    return {
      departmentName: "",
      departments: []
    }
  },
  created(){
    this.getDepartmentList();
  },
  methods: {
    // 获取列表
    getDepartmentList(){
      axios.get(new URL("departments", baseUrl)).then(res=>{
        this.departments = res.data; // 获得部门信息
      });
    },
    // 搜索
    searchDepartment(departmentName){
      if(departmentName){ // 名称搜索
        let url = new URL("departments", baseUrl);
        url.searchParams.append('name', departmentName);
        axios.get(url.href).then(res=>{
          this.departments = res.data; // 获得部门信息
        })
      }else{
        this.getDepartmentList();
      }
    },
    // 删除
    deleteDepartment(item){
      axios.get(new URL("employees?department_id=" + item.id, baseUrl)).then(res => {
        if(res.data.length == 0){  // 有员工关联该部门
          if(confirm('确定删除部门"' + item.name + '"?')){
            axios.delete(new URL("departments/" + item.id, baseUrl)).then(res => { this.getDepartmentList(); });
          }
        }else{
          alert("此部门还有关联员工, 无法删除");
        }
      });
    },
    // 更新
    updateDepartment(item){
      router.push({
          name: "DepartmentEditing",
          params: { data: item }
      });
    }
  }
}
</script>
