$(document).ready(function () {
	
	//URL_NAME
	let url_name = 'http://127.0.0.1:8000/';

    //Imask.js -> Config 'Telefone'
    IMask(document.getElementById('celular'), {
        mask: '(00) 00000-0000'
    });

    //Ajax Functions: Login

    $('.contactForm').on('submit', function (e) {
        e.preventDefault();
            $('#button-contact').prop('disabled', true);
            $('#button-contact').html('Aguarde...');
            $.ajax({
                type: "POST",
				headers: {
                'Accept': 'application/json',
                },
		        dataType: "json",
                url: url_name + 'contact/new',
                data: $('.contactForm').serialize(),
                success: function (data) {
                    createErrorMessage('Em breve responderemos seu e-mail.', 'Enviado', '#2ecc71', 'contact');
                    $('#button-contact').html('Obrigado!');
                },
			    error: function (error){
                     createErrorMessage(error.responseJSON.message, '#e74c3c', 'contact');
                }
            });
    });
	
	//Error Messages

    function createErrorMessage(message, error, color, type){
        var html =  '* ' + message + ' <small>(' + error + ')</small>';
        $('.response-output-' + type).html(html);
        $('.response-output-' + type).css('color', color);
    }

});