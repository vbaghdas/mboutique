/*==========================================================

                    CONTACT FORM

===========================================================*/
 $(document).ready(function(){

    $("#submit-btn").click(function(){

        //get input field values
        var user_name = $('input[name=name]').val();
        var user_email = $('input[name=email]').val();
        var user_phone = $('input[name=email]').val();
        var user_subject = $('input[name=subject]').val();
        var user_message = $('textarea[name=message]').val();
        var url = "./php_mailer/mail_handler.php"; // the script where you handle the form input.

        //simple validation at client's end
        //we simply change border color to red if empty field using .css()
        var proceed = true;
        if (user_name == "" || user_name == " ") {
            $('input[name=name]').css('border-color', '#df5277');
            proceed = false;
        }
        if (user_email == "" || user_name == " ") {
            $('input[name=email]').css('border-color', '#df5277');
            proceed = false;
        }
        if (user_phone == "" || user_name == " ") {
            $('input[name=phone]').css('border-color', '#df5277');
            proceed = false;
        }
        if (user_subject == "" || user_name == " ") {
            $('input[name=subject]').css('border-color', '#df5277');
            proceed = false;
        }
        if (user_message == "" || user_name == " ") {
            $('textarea[name=message]').css('border-color', '#df5277');
            proceed = false;
        }
        var atpos = user_email.indexOf("@");
        var dotpos = user_email.lastIndexOf(".");
        if (atpos<1 || dotpos<atpos+2 || dotpos+2>=user_email.length) {
            $('input[name=email]').css('border-color', '#df5277');
            proceed = false;
        }

        //everything looks good! proceed...
        if (proceed) {
            //data to be sent to server
            post_data = {
                'userName': user_name,
                'userEmail': user_email,
                'userPhone': user_phone,
                'userMessage': user_message,
                'userSubject': user_subject
            };
            //Ajax post data to server
            $.ajax({
                type: "POST",
                url: url,
                data: $("#contact-form").serialize(), // serializes the form's elements.
                success: function (data) {
                    $('#contact-form').closest('form').find('input[type=text], textarea').val('');
                    $('#contact-form').closest('form').find('input[type=email], textarea').val('');
                    $('.modal-title').text('Thank You!');
                    $('.modal-body > p').text('Your message has been sent successfully.');
                    $("#contact-modal").modal('show');
                },
                error: function(response){
                    $('.modal-title').text('Oops!');
                    $('.modal-body > p').text('There seemed to be an error. Please try again.');
                    $("#contact-modal").modal('show');
                }
            });
        }

        return false;
    });

    //reset previously set border colors and hide all message on .keyup()
    $("#contact-form #name").keyup(function(){
        $("#contact-form #name").css('border-color', '');
    });

    $("#contact-form #email").keyup(function(){
        $("#contact-form #email").css('border-color', '');
    });

    $("#contact-form #phone").keyup(function(){
        $("#contact-form #phone").css('border-color', '');
    });

    $("#contact-form #subject").keyup(function(){
        $("#contact-form #subject").css('border-color', '');
    });

    $("#contact-form #message").click(function(){
        $("#contact-form #message").css('border-color', '');
    });

    //Check for numbers on phone input
    function requireNumbers(event) {
        var value = String.fromCharCode(event.which);
        var pattern = new RegExp(/^[0-9]*$/gm);
        return pattern.test(value);
    }
    $('#phone').on('keypress', requireNumbers);

});