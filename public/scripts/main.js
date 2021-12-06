//---------------- API Call to the POST ROUTE for Appointment Booking ------------------
let providerId = null;
let userId = null;

function storeId(elem) {
  providerId = elem.dataset.pid;
  userId = elem.dataset.uid;
}

$(() => {
  $.validator.addMethod("alphabets", function (value) {
    return /^[a-zA-Z\s]+$/.test(value);
  });

  let $registerForm = $("#reg-user");

  let $registerForm2 = $("#reg-provider");

  if ($registerForm.length) {
    $registerForm.validate({
      rules: {
        firstName: {
          required: true,
          minlength: 2,
          maxlength: 20,
          alphabets: true,
        },
        lastName: {
          required: true,
          minlength: 2,
          maxlength: 20,
          alphabets: true,
        },
        username: {
          required: true,
          email: true,
        },
        contactNumber: {
          required: true,
          minlength: 10,
          maxlength: 10,
          digits: true,
        },
        password: {
          required: true,
          minlength: 6,
          maxlength: 20,
        },
        confirm_pass: {
          required: true,
          minlength: 6,
          maxlength: 20,
          equalTo: "#password",
        },
      },
      messages: {
        firstName: {
          required: "First name is required",
          minlength: "First name must be at least 2 characters",
          maxlength: "First name must be less than 20 characters",
          alphabets: "First name must contain only alphabets",
        },
        lastName: {
          required: "Last name is required",
          minlength: "Last name must be at least 2 characters",
          maxlength: "Last name must be less than 20 characters",
          alphabets: "Last name must contain only alphabets",
        },
        email: {
          required: "Email is required",
          email: "Email must be valid",
        },
        contactNumber: {
          required: "Contact number is required",
          minlength: "Contact number must be at least 10 digits",
          maxlength: "Contact number must be less than 10 digits",
          digits: "Contact number must contain only digits",
        },
        password: {
          required: "Password is required",
          minlength: "Password must be at least 6 characters",
          maxlength: "Password must be less than 20 characters",
        },
        confirm_pass: {
          required: "Confirm password is required",
          minlength: "Confirm password must be at least 6 characters",
          maxlength: "Confirm password must be less than 20 characters",
          equalTo: "Password and confirm password must match",
        },
      },
    });
  }

  if ($registerForm2.length) {
    $registerForm2.validate({
      rules: {
        firstName: {
          required: true,
          minlength: 2,
          maxlength: 20,
          alphabets: true,
        },
        lastName: {
          required: true,
          minlength: 2,
          maxlength: 20,
          alphabets: true,
        },
        username: {
          required: true,
          email: true,
        },
        contactNumber: {
          required: true,
          minlength: 10,
          maxlength: 10,
          digits: true,
        },
        serviceType: {
          required: true,
        },
        area: {
          required: true,
        },
        password: {
          required: true,
          minlength: 6,
          maxlength: 20,
        },
        confirm_pass: {
          required: true,
          minlength: 6,
          maxlength: 20,
          equalTo: "#Password1",
        },
      },
      messages: {
        firstName: {
          required: "First name is required",
          minlength: "First name must be at least 2 characters",
          maxlength: "First name must be less than 20 characters",
          alphabets: "First name must contain only alphabets",
        },
        lastName: {
          required: "Last name is required",
          minlength: "Last name must be at least 2 characters",
          maxlength: "Last name must be less than 20 characters",
          alphabets: "Last name must contain only alphabets",
        },
        email: {
          required: "Email is required",
          email: "Email must be valid",
        },
        contactNumber: {
          required: "Contact number is required",
          minlength: "Contact number must be at least 10 digits",
          maxlength: "Contact number must be less than 10 digits",
          digits: "Contact number must contain only digits",
        },
        serviceType: {
          required: "Service type is required",
        },
        area: {
          required: "Area is required",
        },
        password: {
          required: "Password is required",
          minlength: "Password must be at least 6 characters",
          maxlength: "Password must be less than 20 characters",
        },
        confirmPassword: {
          required: "Confirm password is required",
          minlength: "Confirm password must be at least 6 characters",
          maxlength: "Confirm password must be less than 20 characters",
          equalTo: "Password and confirm password must match",
        },
      },
    });
  }
});

