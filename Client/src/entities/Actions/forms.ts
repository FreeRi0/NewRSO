//Модель компонента поиска
export interface actionFormSearch {
    actionType: string,
    status: string,
    rangeType: string,
    roads: string
}
//Модель компонента
export interface actionForm {
    format: string,
    direction: string,
    status: string,
    scale: string,
    name: string,
    conference_link: string,
    address: string,
    participants_number: Number,
    description: string,
    application_type: string,
    available_structural_units: string,
    time_data: {
      event_duration_type: string,
      start_date: string,
      start_time: string,
      end_date: string,
      end_time: string,
      registration_end_date: string,
      registration_end_time: string
    },
    document_data: {
      passport: boolean,
      snils: boolean,
      inn: boolean,
      work_book: boolean,
      military_document: boolean,
      consent_personal_data: boolean,
      additional_info: string
    }
  }

