//count tasks
//add tasks
$(function() {
    // Ejecutar al cargar la página
    countTasks();
    countRemains();
    
    $('footer').on('click', '#add', function(){
        if($('#input-task').val().length > 0) {

            $task = '<article>\
                <input type="checkbox">\
                <p>'+$('#input-task').val()+'</p>\
                <button>&times;</button>\
            </article>'
                $('section.list').append($task)
                $('#input-task').val('')
                countTasks()
                countRemains()            
        } else{
            alert('Please Enter a Task')
        }    
              
    });  
    
    $('body').on('click', 'input[type=checkbox]', function(){
        if ($(this).prop('checked')) {   
            $(this).parent().addClass('checked')
        } else { 
            $(this).parent().removeClass('checked')
        } 
        countRemains()                 
    }) 
    
    $('body').on('click', 'article button', function(){
        $(this).closest('article').remove()
        countTasks()
        countRemains()
    })
})

