import { useCallback, useEffect, useState } from 'react';
import { getSignals } from '../api/signalsApi';

export function useSignals() {
    const [signals, setSignals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const refetch = useCallback(async () => {
        const data = await getSignals();
        setSignals(data);
        setError(null);
        return data;
    }, []);

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            try {
                const data = await getSignals();
                if (!cancelled) {
                    setSignals(data);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err);
                }
            } finally {
                if (!cancelled) {
                    setIsLoading(false);
                }
            }
        };

        load();

        return () => {
            cancelled = true;
        };
    }, []);

    return { signals, isLoading, error, refetch };
}
