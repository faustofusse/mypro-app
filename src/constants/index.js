// export const API_URL = 'https://dmeserver.herokuapp.com/api';
export const API_URL = 'http://192.168.0.42:8080/api';

export const METHOD_GET = 'METHOD_GET';
export const METHOD_POST = 'METHOD_POST';
export const METHOD_PUT = 'METHOD_PUT';
export const METHOD_DELETE = 'METHOD_DELETE';

export const NOTIFICATION_INFO = 'NOTIFICATION_INFO';
export const NOTIFICATION_ERROR = 'NOTIFICATION_ERROR';
export const NOTIFICATION_SUCCESS = 'NOTIFICATION_SUCCESS';

// HAY QUE SACAR ESTO A LA MIERDA!!!!!!!
export const USER_MODELS = {
    all: ['email', 'password', 'repeatPassword', 'name', 'phone', 'business', 'professional'],
    professional: {
        particular: ['dni', 'lastName', 'gender', 'birthdate', 'enrollment', 'workZone', 'workArea', 'experience', 'address'],
        business: ['cuit', 'enrollment', 'workZone', 'workArea', 'employees', 'address'],
    },
    client: {
        particular: ['lastName', 'gender', 'birthdate'],
        business: ['cuit'],
    }
}