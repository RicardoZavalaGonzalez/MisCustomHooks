import { useRef } from "react";
import { useEffect, useState } from "react";

export const useFetch = (url) => {
    // uso del useRef para peticiones 
    const isMounted = useRef(true);
    /* Cambiando el estado de la peticion a false cada vez que se llama
    Evitando fugas de memoria */
    useEffect(() => {
        return () => {
            // uso de useRef
            isMounted.current = false;
        }
    }, [])

    const [state, setState] = useState({ data: null, loading: true, error: null });

    useEffect(() => {
        setState({ data: null, loading: true, error: null });
        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                /* Espera a que termine la peticion de la promesa, para no generar error al llamar varias veces
                por parte de un boton */
                if (isMounted.current) {
                    setState({
                        loading: false,
                        error: null,
                        data
                    })
                } else {
                    console.log('No se llamo');
                }
            });
    }, [url]);
    return state;
}
