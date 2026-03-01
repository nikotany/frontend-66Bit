const MONTHS = {
    'января': '01',
    'февраля': '02',
    'марта': '03',
    'апреля': '04',
    'мая': '05',
    'июня': '06',
    'июля': '07',
    'августа': '08',
    'сентября': '09',
    'октября': '10',
    'ноября': '11',
    'декабря': '12'
} 

export const formatDate = (dateStr: string): string => {
    const [day, monthName, year] = dateStr.split(' ')
    const month = MONTHS[monthName as keyof typeof MONTHS]
    return `${day.padStart(2, '0')}.${month}.${year}`
}