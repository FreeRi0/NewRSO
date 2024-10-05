import { Ref } from "vue";

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

export const dateValidate = (events: Ref, isErrorDate: Ref, noDateError: Ref) => {
 
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
        if (Object.values(isErrorDate.value).some((item: any) => item.error === true)) {
          noDateError.value = true;
        } else {
          noDateError.value = false;
        }
      }
    }
  })
}
