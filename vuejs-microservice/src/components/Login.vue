<template>
    <div id="login">
        <form class="form-signin">
        <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label for="inputEmail" class="sr-only">Email</label>
        <input type='email' id="inputEmail" class="form-control" placeholder="Email address" required autofocus v-model="mensagem">
				<p>{{ mensagem }}</p>
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" class="form-control" placeholder="Password" required>
        <button v-on:click='consomeApi' class="btn btn-lg btn-primary btn-block" type="button">Sign in</button>
        <p class="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
        </form>
    </div>
</template>


<script>
export default {
	name: 'Login',
	data: function() {
		return {
			id: "",
			name: "",
			serial_number: "",
      position: "",
			email: "",
			status: ""      
		}
  },
  
  methods:{
    consomeApi: function () {
      this.$http.get('http://localhost:4000/get-users')
          .then((response) => (
            console.log(response)
          ),
          (erro)=>{
            console.log(erro)
          }
        );
    }
  }
	
}
</script>




<style scoped>

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

</style>


