<template>
  <div id="app" :class="{toggled: is_toggled}">
    <div class="d-flex" id="wrapper">
      <!-- Sidebar-->
      <div class="border-end bg-dark" id="sidebar-wrapper">
            <div class="sidebar-heading border-bottom bg-dark">员工管理系统</div>
            <div class="list-group list-group-flush">
            <nav>
              <router-link class="list-group-item list-group-item-action list-group-item-dark p-3" to="/">员工管理</router-link>
              <router-link class="list-group-item list-group-item-action list-group-item-dark p-3" to="/EmployeeEditing">新增员工</router-link>
              <router-link class="list-group-item list-group-item-action list-group-item-dark p-3" to="/DepartmentList">部门管理</router-link>
              <router-link class="list-group-item list-group-item-action list-group-item-dark p-3" to="/DepartmentEditing">新增部门</router-link>
            </nav>
          </div>
      </div>
      <!-- Page content wrapper-->
      <div id="page-content-wrapper">
          <!-- Top navigation-->
          <nav class="navbar navbar-expand-lg">
              <div class="container-fluid">
                  <button class="btn btn-primary" id="sidebarToggle" @click="toggleMenu()">{{buttonText()}}</button>
                  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
              </div>
          </nav>
          <!-- Page content-->
          <div class="container-fluid">
            <router-view/>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      is_toggled: false
    }
  },
  methods: {
    // 收缩菜单
    toggleMenu(){
      this.is_toggled = !this.is_toggled;
    },
    // 菜单按钮文字
    buttonText(){
      if(this.is_toggled){
        return "展开菜单";
      }else{
        return "收缩菜单";
      }
    }
  }
}
</script>

<style>
@import'~bootstrap/dist/css/bootstrap.css';

body {
  background-color: #19191d;
}

ul {
    list-style-type: none;
}

input, select, button {
    outline: 0;
}

#wrapper {
  overflow-x: hidden;
}

#sidebar-wrapper {
  min-height: 100vh;
  margin-left: -15rem;
  transition: margin 0.25s ease-out;
}

#sidebar-wrapper .sidebar-heading {
  padding: 0.875rem 1.25rem;
  font-size: 1.2rem;
  color: #fff;
}

#sidebar-wrapper .list-group {
  width: 15rem;
}

#page-content-wrapper {
  min-width: 100vw;
}

.toggled #wrapper #sidebar-wrapper {
  margin-left: 0;
}

@media (min-width: 768px) {
  #sidebar-wrapper {
    margin-left: 0;
  }

  #page-content-wrapper {
    min-width: 0;
    width: 100%;
  }

  .toggled #wrapper #sidebar-wrapper {
    margin-left: -15rem;
  }
}

.content {
  padding-top: 3rem;
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

.form-all {
    border-radius: 3px;
    box-shadow: 0 4px 4px rgb(87 100 126 / 21%);
    background-color: #424756;
    color: #fff;
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