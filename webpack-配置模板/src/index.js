

//懒加载
let button=document.createElement('button')
button.innerHTML="点我"
button.style.backgroundColor="red"
button.addEventListener('click',function(){
    import('../units/a.js').then((data)=>{
        console.log(data)
    })
})
document.body.appendChild(button)

// import "../units/a"
// import "../units/b"
// import $ from 'jquery'
// console.log($)
// console.log('index-------------')

// import React from 'react';
// import ReactDOM from 'react-dom';
// function Test(){
//     return <div>hello world</div>
// }

// ReactDOM.render(<Test/>,document.getElementById('box'))


// console.log("index111111")
// class Log{
//     constructor(){
//         console.log('error')
//     }
// }
// let log=new Log()
// import jquery from 'jquery'
// console.log(DEV)
// import moment from 'moment';

// //手动引入所需要的语言
// import 'moment/locale/zh-cn'
// moment.locale('zh-cn')

// let r=moment().endOf('day').fromNow();
// console.log(r)

// let xhr=new XMLHttpRequest()
// xhr.open('GET','api/user',true)
// xhr.onload=function(){
//     console.log(xhr.response)

// }
// xhr.send()
