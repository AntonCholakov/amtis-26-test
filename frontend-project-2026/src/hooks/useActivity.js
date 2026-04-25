import { useState, useEffect, useCallback } from 'react';
import { getActivity } from '../api/activitiesApi';

export function useActivity(id) {
    const [activity, setActivity] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchActivity = useCallback(async (abortSignal) => {
        if (!id) return;
        
        setIsLoading(true);
        setError(null);
        
        try {
            const data = await getActivity(id);
            if (!abortSignal?.aborted) {
                setActivity(data);
                setIsLoading(false);
            }
        } catch (err) {
            if (!abortSignal?.aborted) {
                setError(err.response?.data?.message ?? 'Грешка при зареждане на активността.');
                setIsLoading(false);
            }
        }
    }, [id]);

    useEffect(() => {
        const controller = new AbortController();
        fetchActivity(controller.signal);

        return () => {
            controller.abort();
        };
    }, [fetchActivity]);

    return {
        activity,
        isLoading,
        error,
        refetch: () => fetchActivity(),
    };
}
