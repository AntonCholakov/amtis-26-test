const relativeFormatter = new Intl.RelativeTimeFormat('bg-BG', { numeric: 'auto' });

export const formatRelativeTime = (isoString) => {
    if (!isoString) {
        return '';
    }

    const target = new Date(isoString).getTime();
    if (Number.isNaN(target)) {
        return '';
    }

    const diffMs = target - Date.now();
    const diffMinutes = Math.round(diffMs / (1000 * 60));
    const diffHours = Math.round(diffMs / (1000 * 60 * 60));
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    if (Math.abs(diffMinutes) < 60) {
        return relativeFormatter.format(diffMinutes, 'minute');
    }
    if (Math.abs(diffHours) < 24) {
        return relativeFormatter.format(diffHours, 'hour');
    }
    return relativeFormatter.format(diffDays, 'day');
};
