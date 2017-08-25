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
            todos: JSON.parse(localStorage.getItem('phh-todos')) || []
        },
        methods: {
            createTodo: function(event){
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
            },
            purgeTodo: function(){
                this.todos = this.todos.filter(function(todo){
                    return !todo.isCompleted;
                });
            }   
        },
        computed: {
            activeTodos: function(){
                return this.todos.filter(function(todo){
                    return !todo.isCompleted;
                });
            },
            completedTodos: function(){
                return this.todos.filter(function(todo){
                    return todo.isCompleted;
                })
            }
        },
        watch: {
            todos: {
                handler: function(val){
                let todos_json = JSON.stringify(this.todos);
                localStorage.setItem('phh-todos', todos_json);
                }
            },
            deep: true
        }
    });
});