$("#reg-user-btn").click((e) => {
  e.preventDefault();
  if ($("#reg-user").valid()) {
    let data = {
      firstName: $("#fname").val(),
      lastName: $("#lname").val(),
      username: $("#uname").val(),
      contactNumber: $("#contact_number").val(),
      password: $("#password").val(),
      confirm_pass: $("#confirm_pass").val(),
    };
    $.ajax({
      url: "/register/consumer",
      type: "POST",
      data: data,
      beforeSend: (request) => {
        $("#reg-user-btn").innerHTML = "Wait...";
      },
      success: function (data) {
        if (data.success) {
          $("#reg-user")[0].reset();
          $("#reg-user").validate().resetForm();
          $("#reg-user").find(".error").removeClass("error");
          $("#reg-user").find(".success").removeClass("success");
          $("#reg-user").find(".error-msg").remove();
          $("#reg-user").find(".success-msg").remove();
          $("#reg-user-btn").innerHTML = "Register";
          window.location = "/login";
        } else {
          $("#reg-user-btn").innerHTML = "Register";
          $("#reg-user").append(
            `<div class="error-msg">
            <p>${data.message}</p>
          </div>`
          );
        }
      },
    });
  }
});

$("#reg-provider-btn").click((e) => {
  e.preventDefault();
  if ($("#reg-provider").valid()) {
    let data = {
      firstName: $("#name").val(),
      lastName: $("#1lname").val(),
      username: $("#Email1").val(),
      contactNumber: $("#number").val(),
      password: $("#Password1").val(),
      confirm_pass: $("#c_pass").val(),
      serviceType: $("#service").val(),
      area: $("#city").val(),
      basicCharges: $("#b_charges").val(),
      description: $("#desc").val(),
    };
    $.ajax({
      url: "/register/provider",
      type: "POST",
      data: data,
      beforeSend: (request) => {
        $("#reg-provider-btn").innerHTML = "Wait...";
      },
      success: function (data) {
        if (data.success) {
          $("#reg-provider")[0].reset();
          $("#reg-provider").validate().resetForm();
          $("#reg-provider").find(".error").removeClass("error");
          $("#reg-provider").find(".success").removeClass("success");
          $("#reg-provider").find(".error-msg").remove();
          $("#reg-provider").find(".success-msg").remove();
          $("#reg-provider-btn").innerHTML = "Register";
          window.location = "/login";
        } else {
          $("#reg-provider-btn").innerHTML = "Register";
          $("#reg-provider").append(
            `<div class="error-msg">
            <p>${data.message}</p>
          </div>`
          );
        }
      },
    });
  }
});

const appointmentForm = document.querySelector("#book-appointment-form");

appointmentForm.onsubmit = async (e) => {
  e.preventDefault();
  let formData = new FormData(appointmentForm);

  let appData = {};
  formData.forEach((val, key) => {
    appData[key] = val;
  });

  try {
    const res = await fetch(`/bookAppointment/${providerId}/${userId}`, {
      method: "POST",
      body: JSON.stringify(appData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    if (data.user) {
      alert("Appointment booked successfully!!");
      window.location.href = "/services";
    } else {
      alert("Something went wrong");
    }

    window.location.href = "/services";
  } catch (err) {
    console.log(err);
  }

  window.location.href = "/services";
};

//---------------- API Call to the Update Job Status ------------------
async function UpdateStatus(btn) {
  try {
    const res = await fetch(`/appointments/${btn.dataset.aid}`, {
      method: "PUT",
    });
    const data = await res.json();

    if (data.user) {
      alert("Appointment status Updated!!");
    } else {
      alert("Something went wrong");
    }
  } catch (err) {
    alert("Something went wrong");
    console.log(err);
  }
  window.location.href = "/services";
}
