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
