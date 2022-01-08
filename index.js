const express=require('express');
const app=express();
const path=require('path');
const port=8000;
//const port = Process.env.PORT || 3000 ;
//setting  view engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
//using middlewares
app.use(express.urlencoded())
//require database

const db=require('./config/mongoose')
//require database schema
const Todo=require('./models/todo')


//accessing static files
app.use(express.static('assets'));

var todoList=[
    // {
    //     todo:'gym',
    //     desc:'8851840604'
    // },
    // {
    //     todo:'tution',
    //     desc:'9212424292'
    // },
    // {
    //     todo: 'dance',
    //     desc:'8826230950'
    // }
]
//render home page
app.get('/',function(req,res){
    Todo.find({},function(err,todos){
        if(err){
            console.log(err)
        }
        res.render('home',{
            title:"home",
            todo_list:todos
        });

    })
    // res.render('home',{
    //     title:"home",
    //     todo_list:todoList
    // });
   
   
    
})
//posting todos to db
app.post('/todo-page',function(req,res){
    console.log(req.body)
    // todoList.push({
    
    //         todo:req.body.todo,
    //         desc:req.body.desc
    //     })


        // todoList.push(req.body)
        // return res.redirect('/')


        Todo.create({
            todo:req.body.todo,
            desc:req.body.desc,
            date:req.body.date,
         
        },function(error,newTodo){
            if(error){
                console.log("error",error);
                return;
            }
      
            console.log('********',newTodo);
            return res.redirect('back')
    
            
        })
})
//deleting tasks
app.get('/deleteTask/',function(req,res){
    // let name=req.query.name;
    // console.log(name)
    // let todoIndex=todoList.findIndex(todo=>todo.name==name);
    // if(todoList!=-1){
    //     todoList.splice(todoIndex,1);
    // }
    // let id=req.query.id;
    let id = req.query;
    console.log(id);
    //storing the checked items
    let checkboxes=Object.keys(id).length;
    console.log(checkboxes)
    for(let i=0;i<checkboxes;i++){
        Todo.findByIdAndDelete(Object.keys(id)[i],function(err){
            if(err){
                        console.log(err);
                        return;
                    }
            
           return res.redirect('back')

        })
    }
    // Todo.findByIdAndDelete(id,function(err){
    //     if(err){
    //         console.log(err);
    //         return;
    //     }
    //     return res.redirect('back')

    // })
    
    // return res.redirect('back')

 });

app.listen(port,function(err){
    if(err){
        console.log("error in loading",err);
    }
    console.log("express server is up and running at port",port);
   
})
