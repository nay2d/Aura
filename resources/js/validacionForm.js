        // Example starter JavaScript for disabling form submissions if there are invalid fields
        (function() {
            'use strict';
            window.addEventListener('load', function() {
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.getElementsByClassName('needs-validation1');
            // Loop over them and prevent submission
            //console.log(forms); //volver a colocar
            var validation = Array.prototype.filter.call(forms, function(form) {
                form.addEventListener('submit', function(event) {
                    if (form.checkValidity() === false) {
                        event.preventDefault();
                        event.stopPropagation();
                        console.log('invalido');
                        $('#formAura').val(false);
                        $('#formAuraUpdate').val(false);
                        swal({
                            title: "Datos invalidos",
                            text: "Revisar formulario",
                            icon: "warning",
                            button: true
                        });
                    }else{
                        event.stopPropagation();
                        //console.log('valido');
                        $('#formAura').val(true);
                        $('#formAuraUpdate').val(true);
                    }
                    form.classList.add('was-validated');
                }, false);
            });
        }, false);
        })();