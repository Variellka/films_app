export const formatTime = (number: number) => {
    if (number) {
        return Math.floor(number / 60) + 'h ' + number % 60 + 'm';
    }
}

export const formatDate = (dateString: string) => {
    if (dateString) {
        return new Date(dateString).toLocaleDateString('en-US', 
            { year: 'numeric', month: 'long', day: 'numeric' }
        );
    }
}

export const formatCurrency = (number: number) => {
    if (number) {
        return '$' + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

export const formatVote = (number: number) => {
    if (number) {
        if (number >= 1000000) {
            return (number / 1000000).toFixed(1) + 'm';
        }
        if (number >= 1000) {
            return (number / 1000).toFixed(1) + 'k';
        }
        return number.toString();
    }
    
    return '0'
}
