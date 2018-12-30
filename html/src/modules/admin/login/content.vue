<template>
  <section>
    <div class="login-cont">
		
      <form action novalidate>

        <div class="form-group">
          <label for="user">用户名:</label>
          <input class="form-control" type="text" name id="user" placeholder="输入用户名">
        </div>
        <div class="form-group">
          <label for="pwd">密码:</label>
          <input class="form-control" type="password" name id="pwd" placeholder="输入密码">
        </div>
        <div class="form-group clearfix">
          <div class="pull-left">
			  <vue-checkbox>记住密码</vue-checkbox>
		  </div>
          <div class="pull-right"> <a href="javascript:;">忘记密码？</a></div>
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block">登录</button>
        </div>
      </form>
    </div>
  </section>
</template>


