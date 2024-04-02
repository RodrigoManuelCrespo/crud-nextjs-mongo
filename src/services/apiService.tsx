export const getHeader = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        let header = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
        return header
    }
};

export const saveTokenToLocalStorage = (session: any) => {
    if (session.user) {
        localStorage.setItem('accessToken', session.user.token);
    }
};