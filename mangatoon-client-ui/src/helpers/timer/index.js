import moment from 'moment'

export function timeAgo(time) {
    const now = moment();
    const targetTime = moment(time);
    const diff = moment.duration(now.diff(targetTime));

    const years = diff.years();
    const months = diff.months();
    const weeks = Math.floor(diff.asWeeks());
    const days = diff.days() % 7;
    const hours = diff.hours();
    const minutes = diff.minutes();
    const seconds = diff.seconds();

    if (years > 0) {
        return years + " năm trước";
    } else if (months > 0) {
        return months + " tháng trước";
    } else if (weeks > 0) {
        return weeks + " tuần trước";
    } else if (days > 0) {
        return days + " ngày trước";
    } else if (hours > 0) {
        return hours + " giờ trước";
    } else if (minutes > 0) {
        return minutes + " phút trước";
    } else {
        return "Vừa xong";
    }
}

export function getMillisecondsToRoundedTime() {
    const now = moment.utc()
    const roundedTime = now.clone().startOf('day').add(now.hour(), 'hours')
    return roundedTime.valueOf()
}