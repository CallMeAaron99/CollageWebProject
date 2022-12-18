<template>
  <div class="content">
    <div class="container">
      <div class="search-wrapper">
        姓名:
        <input type="text" class="search-bar" v-model="employeeName">
        部门:
        <select class="search-bar" v-model="departmentId">
          <option value="0">--</option>
          <option v-for="(item, index) in departments" :key="index" :value="item[0]">{{item[1]}}</option>
        </select>
        <button class="buttons" @click="searchEmployee(employeeName, departmentId)">搜索</button>
      </div>
      <!-- <button class="add-button buttons">新增员工</button> -->
      <table class="custom-table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">姓名</th>
            <th scope="col">性别</th>
            <th scope="col">部门</th>
            <th scope="col">职称</th>
            <th scope="col">雇佣日期</th>
          </tr>
        </thead>
        <tbody v-for="(item, index) in employees" :key="index">
          <tr scope="row">
            <td>{{item.id}}</td>
            <td>{{item.name}}</td>
            <td>{{item.gender}}</td>
            <td>{{departments.get(item.department_id)}}</td>
            <td>{{item.title}}</td>
            <td>{{item.hire_date}}</td>
            <td>
              <div class="action">
                <button class="btn btn-primary btn-xs" data-toggle="modal" data-target="#editStudentModal" @click="updateEmployee(item)">修改</button>
                <button class="btn btn-danger btn-xs" @click="deleteEmployee(item)">删除</button>
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
      employeeName: "",
      departmentId: 0,
      employees: [],
      departments: new Map()
    }
  },
  created(){
    this.getEmployeeList();
  },
  methods: {
    // 获取列表
    getEmployeeList(){
      axios.get(new URL("departments", baseUrl)).then(res=>{
        // 将部门数据导入到 Map
        for(let i = 0; i < res.data.length; i++){
          this.departments.set(res.data[i].id, res.data[i].name);
        }
        return axios.get(new URL("employees", baseUrl));
      }).then(res=>{
        this.employees = res.data; // 获得员工信息
      });
      
    },
    // 搜索
    searchEmployee(employeeName, departmentId){
      departmentId = parseInt(departmentId);
      // 如果搜索条件存在
      if(employeeName || departmentId){
        let url = new URL("employees", baseUrl);
        if(employeeName){ // 姓名搜索
          url.searchParams.append('name', employeeName);
        }
        if(departmentId){ // 部门ID搜索
          url.searchParams.append('department_id', departmentId);
        }
        axios.get(url.href).then(res=>{
          this.employees = res.data; // 获得员工信息
        });
      }else{
        this.getEmployeeList();
      }
    },
    // 删除
    deleteEmployee(item){
      if(confirm('确定删除员工"' + item.name + '"?')){
        axios.delete(new URL("employees/" + item.id, baseUrl)).then(res=> { this.getEmployeeList() });
      }
    },
    // 更新
    updateEmployee(item){
      router.push({
          name: "EmployeeEditing",
          params: { data: item }
      });
    }
  }
}
</script>
