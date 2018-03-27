$(document).ready(() => {
   $('.delete-todo').on('click', (e) =>{
     $target = $(e.target);
     const id = $target.attr('data-id');
     $.ajax({
       type:'DELETE',
       url:'/todos/delete/'+id,
       success:(response) =>{
           alert('Todo deleting *_*');
           window.location.href='/';
       },
       error:(error)=>{
           console.log(error);
           
       }
     });
   });
});