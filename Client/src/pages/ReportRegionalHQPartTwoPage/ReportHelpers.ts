import { Ref } from "vue";
import * as swal from 'sweetalert2';

type error = {
    id: number;
    error: boolean;
}

interface ReportDHType {
    first: {
        amount_of_money: string;
    };
    fourth: {
        events: FourthPanelEventType[];
        comment: string;
    };
    fifth: {
        events: FifthPanelEventType[];
        comment: string;
    }
    six: {
        [key: string]: {
            number_of_members: string | number;
            comment: string;
        }
    }
    ninth: {
        [key: string]: {
            event_happened: boolean;
            comment: string;
        }
    }
    eleventh: {
        participants_number: string;
        comment: string;
    };
    twelfth: {
        amount_of_money: string;
        comment: string;
    };
    thirteenth: {
        number_of_members: string;
        comment: string;
    };
}

interface FourthPanelEventType {
    participants_number: string | number;
    name: string;
    end_date: string;
    start_date: string;
}

interface FifthPanelEventType {
    participants_number: string | number,
    ro_participants_number: string,
    start_date: string,
    end_date: string,
    name: string,
}

export const fileValidate = (value: { size: number; type: string; }, maxSizeFile: number, isErrorFile: Ref,) => {
    const FILE_TYPES = ['jpg', 'jpeg', 'png', 'pdf'];

    // console.log('(1)', value);
    const fileSize = value.size / (1024 * 1024);
    const fileType = value.type.split('/').at(-1) as string;
    // console.log('(2)', fileType, fileSize);

    if ((fileSize > maxSizeFile) || (!FILE_TYPES.includes(fileType))) {
        isErrorFile.value = true;
        // console.log('(3.1) не соответствует', maxSizeFile, isErrorFile.value);
    } else {
        isErrorFile.value = false;
        // console.log('(3.2) соответствует', maxSizeFile, isErrorFile.value);
    }
}

export const dateValidate = (events: Ref, isErrorDate: Ref<error[]>, noDateError: Ref) => {

    events.value.forEach(() => {

        if (events.value) {
            for (let i = 0; i < events.value.length; i++) {
                isErrorDate.value[i] = {
                    id: i,
                    error: false,
                }
                if (events.value[i].start_date && events.value[i].end_date) {
                    if (events.value[i].start_date > events.value[i].end_date) {
                        isErrorDate.value[i] = {
                            id: i,
                            error: true,
                        };
                    } else {
                        isErrorDate.value[i] = {
                            id: i,
                            error: false,
                        };
                    }
                }
                if (Object.values(isErrorDate.value).some((item: error) => item.error === true)) {
                    noDateError.value = true;
                } else {
                    noDateError.value = false;
                }
            }
        }
    })
}

export function checkEmptyFieldsDH(data: ReportDHType) {
    if (data.first && !data.first.amount_of_money) {
        swal.default.fire({
            position: 'center',
            icon: 'warning',
            title: `Заполните обязательные поля в 1 показателе`,
            showConfirmButton: false,
            timer: 2500,
        })
        return false
    }

    if (data.fourth) {
        for (const event of data.fourth.events) {
            if ((event.participants_number != 0 || !event.participants_number) && !(event.name && event.end_date && event.start_date && data.fourth.comment)) {
                swal.default.fire({
                    position: 'center',
                    icon: 'warning',
                    title: `Заполните обязательные поля в 4 показателе`,
                    showConfirmButton: false,
                    timer: 2500,
                })
                return false;
            }
        }
    }
    if (data.fifth) {
        for (const event of data.fifth.events) {
            if ((event.participants_number != 0 || !event.participants_number) && !(event.end_date && event.start_date && event.name && data.fifth.comment)) {
                swal.default.fire({
                    position: 'center',
                    icon: 'warning',
                    title: `Заполните обязательные поля в 5 показателе`,
                    showConfirmButton: false,
                    timer: 2500,
                })
                return false;
            }
        }
    }
    for (let item in data.six) {
        if (!data.six[item as keyof typeof data.six].comment) {
            swal.default.fire({
                position: 'center',
                icon: 'warning',
                title: `Заполните обязательные поля в 6 показателе`,
                showConfirmButton: false,
                timer: 2500,
            })
            return false;
        }
    }
    for (let item in data.ninth) {
        if (!data.ninth[item as keyof typeof data.ninth].comment) {
            swal.default.fire({
                position: 'center',
                icon: 'warning',
                title: `Заполните обязательные поля в 9 показателе`,
                showConfirmButton: false,
                timer: 2500,
            })
            return false;
        }
    }
    if (!data.eleventh || !data.eleventh.participants_number || !data.eleventh.comment) {
        swal.default.fire({
            position: 'center',
            icon: 'warning',
            title: `Заполните обязательные поля в 11 показателе`,
            showConfirmButton: false,
            timer: 2500,
        })
        return false;
    }

    if (!data.twelfth || !data.twelfth.amount_of_money || !data.twelfth.comment) {
        swal.default.fire({
            position: 'center',
            icon: 'warning',
            title: `Заполните обязательные поля в 12 показателе`,
            showConfirmButton: false,
            timer: 2500,
        })
        return false;
    }

    if (!data.thirteenth || !data.thirteenth.number_of_members || !data.thirteenth.comment) {
        swal.default.fire({
            position: 'center',
            icon: 'warning',
            title: `Заполните обязательные поля в 13 показателе`,
            showConfirmButton: false,
            timer: 2500,
        })
        return false;
    }

    return true;
}
