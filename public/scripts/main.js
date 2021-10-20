// $(".alert").alert("close");

//---------------- API Call to the POST ROUTE for Appointment Booking ------------------
let providerId = null;
let userId = null;

function storeId(elem){
    providerId = elem.dataset.pid;
    userId = elem.dataset.uid;
}

const appointmentForm = document.querySelector("#book-appointment-form");

appointmentForm.onsubmit = async (e) =>{
    e.preventDefault();
    let formData = new FormData(appointmentForm);

    let appData = {}
    formData.forEach( (val,key) =>{
        appData[key]=val;
    })

    try {
        const res = await fetch(`/bookAppointment/${providerId}/${userId}`,{
            method: 'POST',
            body: JSON.stringify(appData),
            headers: { 'Content-Type': 'application/json'}
        }) 
        const data = await res.json();
        
        if(data.user){
            alert('Appointment booked successfully!!');
            window.location.href = '/services';
        }
        else{
            alert('Something went wrong');
        }

        window.location.href = '/services';
        
    } 

    catch (err) {
        console.log(err);
    }

    window.location.href = "/services";
};
