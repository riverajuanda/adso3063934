$(function() {
    $('footer').on('click', '#add', function() {
        const taskInput = $('#input-task');
        const taskValue = taskInput.val().trim();

        if (taskValue.length > 0) {
            const $task = $(`
                <article>
                    <input type="checkbox">
                    <p>${taskValue}</p>
                    <button>&times;</button>
                </article>
            `);

            $('section.list').append($task);
            taskInput.val('');

            // Add delete functionality
            $task.find('button').on('click', function() {
                $(this).closest('article').remove();
            });

        } else {
            alert('Please Enter a Task');
        }
    });
});