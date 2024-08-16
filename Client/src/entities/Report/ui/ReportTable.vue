<template>
    <div class="form__field-group report-table">
        <div>
            <Button
                style="margin-right: 0"
                label="Удалить мероприятие"
                size="large"
            />
        </div>
        <label class="form__label"
            >Количество человек, принявших участие в мероприятии
            <sup class="valid-red">*</sup></label
        >
        <v-table>
            <tbody>
                <tr class="report-table__tr">
                    <td class="report-table__th report-table__th__br-left">
                        Данные РО
                    </td>
                    <td class="report-table__th">Корректировка ОШ</td>
                    <td class="report-table__th report-table__th__br-right">
                        Корректировка ЦШ
                    </td>
                </tr>
                <tr>
                    <td class="report-table__td">200</td>
                    <td class="report-table__td report-table__td__center">
                        200
                    </td>
                    <td class="report-table__td">200</td>
                </tr>
            </tbody>
        </v-table>
        <label class="form__label"
            >Межрегиональное <sup class="valid-red">*</sup></label
        >
        <v-table>
            <tbody>
                <tr class="report-table__tr">
                    <td class="report-table__th report-table__th__br-left">
                        Данные РО
                    </td>
                    <td class="report-table__th">Корректировка ОШ</td>
                    <td class="report-table__th report-table__th__br-right">
                        Корректировка ЦШ
                    </td>
                </tr>
                <tr>
                    <td class="report-table__td">200</td>
                    <td class="report-table__td report-table__td__center">
                        200
                    </td>
                    <td class="report-table__td">200</td>
                </tr>
            </tbody>
        </v-table>
        <div>
            <label class="form__label" for="11"
                >Межрегиональное <sup class="valid-red">*</sup></label
            >
            <div style="display: flex">
                <InputReport
                    id="11"
                    name="11"
                    class="form__input"
                    type="radio"
                />
                <InputReport
                    id="12"
                    name="12"
                    class="form__input"
                    type="radio"
                />
            </div>
        </div>
        <label class="form__label"
            >Дата начала проведения мероприятия
            <sup class="valid-red">*</sup></label
        >
        <v-table>
            <tbody>
                <tr class="report-table__tr">
                    <td class="report-table__th report-table__th__br-left">
                        Данные РО
                    </td>
                    <td class="report-table__th">Корректировка ОШ</td>
                    <td class="report-table__th report-table__th__br-right">
                        Корректировка ЦШ
                    </td>
                </tr>
                <tr>
                    <td class="report-table__td">25.03.2024</td>
                    <td class="report-table__td report-table__td__center">
                        25.03.2024
                    </td>
                    <td class="report-table__td">25.03.2024</td>
                </tr>
            </tbody>
        </v-table>
        <label class="form__label"
            >Дата окончания проведения мероприятия
            <sup class="valid-red">*</sup></label
        >
        <v-table>
            <tbody>
                <tr class="report-table__tr">
                    <td class="report-table__th report-table__th__br-left">
                        Данные РО
                    </td>
                    <td class="report-table__th">Корректировка ОШ</td>
                    <td class="report-table__th report-table__th__br-right">
                        Корректировка ЦШ
                    </td>
                </tr>
                <tr>
                    <td class="report-table__td">25.03.2024</td>
                    <td class="report-table__td report-table__td__center">
                        25.03.2024
                    </td>
                    <td class="report-table__td">25.03.2024</td>
                </tr>
            </tbody>
        </v-table>
        <div>
            <Button
                style="margin: 0"
                label="Добавить мероприятие"
                size="large"
            />
        </div>
        <div class="form__field">
            <label class="form__label" for="15"
                >Комментарий <sup class="valid-red">*</sup></label
            >
            <InputReport
                id="15"
                name="15"
                class="form__input"
                style="width: 100%"
            />
        </div>
        <div>
            <v-checkbox label="Итоговое значение" />
        </div>
        <div class="hr"></div>
        <div>
            <p>(4-1)*2+(4-2)+(4-3)=9</p>
        </div>
        <div>
            <v-checkbox label="Вернуть в РО на доработку" />
        </div>
    </div>
</template>

<script setup>
import { InputReport } from '@shared/components/inputs';
import { Button } from '@shared/components/buttons';
</script>

<style lang="scss" scoped>
.report-table {
    &__tr {
        background-color: #ffffff;
        text-align: center;
    }
    &__th {
        font-family: Akrobat;
        font-size: 16px;
        font-weight: 500;
        line-height: 19.2px;
        text-align: center;

        &__br-left {
            border-radius: 10px 0 0 0;
            border-right: 1px solid #b6b6b6;
        }

        &__br-right {
            border-radius: 0 10px 0 0;
            border-left: 1px solid #b6b6b6;
        }
    }
    &__td {
        text-align: center;
        font-family: Akrobat;
        font-size: 16px;
        font-weight: 500;
        color: #8e8e93;

        &__center {
            border-left: 1px solid #b6b6b6;
            border-right: 1px solid #b6b6b6;
        }
    }
}
</style>
