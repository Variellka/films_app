export const formatTime = (number) => {
    if (number) {
        return Math.floor(number / 60) + 'h ' + number % 60 + 'm';
    }
}

export const formatDate = (dateString) => {
    if (dateString) {
        return new Date(dateString).toLocaleDateString('en-US', 
        { year: 'numeric', month: 'long', day: 'numeric' }
        );
    }
}

export const formatCurrency = (number) => {
    if (number) {
        return '$' + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

export const formatVote = (num) => {
    if (num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'm';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num.toString();
    }
}