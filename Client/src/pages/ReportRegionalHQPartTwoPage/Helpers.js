import swal from '@/library/sweetalert2/sweetalert2.esm.all.min.js';
import { useRoleStore } from "@layouts/store/role.ts";

export function checkEmptyFieldsDH(data, isErrorPanel) {
    if (data.first && !(data.first.amount_of_money && data.first.comment)) {
        isErrorPanel.value.first = true;
        swal.fire({
            position: 'center',
            icon: 'warning',
            title: `Заполните обязательные поля в 1 показателе`,
            showConfirmButton: false,
            timer: 2500,
        });
        return false;
    } else {
        isErrorPanel.value.first = false;
    }

    if (data.fourth && !(data.fourth.comment)) {
        isErrorPanel.value.fourth = true;
        swal.fire({
            position: 'center',
            icon: 'warning',
            title: `Заполните обязательные поля в 4 показателе`,
            showConfirmButton: false,
            timer: 2500,
        });
        // for (const event of data.fourth.events) {
        //     if (
        //         (event.participants_number != 0 ||
        //             !event.participants_number) &&
        //         !(
        //             event.name &&
        //             event.end_date &&
        //             event.start_date &&
        //             data.fourth.comment
        //         )
        //     ) {
        //         isErrorPanel.value.fourth = true;
        //         swal.fire({
        //             position: 'center',
        //             icon: 'warning',
        //             title: `Заполните обязательные поля в 4 показателе`,
        //             showConfirmButton: false,
        //             timer: 2500,
        //         });
        //         return false;
        //     }
        // }
    }

    if (data.fifth && !(data.fifth.comment)) {
        isErrorPanel.value.fifth = true;
        swal.fire({
            position: 'center',
            icon: 'warning',
            title: `Заполните обязательные поля в 5 показателе`,
            showConfirmButton: false,
            timer: 2500,
        });
        return false;
        // for (const event of data.fifth.events) {
        //     if (
        //         (event.participants_number != 0 ||
        //             !event.participants_number) &&
        //         !(
        //             event.end_date &&
        //             event.start_date &&
        //             event.name &&
        //             data.fifth.comment
        //         )
        //     ) {
        //
        //     }
        // }
    }

    for (const item in data.six) {
        if (data.six[item].number_of_members > 0) {
            if (!data.six[item].comment) {
                isErrorPanel.value.six[item] = {
                    id: item,
                    error: true,
                };
                swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: `Заполните обязательные поля в 6 показателе`,
                    showConfirmButton: false,
                    timer: 2500,
                });
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
        if (data.ninth[item].event_happened) {
            if (!data.ninth[item].comment) {
                isErrorPanel.value.ninth[item] = {
                    id: item,
                    error: true,
                };
                swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: `Заполните обязательные поля в 9 показателе`,
                    showConfirmButton: false,
                    timer: 2500,
                });
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
            swal.fire({
                position: 'center',
                icon: 'warning',
                title: `Заполните обязательные поля в показателе 10-1`,
                showConfirmButton: false,
                timer: 2500,
            });
            return false;
        }
    }

    if (data.tenth.second) {
        if (!data.tenth.second.comment) {
            isErrorPanel.value.tenth = true;
            swal.fire({
                position: 'center',
                icon: 'warning',
                title: `Заполните обязательные поля в показателе 10-2`,
                showConfirmButton: false,
                timer: 2500,
            });
            return false;
        }
    }

    // if (
    //     !data.eleventh ||
    //     !data.eleventh.participants_number ||
    //     !data.eleventh.comment
    // ) {
    //     isErrorPanel.value.eleventh = true;
    //     swal.fire({
    //         position: 'center',
    //         icon: 'warning',
    //         title: `Заполните обязательные поля в 11 показателе`,
    //         showConfirmButton: false,
    //         timer: 2500,
    //     });
    //     return false;
    // } else {
    //     isErrorPanel.value.eleventh = false;
    // }

    if (
        !data.twelfth ||
        !data.twelfth.amount_of_money ||
        !data.twelfth.comment ||
        !data.twelfth.number_of_members
    ) {
        isErrorPanel.value.twelfth = true;
        swal.fire({
            position: 'center',
            icon: 'warning',
            title: `Заполните обязательные поля в 12 показателе`,
            showConfirmButton: false,
            timer: 2500,
        });
        return false;
    } else {
        isErrorPanel.value.twelfth = false;
    }

    // if (
    //     !data.thirteenth ||
    //     !data.thirteenth.number_of_members ||
    //     !data.thirteenth.comment
    // ) {
    //     isErrorPanel.value.thirteenth = true;
    //     swal.fire({
    //         position: 'center',
    //         icon: 'warning',
    //         title: `Заполните обязательные поля в 13 показателе`,
    //         showConfirmButton: false,
    //         timer: 2500,
    //     });
    //     return false;
    // } else {
    //     isErrorPanel.value.thirteenth = false;
    // }

    //Переделать на 14 показатель 2025 года
    
    // if (data.sixteenth) {
    //     for (const project of data.sixteenth.projects) {
    //         if (
    //             data.sixteenth.is_project &&
    //             !(
    //                 data.sixteenth.comment &&
    //                 project.name &&
    //                 project.project_scale
    //             )
    //         ) {
    //             isErrorPanel.value.sixteenth = true;
    //             swal.fire({
    //                 position: 'center',
    //                 icon: 'warning',
    //                 title: `Заполните обязательные поля в 16 показателе`,
    //                 showConfirmButton: false,
    //                 timer: 2500,
    //             });
    //             return false;
    //         }
    //     }
    // }

    return true;
}

export function formattedDate(date)  {
    if (date) {
        let newDate = new Date(date);
        let day = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        return day + "." + month + "." + year;
    } else {
        return null;
    }
}

const roleStore = useRoleStore();

export const showPanels = (numberPanel, picked, revisionPanels) => {
    if (
        roleStore.experts.is_district_expert || 
        (roleStore.experts.is_central_expert && !revisionPanels.length) || 
        (roleStore.experts.is_central_expert && revisionPanels.includes(numberPanel)) || 
        (!(roleStore.experts.is_district_expert || roleStore.experts.is_central_expert) && !revisionPanels) ||
        (!(roleStore.experts.is_district_expert || roleStore.experts.is_central_expert) && picked == 'Просмотр отправленного отчета') ||
        (!(roleStore.experts.is_district_expert || roleStore.experts.is_central_expert) && picked == 'Доработка' && revisionPanels.includes(numberPanel))
    ) {
        return true
    }
}
