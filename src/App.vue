<template>
  <div id="app">
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
                  <button class="btn btn-primary" id="sidebarToggle">切换菜单</button>
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
window.addEventListener('DOMContentLoaded', event => {
  const sidebarToggle = document.body.querySelector('#sidebarToggle');
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', event => {
      event.preventDefault();
      document.body.classList.toggle('sb-sidenav-toggled');
      localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
    });
  }
});
</script>

<style>
@import url('css/styles.css');
@import'~bootstrap/dist/css/bootstrap.css';
</style>