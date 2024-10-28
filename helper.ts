import moment from "moment";

export function truncateString(input: string, maxLength: number = 40): string {
  if (input.length <= maxLength) {
    return input;
  }
  return input.substring(0, maxLength) + '...';
}

export const formatDayMonthYear = (date: string) => {
  return moment(date).format('DD - MM - YYYY');
};

export function formatCurrency(value: number): string {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)}B`;
  } else if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  } else if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }
  return `${value.toFixed(0)}`;
}

export const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem('auth-token');
  }
  return null;
};

export const getAuthHeader = () => {
  const token = getAuthToken();
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};