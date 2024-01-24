//Модель компонента поиска
export const actionFormSearch = [{
    actionType: String,
    status: String,
    rangeType: String,
    roads: String
}]
//Модель компонента

export const actionForm = {
    format: '',
    direction: '',
    status: '',
    scale: '',
    name: '',
    conference_link: '',
    address: '',
    participants_number: Number,
    description: '',
    application_type: '',
    available_structural_units: '',
    time_data: {
      event_duration_type: '',
      start_date: '',
      start_time: '',
      end_date: '',
      end_time: '',
      registration_end_date: '',
      registration_end_time: ''
    },
    document_data: {
      passport: false,
      snils: false,
      inn: false,
      work_book: false,
      military_document: false,
      consent_personal_data: false,
      additional_info: ''
    }
  }

