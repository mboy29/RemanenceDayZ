const API_BASE_URL = import.meta.env.PUBLIC_API_BASE_URL;
export { API_BASE_URL };

/* 
    Usage : 
    import { API_BASE_URL } from '$lib/config/api';

    const res = await fetch(`${API_BASE_URL}/some/endpoint`);
*/