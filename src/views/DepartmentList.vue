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

<style>
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Inter, sans-serif;
  background-color: #19191d;
  font-weight: 300;
  font-size: 1rem;
  line-height: 1.5;
  text-align: left;
}

input, select{
  outline: 0;
}

.content {
  padding-top: 3rem;
}

.container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  max-width: 1140px;
}

.custom-table {
  min-width: 900px;
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 1rem;
  color: #212529;
}

.custom-table thead tr,
.custom-table thead th {
  border-top: none;
  border-bottom: none;
  color: #fff;
}

.custom-table tbody th,
.custom-table tbody td {
  color: #838895;
  font-weight: 400;
  padding-bottom: 20px;
  padding-top: 20px;
  min-width: 100px;
}

.custom-table tbody tr:not(.spacer) {
  border-radius: 7px;
  overflow: hidden;
  transition: .3s all ease;
}

.custom-table tbody tr:not(.spacer):hover {
  box-shadow: 0 2px 10px -5px rgba(0, 0, 0, 0.1);
}

.custom-table tbody tr th,
.custom-table tbody tr td {
  background: #25252b;
  border: none;
  transition: .3s all ease;
}

.custom-table tbody tr th:first-child,
.custom-table tbody tr td:first-child {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}

.custom-table tbody tr th:last-child,
.custom-table tbody tr td:last-child {
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}

.custom-table tbody tr.spacer td {
  padding: 0;
  height: 3px;
  border-radius: 0;
  background: transparent;
}

.custom-table tbody tr.active th,
.custom-table tbody tr.active td,
.custom-table tbody tr:hover th,
.custom-table tbody tr:hover td {
  color: #fff;
  background: #2e2e36;
}

.custom-table tbody tr.active th a,
.custom-table tbody tr.active td a,
.custom-table tbody tr:hover th a,
.custom-table tbody tr:hover td a {
  color: #fff;
}

.add-button {
  margin-bottom: 2rem;
}

.buttons{
  background-color: #2E69FF;
  border-color: #2E69FF;
  width: 180px;
  color: #fff;
  height: 3em;
  border-radius: 4px;
  border: 1px;
  cursor: pointer;
  font-weight: 500;
}

.buttons:hover {
  background-color: #1C3F99;
  border-color: #1C3F99;
}

.search-wrapper{
  padding: 12px 10px;
  border-radius: 3px;
  position: relative;
  display: flex;
  transition: background-color .15s;
  color: #fff;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
}

.search-bar{
  font-size: 1em;
  border-radius: 4px;
  border-width: 1px;
  border-style: solid;
  width: 310px;
  background-color: #838895;
  border-color: rgba(17, 17, 27, 0.75);
  color: #2c3345;
  height: 2.5em;
  padding: 0 0.625em;
  margin: 0 10px;
}

.search-bar:hover {
  border-color: rgba(17, 17, 27, 0.5);
  box-shadow: 0 0 0 2px rgba(17, 17, 27, 0.25);
}

.search-bar:focus {
  border-color: #66afe9;
  box-shadow: 0 0 0 3px rgba(17, 17, 27, 0.25);
}
</style>