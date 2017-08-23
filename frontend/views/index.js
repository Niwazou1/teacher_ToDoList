const domready = require('domready');
const Vue = require('vue/dist/vue.min');

domready(function(){
    let todo = document.getElementById('todo');
    if(!todo){
        return;
    }

    let vm = new Vue({
        el:"#todo",
        data: {
            newTodo: { body: '' },
            todos: []
        },
        methods: {
            createToDo: function(event){
                event.preventDefault();
                let value = this.newTodo.body && this.newTodo.body.trim();
                if(!value){
                    return;
                }
                this.todos.push({
                    body: this.newTodo.body,
                    isCompleted: false
                });
                this.newTodo.body = '';
            },
            deleteTodo: function(todo){
                this.todos.splice(this.todos.indexOf(todo), 1);
            }
        }
    });
});