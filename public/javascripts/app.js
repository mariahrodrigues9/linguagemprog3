$(document).ready(function(){

    /** Carrega os dados do MongoDB e exibe em uma tabela em HTML **/
    $("#fetchdata").on('click', function () {
        $.get("/fetchdata", function (data) {
            var Aluno = data['data'];
            $("#trdata").html('');
            $("#message").hide();
            var string = '';
            $.each(Aluno, function (index, Aluno) {
                string += `<tr>
                    <td>${(index + 1)}</td>
                    <td>${Aluno._id}</td>
                    <td>${Aluno.School}</td>
                    <td>${Aluno.Sex}</td>
                    <td>${Aluno.Age}</td>
                    <td>${Aluno.Traveltime}</td>
                    <td>${Aluno.Studytime}</td>
                    <td>${Aluno.Failures}</td>
                    <td><button data-id="${Aluno._id}" class="edit" onclick="editAluno(event)">Editar</button></td>
                    <td><button data-id="${Aluno._id}" class="remove" onclick="deleteAluno(event)">Deletar</button></td>
                </tr>`;
            });
            $("#trdata").html(string);
        });
    });
    /** Importa os dados para o MongoDB **/
    $("#importdata").on('click', function () {
        $.get("/import", function (data) {
            $("#message").show().html(data['success']);
        });
    });
});

function deleteAluno(e) {
    $.ajax({
        type: 'DELETE',
        url: '/Aluno/'+e.target.dataset.id,
        success: function (response){
          window.location.href='/';
        },
        error: function(err){
          console.error(err);
        }
    });
}

function editAluno(e) {
    window.location.href='/Aluno/edit/' + e.target.dataset.id;
}
