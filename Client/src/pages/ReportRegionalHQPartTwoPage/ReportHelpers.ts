import { Ref } from "vue";
import * as swal from 'sweetalert2';

type error = {
    id: number;
    error: boolean;
}

interface ReportDHType {
    first: {
        amount_of_money: string;
        comment: string;
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
    tenth: {
        first: {
            comment: string;
        },
        second: {
            comment: string;
        }
    },
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
    sixteenth: {
        is_project: boolean;
        projects: SixteenthPanelEventType[];
        comment: string;
    }
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

interface SixteenthPanelEventType {
    name: string,
    project_scale: string;
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

export function checkEmptyFieldsDH(data: ReportDHType, isErrorPanel: Ref) {
    if (data.first && !(data.first.amount_of_money && data.first.comment)) {
        isErrorPanel.value.first = true;
        swal.default.fire({
            position: 'center',
            icon: 'warning',
            title: `Заполните обязательные поля в 1 показателе`,
            showConfirmButton: false,
            timer: 2500,
        })
        return false
    } else {
        isErrorPanel.value.first = false;
    }

    if (data.fourth) {
        for (const event of data.fourth.events) {
            if ((event.participants_number != 0 || !event.participants_number) && !(event.name && event.end_date && event.start_date && data.fourth.comment)) {
                isErrorPanel.value.fourth = true;
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
                isErrorPanel.value.fifth = true;
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
    for (const item in data.six) {
        if (data.six[item as keyof typeof data.six].number_of_members !== null && data.six[item as keyof typeof data.six].number_of_members != 0) {
            if (!data.six[item as keyof typeof data.six].comment) {
                isErrorPanel.value.six[item] = {
                    id: item,
                    error: true,
                };
                swal.default.fire({
                    position: 'center',
                    icon: 'warning',
                    title: `Заполните обязательные поля в 6 показателе`,
                    showConfirmButton: false,
                    timer: 2500,
                })
                return false;
            }
        } else {
            isErrorPanel.value.six[item] = {
                id: item,
                error: false,
            };
        }
    }
    for (const item in data.ninth) {
        if (data.ninth[item as keyof typeof data.ninth].event_happened !== false) {
            if (!data.ninth[item as keyof typeof data.ninth].comment) {
                isErrorPanel.value.ninth[item] = {
                    id: item,
                    error: true,
                };
                swal.default.fire({
                    position: 'center',
                    icon: 'warning',
                    title: `Заполните обязательные поля в 9 показателе`,
                    showConfirmButton: false,
                    timer: 2500,
                })
                return false;
            }

        } else {
            isErrorPanel.value.ninth[item] = {
                id: item,
                error: false,
            };
        }
    }
    if (data.tenth.first) {
        if (!data.tenth.first.comment) {
            isErrorPanel.value.tenth = true;
            swal.default.fire({
                position: 'center',
                icon: 'warning',
                title: `Заполните обязательные поля в показателе 10-1`,
                showConfirmButton: false,
                timer: 2500,
            })
            return false;
        }
    }
    if (data.tenth.second) {
        if (!data.tenth.second.comment) {
            isErrorPanel.value.tenth = true;
            swal.default.fire({
                position: 'center',
                icon: 'warning',
                title: `Заполните обязательные поля в показателе 10-2`,
                showConfirmButton: false,
                timer: 2500,
            })
            return false;
        }
    }
    if (!data.eleventh || !data.eleventh.participants_number || !data.eleventh.comment) {
        isErrorPanel.value.eleventh = true;
        swal.default.fire({
            position: 'center',
            icon: 'warning',
            title: `Заполните обязательные поля в 11 показателе`,
            showConfirmButton: false,
            timer: 2500,
        })
        return false;
    } else {
        isErrorPanel.value.eleventh = false;
    }

    if (!data.twelfth || !data.twelfth.amount_of_money || !data.twelfth.comment) {
        isErrorPanel.value.twelfth = true;
        swal.default.fire({
            position: 'center',
            icon: 'warning',
            title: `Заполните обязательные поля в 12 показателе`,
            showConfirmButton: false,
            timer: 2500,
        })
        return false;
    } else {
        isErrorPanel.value.twelfth = false;
    }

    if (!data.thirteenth || !data.thirteenth.number_of_members || !data.thirteenth.comment) {
        isErrorPanel.value.thirteenth = true;
        swal.default.fire({
            position: 'center',
            icon: 'warning',
            title: `Заполните обязательные поля в 13 показателе`,
            showConfirmButton: false,
            timer: 2500,
        })
        return false;
    } else {
        isErrorPanel.value.thirteenth = false;
    }
    if (data.sixteenth) {
        for (const project of data.sixteenth.projects) {
            if (data.sixteenth.is_project && !(data.sixteenth.comment && project.name && project.project_scale)) {
                isErrorPanel.value.sixteenth = true;
                swal.default.fire({
                    position: 'center',
                    icon: 'warning',
                    title: `Заполните обязательные поля в 16 показателе`,
                    showConfirmButton: false,
                    timer: 2500,
                })
                return false;
            }
        }
    }

    return true;
}
