$(document).ready(function () {

    // SECTIONS LIST - COMMENT FOR EXPLANATION PURPOSES HINDI PO ITO A.I :)))))))
    function populateSections(yearLevel) {
        const sectionSelect = document.getElementById("section");
        const sections = {
            "1st": ["1A", "1B", "1C", "1D"],
            "2nd": ["2A", "2B", "2C", "2D"],
            "3rd": ["3A", "3B", "3C", "3D"],
            "4th": ["4A", "4B", "4C", "4D"]
        };

        sectionSelect.innerHTML = '<option value="">Select Section</option>';

        if (sections[yearLevel]) {
            sections[yearLevel].forEach(function (section) {
                const option = document.createElement("option");
                option.value = section;
                option.textContent = section;
                sectionSelect.appendChild(option);
            });
        }
    }

    // ENABLE / DISABLE YEAR AND SECTION
    $('#year, #section').prop('disabled', true);

    $('#course').on('change', function () {
        const courseValue = $(this).val();

        if (courseValue !== "") {
            $('#year').prop('disabled', false);  
        } else {
            $('#year').prop('disabled', true);    
            $('#section').prop('disabled', true);
        }

        $('#year').val('');
        $('#section').val('');
        populateSections(''); 
    });

    $('#year').on('change', function () {
        const yearValue = $(this).val();

        populateSections(yearValue); 

        if (yearValue !== "") {
            $('#section').prop('disabled', false); 
        } else {
            $('#section').prop('disabled', true);  
        }

        $('#section').val(''); 
    });

    // Border Function
    function setFieldState($field, isValid, msg) {
        const id = $field.attr('id');
        $field.toggleClass('error', !isValid)
              .toggleClass('success', isValid);
        $('#' + id + 'Error').text(msg || '');
    }

    // Validation
    $('#lastName, #firstName, #dob, #address, #course, #year, #section, #gender')
        .on('input blur change', function () {
            const $this = $(this);
            const value = $this.val().trim();
            const isValid = value !== "";
            setFieldState($this, isValid, isValid ? '' : 'This field is required.');
        });

    // Student Number
    $('#studentNumber').on('input blur', function () {
        let input = $(this).val();

        input = input.replace(/[^0-9-]/g, '');
        if (input.length > 2 && input[2] !== '-') {
            input = input.substring(0, 2) + '-' + input.substring(2);
        }
        if (input.length > 8) {
            input = input.substring(0, 8);
        }

        $(this).val(input);

        const validFormat = /^[0-9]{2}-[0-9]{1,5}$/;
        const isValid = validFormat.test(input);
        setFieldState($(this), isValid, isValid ? '' : 'Please enter a valid student number (XX-XXXXX)');
    });

    // Contact Number
    $('#contact').on('input blur', function () {
        let input = $(this).val();

        // Number only
        input = input.replace(/[^0-9]/g, '');

        // 11 Digits Number
        if (input.length > 11) {
            input = input.substring(0, 11);
        }

        $(this).val(input);

        const validContactNumber = /^09\d{9}$/;
        const isValid = validContactNumber.test(input);
        setFieldState($(this), isValid, isValid ? '' : 'Please enter a valid contact number (09XXXXXXXXX)');
    });

    // Email
    $('#email').on('input blur', function () {
        const input = $(this).val().trim();
        const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isValid = validEmail.test(input);
        setFieldState($(this), isValid, isValid ? '' : 'Please enter a valid email address');
    });

    // CHECKING
    $('#studentForm').on('submit', function (event) {
        let isValid = true;

        // FINAL CHECK
        $('input[required], select[required]').each(function () {
            const $this = $(this);
            const value = $this.val().trim();
            if (value === "") {
                setFieldState($this, false, 'This field is required.');
                isValid = false;
            }
        });

        if (!isValid) {
            event.preventDefault();
            alert('Please fill out all required fields correctly.');
        }
    });
});

