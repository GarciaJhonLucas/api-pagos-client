import { get_payment, done_services } from './home-payment'
let lpayment_due = await payment_due();

if (lpayment_due.length > 0) {
    let payment_div = document.getElementById('payment_due');

    for (let i = 0; i < lpayment_due.length; i++) {
        let data_payment = await get_payment(lpayment_due[i].pago);
        data_payment.penalty = lpayment_due[i].penalty_free_amount;
        
        if (data_payment.user === user.email) {
            let service = await done_services(data_payment.service)
            data_payment.service = service.name;
            data_payment.logo = service.logo;
            let div = document.createElement('div')
            div.innerHTML = `<div class="card alert-danger">
                                <div class="card-body">
                                    <div class="d-flex flex-row justify-content-between align-items-center">
                                        <div class="servicio">
                                            <img src="${data_payment.logo}" alt="Service"
                                                class="rounded-circle">
                                            <span class="ms-2">${data_payment.service}</span>
                                        </div>
                                        <div class="">${data_payment.fecha_pago}</div>
                                        <div class="">S/. ${data_payment.monto}</div>
                                        <div class="">S/. ${round(data_payment.penalty, 2)}</div>
                                    </div>
                                </div>
                            </div>`
            payment_div.appendChild(div);
        }
    }
}


function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}