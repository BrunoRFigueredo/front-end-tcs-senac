export function permit(roles){
    return roles.includes(localStorage.getItem('permissoes'));
}