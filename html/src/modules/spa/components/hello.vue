<template>
  <div>
    <h3>Hello</h3>
    <btn>Default</btn>
    <btn type="primary">Primary</btn>
    <btn type="success">Success</btn>
    <btn type="info">Info</btn>
    <btn type="warning">Warning</btn>
    <btn type="danger">Danger</btn>
    <btn type="link">Link</btn>

    <dropdown ref="dropdown">
  <btn type="primary" class="dropdown-toggle">Dropdown <span class="caret"></span></btn>
  <template slot="dropdown">
    <li><a role="button">Action</a></li>
    <li><a role="button">Another action</a></li>
    <li><a role="button">Something else here</a></li>
    <li role="separator" class="divider"></li>
    <li><a role="button">Separated link</a></li>
  </template>
</dropdown>
<dropdown>
  <btn type="info">Split Button</btn>
  <btn type="info" class="dropdown-toggle"><span class="caret"></span></btn>
  <template slot="dropdown">
    <li><a role="button">Action</a></li>
    <li><a role="button">Another action</a></li>
    <li><a role="button">Something else here</a></li>
    <li role="separator" class="divider"></li>
    <li><a role="button">Separated link</a></li>
    
  </template>
</dropdown>
<!-- dropdown-examples.vue -->

 <dropdown class="form-group">
      <div class="input-group">
        <input class="form-control" type="text" v-model="date">
        <div class="input-group-btn">
          <btn class="dropdown-toggle"><i class="glyphicon glyphicon-calendar text-danger"></i></btn>
        </div>
      </div>
      <template slot="dropdown">
        <li>
          <date-picker v-model="date"/>
        </li>
      </template>
    </dropdown>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss">
</style>


