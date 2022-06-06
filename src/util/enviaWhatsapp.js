export function enviaWhatsapp(telefone, mensagem){
    window.open('https://api.whatsapp.com/send?phone=55'+ telefone + '&text=' + mensagem, '_blank');
}