$(document).ready(function () {
	
	//URL_NAME
	let url_name = 'http://127.0.0.1:8000/';

    $('#bookModal').modal('show');

    let selectedHour = null;

    //Imask.js -> Config 'Telefone'
    IMask(document.getElementById('celular'), {
        mask: '(00) 00000-0000'
    });

    //Ajax Functions: Signup

    $('.signupForm').on('submit', function (e) {
        e.preventDefault();
        console.log('.signupForm');
        if ($('input[name=password]').val() == $('input[name=password_confirmation]').val()) {
            $('#button-signup').prop('disabled', true);
            $('#button-signup').html('Aguarde...');
            $.ajax({
                type: "POST",
                headers: {
                    'Accept': 'application/json',
                },
				dataType: "json",
                url: url_name + 'users/signup',
                data: $('.signupForm').serialize(),
                success: function (data) {
                    $('#block-signup-login').css('display', 'none');
                    $('#block-reservation').css('display', 'block');
                    $('input[name=user_token]').val(data['user_token']);
                    $('#user_name').html(data['user_name']);
                },
                error: function (error){
                    createErrorMessage(error.responseJSON.message, '#e74c3c', 'signup');
                    $('#button-signup').prop('disabled', false);
                    $('#button-signup').html('Fazer Cadastro');
                }
            });
        }else{
            createErrorMessage('As senhas digitadas não coincidem.', '#e74c3c', 'signup');
        }
    });

    //Ajax Functions: Login

    $('.loginForm').on('submit', function (e) {
        e.preventDefault();
            $('#button-login').prop('disabled', true);
            $('#button-login').html('Aguarde...');
            $.ajax({
                type: "POST",
                headers: {
                    'Accept': 'application/json',
                },
				dataType: "json",
                url: url_name + 'users/login',
                data: $('.loginForm').serialize(),
                success: function (data) {
                    $('#block-signup-login').css('display', 'none');
                    $('#block-reservation').css('display', 'block');
                    $('input[name=user_token]').val(data['user_token']);
                    $('#user_name').html(data['user_name']);
                },
                error: function (error){
                    createErrorMessage(error.responseJSON.message, '#e74c3c', 'login');
                    $('#button-login').prop('disabled', false);
                        $('#button-login').html('Fazer Login');
                }
            });
    });

    //Ajax Functions: Get hours

    $('.hoursForm').on('submit', function (e) {
        e.preventDefault();
            $('.response-output-hours').html('');
            $('#button-check-hours').prop('disabled', true);
            $('#button-check-hours').html('Aguarde...');
            $.ajax({
                type: "POST",
				headers: {
                    'Accept': 'application/json',
                },
				dataType: "json",
                url: url_name + 'book/getHours',
                data: $('.hoursForm').serialize(),
                success: function (data) {
                    $('#button-check-hours').prop('disabled', false);
                    $('#button-check-hours').html('Verificar Disponibilidade <i class="fa-solid fa-arrows-rotate"></i>');
					$('.response-output-hours').html(prepareHourCards(data['available_hours']));
                },
                error: function (error){
                    createErrorMessage(error.responseJSON.message, '#e74c3c', 'hours');
                }
            });
    });


    //Error Messages

    function createErrorMessage(message, color, type){
        $('.response-output-' + type).html(message);
        $('.response-output-' + type).css('color', color);
    }

    //Prepare Hours for Selection

    function prepareHourCards(hours){
        let limitHour = '23:59';
        let html = '<p class="pq-section-description">Selecione um horário para continuar:</p><div class="row cards-hours">';
        for (var key in hours) {
            let nextHour = parseInt(key) + 1;
            html += '<div class="card hour-card w-auto c-pointer" data-hour="' + key + '"><div class="card-body c-black f-20px">' + key +  'h ás ' + ((nextHour == 24) ? limitHour : nextHour) + 'h</div></div>';
        }
        html += '</div>';
        return html;
    }

    //Trick for date input

    const date = new Date();

    let day = date.getDate().toString().padStart(2, "0");
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let year = date.getFullYear();

    let dates = year + '-' + month + '-' + day;

    $('input[name=data]').prop('min', dates);

    //Change color 'hour-card' on click
    $(document.body).on('click', '.hour-card' ,function(){
        //get prop
        selectedHour = $(this).attr('data-hour');
        console.log('Selected Hour: ' + selectedHour);
        //Color Management
        $('.hour-card .card-body').css('color', 'black');
        $('.hour-card').css('background-color', 'white');
        $(this).find(".card-body").css('color', 'white');
        $(this).css('background-color', '#f8b707');
        //Show button 'booking'
        $('#button-booking').css('display', 'block');
    });

    //Ajax Functions: Make a Booking
    $("#button-booking").click(function(){
        let dataValues = {
            user_token: $('input[name=user_token]').val(),
            hour: selectedHour,
            data: $('input[name=data]').val(),
            qtd_pessoas: $('select[name=qtd_pessoas]').children("option").filter(":selected").val(),
            tipo_evento: $('select[name=tipo_evento]').children("option").filter(":selected").val(),
            local: $('select[name=local]').children("option").filter(":selected").val()
        }
		console.log(dataValues);
        $('#button-booking').prop('disabled', true);
        $('#button-booking').html('Aguarde...');
        $.ajax({
            type: "POST",
			headers: {
                'Accept': 'application/json',
            },
		    dataType: "json",
            url: url_name + 'book/new',
            data: dataValues,
            success: function (data) {
                $('#button-booking').prop('disabled', false);
                $('#button-booking').html('Reservar <i class="fa-solid fa-check"></i>');
                $('#block-reservation').css('display', 'none');
                $('#block-book').css('display', 'block');
                $('#code-book').html(data['code_book']);
            },
			error: function (error){
                createErrorMessage(error.responseJSON.message, '#e74c3c', 'booking');
            }
        });
    });

});