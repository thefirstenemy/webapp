<template>
    <div>
        <table class="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in funcionarios" :key="item.id">
                <th scope="row">{{ item.userId }}</th>
                <td>{{ item.id }}</td>
                <td>{{ item.title }}</td>
                <td>{{ item.completed }}</td>
            </tr>    
        </tbody>
</table>
    </div>
</template>

<script>
export default {
    name: 'ListaFuncionarios',    
	data: function() {
		return {
			funcionarios: []
		}
  },
  

  
  mounted: function () {
      this.$http.get('https://jsonplaceholder.typicode.com/todos')
          .then(
            (response) => (
            this.funcionarios = JSON.parse(response.bodyText)            
          ),
          (erro)=>{
            console.log(erro)
          }
        );
    }
  	
}
</script>


<style lang="less" scoped>

</style>
