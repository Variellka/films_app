export const formatTime = (number) => {
    return Math.floor(number / 60) + 'h ' + number % 60 + 'm';
}

export const formatDate = (dateString) => {
    if (dateString) {
        return new Date(dateString).toLocaleDateString('en-US', 
        { year: 'numeric', month: 'long', day: 'numeric' }
        );
    }
}

export function formatCurrency(number) {
    if (number) {
        return '$' + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}