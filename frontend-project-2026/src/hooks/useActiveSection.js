import { useEffect, useState } from 'react';

/**
 * Tracks which section in the page is currently the most prominent one in the
 * viewport. Returns its `id`, or `null` when none of the observed sections is
 * close enough to be considered active (e.g. when the user is at the very top
 * or bottom of the page).
 *
 * The `sectionIds` reference must be stable across renders — pass an array
 * defined in module scope, not an inline literal.
 */
function useActiveSection(sectionIds) {
    const [activeId, setActiveId] = useState(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((entry) => entry.isIntersecting);
                if (visible.length === 0) {
                    return;
                }

                const topMost = visible.reduce((closest, entry) =>
                    entry.target.getBoundingClientRect().top <
                    closest.target.getBoundingClientRect().top
                        ? entry
                        : closest
                );

                setActiveId(topMost.target.id);
            },
            { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
        );

        sectionIds.forEach((id) => {
            const element = document.getElementById(id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, [sectionIds]);

    return activeId;
}

export default useActiveSection;
